export class TweetDto {
  public id: string;
  public message: string;

  constructor(data: string) {
    const tweet: { id: string; message: string } = JSON.parse(data);
    this.id = tweet.id;
    this.message = tweet.message;
  }
}
