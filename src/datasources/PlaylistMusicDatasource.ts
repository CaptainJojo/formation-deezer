import Dataloader from "dataloader";
export class PlaylistMusicDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  private batchMusicsPlaylist = new Dataloader(async (ids) => {
    const musicsPlaylist = await this.dbConnection("playlist_music").whereIn(
      "playlist_id",
      ids
    );

    return ids.map((id) =>
      musicsPlaylist.filter((musicPlaylist) => musicPlaylist.playlist_id === id)
    );
  });

  async getMusicsByPlaylist({ id }) {
    return this.batchMusicsPlaylist.load(id);
  }
}
