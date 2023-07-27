export class MusicDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async getMusicById({ id }) {
    return await this.dbConnection("music").where({ id }).first();
  }
}
