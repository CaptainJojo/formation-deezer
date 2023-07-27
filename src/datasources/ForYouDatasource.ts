export class ForYouDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async getForYou({ userId }) {
    return await this.dbConnection("for_you")
      .select("*")
      .where({ user_id: userId });
  }
}
