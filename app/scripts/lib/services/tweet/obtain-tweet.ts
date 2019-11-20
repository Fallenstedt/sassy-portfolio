import { TweetStrategy } from "../../interfaces/tweet-strategy.interface";
import { TweetDto } from "../../models/tweet-dto";

export class ObtainTweet {
  constructor(private strategy: TweetStrategy) {}

  public setStrategy(strategy: TweetStrategy): void {
    this.strategy = strategy;
  }

  public async obtainTweet(): Promise<TweetDto> {
    const result = await this.strategy.getTweet();
    return result;
  }
}
