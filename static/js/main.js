(function createNavBar() {
  const ATTR = {
    IS_NAV_OPEN: "mobile-nav-open"
  };
  window.customElements.define(
    "app-nav",
    class extends HTMLElement {
      static get observedAttributes() {
        return [ATTR.IS_NAV_OPEN];
      }

      get open() {
        return this.hasAttribute(ATTR.IS_NAV_OPEN);
      }
      set open(val) {
        // Reflect the value of open as HTML attribute
        if (val) {
          this.setAttribute(ATTR.IS_NAV_OPEN, val);
        } else {
          this.removeAttribute(ATTR.IS_NAV_OPEN);
        }
      }

      constructor() {
        super();
        this._createShadowDom();

        this.openNavButton = this.shadowRoot.getElementById("nav-open");
        this.closeNavButton = this.shadowRoot.getElementById("nav-close");

        this._addEventListeners();
      }

      attributeChangedCallback(name, oldValue, newValue) {
        if (ATTR.IS_NAV_OPEN) {
          const overlay = this.shadowRoot.querySelector(".nav-overlay");
          this._toggleOverlay(newValue, overlay);
        }
      }

      toggleNav() {
        if (this.open) {
          this.open = undefined;
        } else {
          this.open = "true";
        }
      }

      _addEventListeners() {
        this.closeNavButton.addEventListener(
          "click",
          this.toggleNav.bind(this)
        );
        this.openNavButton.addEventListener("click", this.toggleNav.bind(this));
      }

      _createShadowDom() {
        this.template = document.getElementById("app-nav");
        this.attachShadow({ mode: "open" }).appendChild(
          this.template.content.cloneNode(true)
        );
      }
      _toggleOverlay(newValue, overlay) {
        if (newValue == "true") {
          overlay.classList.remove("hide");
        } else {
          overlay.classList.add("hide");
        }
      }
    }
  );
})();
