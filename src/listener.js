class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const songs = await this._playlistsService.getSongs(playlistId);
      const playlists = await this._playlistsService.getPlaylists(playlistId);

      const playlistSongs = {
        playlist: {
          id: playlistId,
          name: playlists.name,
          songs,
        },
      };

      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlistSongs));

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
