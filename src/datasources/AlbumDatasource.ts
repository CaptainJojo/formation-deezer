export class AlbumDatasource {
  private dbConnection: any;

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async getAlbums(first, after) {
    const condition = after ? `and title < '${after}'` : "";
    const limit = first + 1;

    const musics = await this.dbConnection.raw(
      `SELECT * FROM album WHERE 0=0
      ${condition}
      ORDER BY title DESC LIMIT ?`,
      [limit]
    );

    return musics.rows;
  }
}
