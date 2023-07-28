"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForYouDatasource = void 0;
class ForYouDatasource {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }
    async getForYou({ userId }) {
        return await this.dbConnection("for_you")
            .select("*")
            .where({ user_id: userId });
    }
}
exports.ForYouDatasource = ForYouDatasource;
