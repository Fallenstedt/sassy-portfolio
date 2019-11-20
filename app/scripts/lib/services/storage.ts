export enum StorageKeys {
  LatestTweet = "latestTweet"
}

interface StorageMedium {
  storage: any;
  getItem(key: StorageKeys): any;
}

export class LocalStorage implements StorageMedium {
  public storage: Window;

  constructor(storage: Window) {
    this.storage = storage;
  }

  public getItem<T>(key: StorageKeys): T {
    if (!key) {
      throw "session key must be defined";
    }

    const storage = this.storage.sessionStorage;
    const item = storage.getItem("key");

    if (item === null) {
      throw "item is null";
    }

    return JSON.parse(item);
  }

  public setItem<T>(key: StorageKeys, item: T): void {
    if (!key || !item) {
      throw "key and item must be defined";
    }

    const storage = this.storage.sessionStorage;

    storage.setItem(key, JSON.stringify(item));
  }
}
