import Dataloader from "dataloader";

export class MusicDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
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
}
