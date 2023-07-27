import Dataloader from "dataloader";

export class FavoritesArtistDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  private batchFavoritesArtist = new Dataloader(async (ids) => {
    const favoritesArtist = await this.dbConnection("favorites_artist").whereIn(
      "user_id",
      ids
    );

    return ids.map((id) =>
      favoritesArtist.filter((favoriteArtist) => favoriteArtist.user_id === id)
    );
  });

  async getFavoritesArtist({ userId }) {
    return this.batchFavoritesArtist.load(userId);
  }
}
