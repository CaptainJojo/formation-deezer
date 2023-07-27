import Dataloader from "dataloader";
export class FanDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  private batchFans = new Dataloader(async (ids) => {
    const fans = await this.dbConnection("fan").whereIn("id", ids);

    return ids.map((id) => fans.find((fan) => fan.id === id));
  });

  async getFansByArtist({ artistId }) {
    return this.batchFans.load(artistId);
  }
}
