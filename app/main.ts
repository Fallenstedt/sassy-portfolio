import "regenerator-runtime/runtime";
import "./styles/main.scss";
import { Nav } from "./nav";
import { LazyLoader } from "./lazy-load";
import { prism } from "./prism";
import { Gallery } from "./gallery";
import { LatestTweet } from "./scripts/lib/services/latest-tweet";
import { TweetDto } from "./scripts/lib/models/tweet-dto";

prism();
createNav();
createLazyLoader();
createGallery();
getTweet().then(data => {
  console.log(data);
});

async function getTweet(): Promise<TweetDto> {
  const tweetService = new LatestTweet();
  const tweet = await tweetService.getLatestTweet();
  return tweet;
}
function createGallery() {
  const overlay: Element | null = document.querySelector(".gallery-overlay");
  const images: Array<HTMLImageElement> = Array.from(
    document.querySelectorAll(".gallery-img")
  );
  const carouselImages: Array<HTMLImageElement> = Array.from(
    document.querySelectorAll(".carousel-img")
  );

  if (!overlay && !images.length && !carouselImages.length) {
    return;
  }
  new Gallery(images, <Element>overlay, carouselImages);
}

function createLazyLoader() {
  new LazyLoader("");
}

function createNav() {
  let nav: Nav;
  const overlay = <HTMLDivElement>document.querySelector(".nav-overlay");
  const toggleNav = <HTMLButtonElement>document.querySelector(".nav-button");
  if (toggleNav && overlay) {
    nav = new Nav({ toggleNav, overlay });
    nav.init();
  }
}
