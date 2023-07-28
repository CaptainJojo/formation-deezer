export class MusicDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async getMusics() {
    return await this.dbConnection("music").select("*");
  }

  async getMusicById(musicId) {
    return await this.dbConnection("music")
      .select("*")
      .where("id", musicId)
      .first();
  }
}
