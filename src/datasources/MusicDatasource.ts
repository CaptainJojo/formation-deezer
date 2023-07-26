export class MusicDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async getMusics() {
    return await this.dbConnection("music").select("*");
  }
}
