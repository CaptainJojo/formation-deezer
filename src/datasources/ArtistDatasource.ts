import Dataloader from "dataloader";
export class ArtistDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  private batchArtists = new Dataloader(async (ids) => {
    const artists = await this.dbConnection("artist").whereIn("id", ids);

    return ids.map((id) => artists.find((artist) => artist.id === id));
  });

  async getArtistById({ id }) {
    return this.batchArtists.load(id);
  }
}
