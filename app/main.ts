import "./styles/main.scss";
import { Nav } from "./nav";
import { LazyLoader } from "./lazy-load";
import { prism } from "./prism";
import { Gallery } from "./gallery";

prism();
createNav();
createLazyLoader();
createGallery();

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
