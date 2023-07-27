export class PlaylistMusicDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async getMusicsByPlaylist({ id }) {
    return await this.dbConnection("playlist_music").where({ playlist_id: id });
  }
}
