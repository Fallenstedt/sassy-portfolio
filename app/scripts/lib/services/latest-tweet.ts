import { HttpClient } from "../core/http";
import { TweetDto } from "../models/tweet-dto";

export class LatestTweet {
  async getLatestTweet(): Promise<TweetDto> {
    let tweet: TweetDto;
    let response = await HttpClient.get(
      "https://yi6fgzh27l.execute-api.us-west-2.amazonaws.com/Stage/tweet"
    );
    if (response.status == 200) {
      tweet = new TweetDto(response.data);
    } else {
      tweet = new TweetDto("{id: 0, message: ''}");
    }

    return tweet;
  }
}
