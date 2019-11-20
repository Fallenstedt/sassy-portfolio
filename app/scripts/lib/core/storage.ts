export enum StorageKeys {
  LatestTweet = "latestTweet"
}

export class SessionStorage {
  static getItem<T>(key: StorageKeys): T | null {
    if (!key) {
      throw "session key must be defined";
    }

    const storage = window.sessionStorage;
    const item = storage.getItem(key);

    if (item === null) {
      return null;
    }

    return JSON.parse(item) as T;
  }

  static setItem<T>(key: StorageKeys, item: T): T {
    if (!key || !item) {
      throw "key and item must be defined";
    }

    const storage = window.sessionStorage;
    storage.setItem(key, JSON.stringify(item));
    return item;
  }
}
