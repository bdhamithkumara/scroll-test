class ArcText extends HTMLElement {
    isReady = false;
    radius = 500;
    widths = [];
    angles = [];
    value = "";
    textRowEls = [];
    outerRotateEl = null;
  
    static cssClassNames = {
      row: "text-row",
      stage: "stage",
      character: "char",
      outerRotate: "outer-rotate",
    };
  
    constructor() {
      super();
    }
  
    static get observedAttributes() {
      return [
        "value",
        "font-size",
        "radius",
        "rotation",
        "backface-opacity",
        "fonts-loaded",
        "text-color",
        "bg-color",
        "perspective-origin-y",
        "perspective-origin-x",
      ];
    }
  
    static angleBetweenLines(radius, distanceApart) {
      const halfChordLength = distanceApart / 2;
      const angleRadians = 2 * Math.asin(halfChordLength / radius);
      const angleDegrees = angleRadians * (180 / Math.PI);
      return angleDegrees;
    }
  
    attributeChangedCallback(name, _oldValue, newValue) {
      if (name === "value") {
        this.doAllTheThings();
      }
  
      if (name === "radius") {
        this.style.setProperty("--radius", newValue.toString());
        this.doAllTheThings();
      }
  
      if (name === "rotation") {
        this.style.setProperty("--rotation", newValue.toString() + "deg");
        this.doAllTheThings();
      }
  
      if (name === "font-size") {
        this.style.setProperty("--font-size", newValue + "px");
        this.doAllTheThings();
      }
  
      if (["text-color", "bg-color"].includes(name)) {
        this.style.setProperty(`--${name}`, newValue);
      }
  
      if (["backface-opacity"].includes(name)) {
        if (typeof parseInt(newValue) === "number") {
          const value = parseInt(newValue);
          this.style.setProperty(`--${name}`, value + "%");
        }
      }
  
      if (["perspective-origin-x", "perspective-origin-y"].includes(name)) {
        if (typeof parseInt(newValue) === "number") {
          const value = parseInt(newValue);
          this.style.setProperty(`--${name}`, value + "%");
          this.doAllTheThings();
        }
      }
  
      if (name === "fonts-loaded") {
        this.doAllTheThings();
      }
    }
  
    applyStyles() {
      const childArr = this.querySelectorAll(
        `.${ArcText.cssClassNames.character}`
      );
  
      for (let i = 0; i < childArr.length; i++) {
        const el = childArr[i];
        const transform = `rotateY(${this.angles[i]}deg) translateZ(calc(var(--font-size) * var(--radius)))`;
        el.style.transform = transform;
      }
    }
  
    updateWidths() {
      if (!this.isReady || !this.textRowEls?.[0]) return;
  
      const childArr = this.querySelectorAll(".char");
  
      let cumulativeAngle = 0;
      let prevWidth = 0;
      this.widths = [];
      this.angles = [];
  
      const computedStyle = window.getComputedStyle(this);
  
      this.radius =
        parseFloat(computedStyle.getPropertyValue("--radius")) *
        parseInt(computedStyle.getPropertyValue("--font-size"));
  
      for (let i = 0; i < childArr.length; i++) {
        const rect = childArr[i].getBoundingClientRect();
        const { width } = rect;
        const halfWidth = width / 2;
        const angle = ArcText.angleBetweenLines(
          this.radius,
          (i > 0 ? width / 2 : 0) + prevWidth
        );
        prevWidth = halfWidth;
  
        this.widths.push(width);
        cumulativeAngle += angle;
        this.angles.push(cumulativeAngle);
      }
      this.outerRotateEl.classList.add("ready");
      this.textRowEls[0].style.transform = `rotateY(calc(-${
        cumulativeAngle / 2
      }deg + var(--rotation)))`;
    }
  
    createHTML() {
      let str = this.getAttribute("value") || "";
      const className = ArcText.cssClassNames.character;
      const map = (s) => `<span class="${className}">${s.trim()}</span>`;
  
      str = str.split("").map(map).join("");
  
      this.innerHTML = this.tpl(str);
  
      this.outerRotateEl = this.querySelector(
        `.${ArcText.cssClassNames.outerRotate}`
      );
  
      this.textRowEls = Array.from(
        this.querySelectorAll(`.${ArcText.cssClassNames.row}`)
      );
    }
  
    doAllTheThings() {
      this.createHTML();
      this.updateWidths();
      this.applyStyles();
    }
  
    connectedCallback() {
      document.fonts.ready.then(() => {
        this.isReady = true;
        this.doAllTheThings();
      });
    }
  
    tpl(html) {
      return `
        <div class="${ArcText.cssClassNames.stage}">
          <div class="${ArcText.cssClassNames.outerRotate}">
              <div class="${ArcText.cssClassNames.row}">${html}</div>
            </div>
          </div>
        </div>`;
    }
  }
  
  customElements.define("arc-text", ArcText);
  