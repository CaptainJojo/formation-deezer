export class ArtistDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async getArtistById({ id }) {
    return await this.dbConnection("artist").where({ id }).first();
  }
}
