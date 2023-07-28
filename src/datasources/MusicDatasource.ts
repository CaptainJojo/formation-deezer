import Dataloader from "dataloader";

export class MusicDatasource {
  private dbConnection: any;
  private cache: any;

  constructor(dbConnection, cache) {
    this.dbConnection = dbConnection;
    this.cache = cache;
  }

  private batchMusics = new Dataloader(async (ids) => {
    const musics = await this.dbConnection("music").whereIn("id", ids);

    return ids.map((id) => musics.find((music) => music.id === id));
  });

  async getMusicById({ id }) {
    return this.batchMusics.load(id);
  }

  async getMusics(first, after) {
    const condition = after ? `and title < '${after}'` : "";
    const limit = first + 1;

    const musics = await this.dbConnection.raw(
      `SELECT * FROM music WHERE 0=0
      ${condition}
      ORDER BY title DESC LIMIT ?`,
      [limit]
    );

    return musics.rows;
  }

  private batchMusicsByAlbum = new Dataloader(async (albumIds) => {
    const musics = await this.dbConnection("music").whereIn(
      "album_id",
      albumIds
    );

    return albumIds.map((albumId) =>
      musics.filter((music) => music.album_id === albumId)
    );
  });

  async getMusicsByAlbum({ albumId }) {
    if (this.cache) {
      const cachedMusics = await this.cache.get(`musics-${albumId}`);
      if (cachedMusics) {
        return cachedMusics;
      }
    }

    const musicAlbums = await this.batchMusicsByAlbum.load(albumId);

    if (this.cache) {
      this.cache.set(`musics-${albumId}`, musicAlbums, { ttl: 60 });
    }

    return musicAlbums;
  }
}
