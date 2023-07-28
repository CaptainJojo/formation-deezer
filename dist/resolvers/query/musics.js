"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.musics = exports.decode = exports.encode = void 0;
const encode = (stringToEncode = "") => Buffer.from(stringToEncode).toString("base64");
exports.encode = encode;
const decode = (stringToDecode = "") => Buffer.from(stringToDecode, "base64").toString();
exports.decode = decode;
const musics = async (_, { first, after }, { datasources }) => {
    const musics = await datasources.music.getMusics(first, after ? (0, exports.decode)(after) : null);
    return {
        edges: musics.slice(0, first).map((music) => ({
            cursor: (0, exports.encode)(music.title.toString()),
            node: music,
        })),
        pageInfo: {
            hasNextPage: musics.length > first,
            endCursor: (0, exports.encode)(musics[musics.slice(0, first).length - 1]?.title.toString()),
        },
    };
};
exports.musics = musics;
