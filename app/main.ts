import "./styles/main.scss";
import { Nav } from "./scripts/lib/core/nav";
import { LazyLoader } from "./scripts/lib/core/lazy-load";
import { prism } from "./scripts/lib/core/prism";
import { LatestTweetService } from "./scripts/lib/services/tweet/latest-tweet";
import { TweetDto } from "./scripts/lib/models/tweet-dto";
import { StoredTweetService } from "./scripts/lib/services/tweet/stored-tweet";
import { ObtainTweet } from "./scripts/lib/services/tweet/obtain-tweet";

new LazyLoader("");
prism();
createNav();

getMyLatestTweet()
  .then(t => {
    const latestTweetHolder = document.querySelector(".latest-tweet");
    if (latestTweetHolder) {
      latestTweetHolder.innerHTML = t.message;
    }
  })
  .catch(() => {
    const title = document.querySelector(".latest-tweet-title");
    if (title) {
      title.innerHTML = "";
    }
  });

async function getMyLatestTweet() {
  let tweet: TweetDto;
  const storedTweetStrategy = new StoredTweetService();
  const context = new ObtainTweet(storedTweetStrategy);

  tweet = await context.obtainTweet();
  if (tweet.id === "") {
    context.setStrategy(new LatestTweetService());
    tweet = await context.obtainTweet();
    storedTweetStrategy.storeLatestTweet(tweet);
  }

  return Promise.resolve(tweet);
}

function createNav() {
  let nav: Nav;
  const overlay = <HTMLDivElement>document.querySelector(".nav-overlay");
  const toggleNav = <HTMLButtonElement>document.querySelector(".nav-button");
  if (toggleNav && overlay) {
    nav = new Nav({ toggleNav, overlay });
    nav.init();
  } else {
    throw "Nav items are not defined!";
  }
}
