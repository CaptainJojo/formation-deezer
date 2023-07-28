import Dataloader from "dataloader";
export class ArtistDatasource {
  private dbConnection: any;
  private cache: any;

  constructor(dbConnection, cache) {
    this.dbConnection = dbConnection;
    this.cache = cache;
  }

  private batchArtists = new Dataloader(async (ids) => {
    const artists = await this.dbConnection("artist").whereIn("id", ids);

    return ids.map((id) => artists.find((artist) => artist.id === id));
  });

  async getArtistById({ id }) {
    if (this.cache) {
      const artist = await this.cache.get(`artist-${id}`);
      if (artist) {
        return artist;
      }
    }

    const artist = await this.batchArtists.load(id);

    if (this.cache) {
      this.cache.set(`artist-${id}`, artist, { ttl: 60 });
    }

    return artist;
  }
}
