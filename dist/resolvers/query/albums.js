"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.albums = exports.decode = exports.encode = void 0;
const encode = (stringToEncode = "") => Buffer.from(stringToEncode).toString("base64");
exports.encode = encode;
const decode = (stringToDecode = "") => Buffer.from(stringToDecode, "base64").toString();
exports.decode = decode;
const albums = async (_, { first, after }, { datasources }) => {
    const albums = await datasources.album.getAlbums(first, after ? (0, exports.decode)(after) : null);
    return {
        edges: albums.slice(0, first).map((album) => ({
            cursor: (0, exports.encode)(album.title.toString()),
            node: album,
        })),
        pageInfo: {
            hasNextPage: albums.length > first,
            endCursor: (0, exports.encode)(albums[albums.slice(0, first).length - 1]?.title.toString()),
        },
    };
};
exports.albums = albums;
