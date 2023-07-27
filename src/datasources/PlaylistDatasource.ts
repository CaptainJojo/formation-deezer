import Dataloader from "dataloader";
export class PlaylistDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  private batchPlaylists = new Dataloader(async (ids) => {
    const playlists = await this.dbConnection("playlist").whereIn("id", ids);

    return ids.map((id) => playlists.find((playlist) => playlist.id === id));
  });

  async getPlaylistById({ id }) {
    return this.batchPlaylists.load(id);
  }
}
