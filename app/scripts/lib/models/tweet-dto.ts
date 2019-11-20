export class TweetDto {
  public id: string;
  public message: string;

  constructor(data: any) {
    this.id = data["id"];
    this.message = data["message"];
  }

  static createEmptyDto() {
    return new TweetDto({ id: "", message: "" });
  }
}
