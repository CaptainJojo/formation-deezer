export class AuthorDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async getAuthors() {
    return await this.dbConnection("author").select("*");
  }
}
