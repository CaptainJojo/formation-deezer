import { KeyvAdapter } from "@apollo/utils.keyvadapter";
import RedisCollector from "../plugins/redisCollector";

export class MyKeyvAdapter extends KeyvAdapter {
  defaultSetOptions: { ttl: any };
  constructor(keyv) {
    super(keyv);
  }

  async get(key) {
    RedisCollector.addGetInfos({
      cacheId: key,
    });
    return super.get(key);
  }

  async set(key, value, options) {
    // @ts-ignore
    const { ttl } = { ...this.defaultSetOptions, ...options };

    RedisCollector.addSetInfos({
      cacheId: key,
      ttl,
    });

    return super.set(key, value, options);
  }
}
