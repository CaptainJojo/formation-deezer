export class FavoritesArtistDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async getFavoritesArtist({ userId }) {
    return await this.dbConnection("favorites_artist")
      .select("*")
      .where({ user_id: userId });
  }
}
