"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fans = void 0;
const fans = async (parent, _, { datasources }) => {
    const fans = await datasources.fan.getFansByArtist({ artistId: parent.id });
    return fans.fans;
};
exports.fans = fans;
