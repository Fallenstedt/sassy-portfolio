import { HttpClient } from "../../core/http";
import { TweetDto } from "../../models/tweet-dto";
import { AxiosResponse } from "axios";
import { TweetStrategy } from "../../interfaces/tweet-strategy.interface";

export class LatestTweetService implements TweetStrategy {
  public async getTweet(): Promise<TweetDto> {
    const response = await HttpClient.get(
      "https://yi6fgzh27l.execute-api.us-west-2.amazonaws.com/Prod/tweet"
    );

    let tweet: TweetDto = this.createTweetDto(response);

    return tweet;
  }

  private createTweetDto(response: AxiosResponse<any>) {
    let tweet: TweetDto;
    if (response.status == 200 && response.data !== null) {
      tweet = new TweetDto(response.data);
    } else {
      tweet = TweetDto.createEmptyDto();
    }
    return tweet;
  }
}
