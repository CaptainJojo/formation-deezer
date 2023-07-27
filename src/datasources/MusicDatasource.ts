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
}
