export class PlaylistDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async getPlaylists() {
    return await this.dbConnection("playlist").select("*");
  }

  async getMusics(playlistId) {
    return await this.dbConnection("playlist_music")
      .select("*")
      .where("playlist_id", playlistId);
  }
}
