import "./styles/main.scss";
import { Nav } from "./nav";
import { LazyLoader } from "./lazy-load";
import { prism } from "./prism";
prism();

let nav: Nav;

const overlay = <HTMLDivElement>document.querySelector(".nav-overlay");
const toggleNav = <HTMLButtonElement>document.querySelector(".nav-button");

if (toggleNav && overlay) {
  nav = new Nav({ toggleNav, overlay });
  nav.init();
}

new LazyLoader("");
