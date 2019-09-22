export interface NavArgs {
  toggleNav: HTMLButtonElement;
  overlay: HTMLDivElement;
}

export class Nav {
  public toggleNav: HTMLButtonElement;
  public overlay: HTMLDivElement;

  constructor(args: NavArgs) {
    this.toggleNav = args.toggleNav;
    this.overlay = args.overlay;
  }

  public init() {
    if (this.toggleNav.onclick === null) {
      this.toggleNav.onclick = this.handleToggleNavClick.bind(this);
    }

    if (this.overlay.onclick === null) {
      this.overlay.onclick = this.handleToggleNavClick.bind(this);
    }
  }

  private handleToggleNavClick() {
    const classes = Array.from(this.overlay.classList);
    const isHidden = classes.includes("hide");
    if (isHidden) {
      this.overlay.classList.remove("hide");
    } else {
      this.overlay.classList.add("hide");
    }
  }
}
