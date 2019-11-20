import { TweetDto } from "../models/tweet-dto";

export interface TweetStrategy {
  getTweet(): Promise<TweetDto>;
}
