export class FanDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async getFansByArtist({ artistId }) {
    return await this.dbConnection("fan")
      .select("*")
      .where({ artist_id: artistId })
      .first();
  }
}
