export class PlaylistDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async getPlaylistById({ id }) {
    return await this.dbConnection("playlist").where({ id }).first();
  }
}
