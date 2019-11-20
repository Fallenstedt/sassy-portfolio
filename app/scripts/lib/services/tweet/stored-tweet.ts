import { TweetStrategy } from "../../interfaces/tweet-strategy.interface";
import { TweetDto } from "../../models/tweet-dto";
import { SessionStorage, StorageKeys } from "../../core/storage";

export class StoredTweetService implements TweetStrategy {
  public async getTweet(): Promise<TweetDto> {
    const tweet = SessionStorage.getItem<TweetDto>(StorageKeys.LatestTweet);
    if (tweet) {
      return Promise.resolve(tweet);
    }
    return Promise.resolve(TweetDto.createEmptyDto());
  }

  public storeLatestTweet(tweet: TweetDto): TweetDto {
    SessionStorage.setItem<TweetDto>(StorageKeys.LatestTweet, tweet);
    return tweet;
  }
}
