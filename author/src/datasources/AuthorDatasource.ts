export class AuthorDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async getAuthors() {
    return await this.dbConnection("artist").select("*");
  }

  async getAuthorById(id) {
    return await this.dbConnection("artist").select("*").where({  id }).first();
  }
}
