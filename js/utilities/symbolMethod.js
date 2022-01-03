class SymbolMethod {
  constructor(methodsTrigger, methodsContainer, otherTextArea, s) {
    this.symbol = "A";
    this.methodsTrigger = document.querySelector(`.${methodsTrigger}`);
    this.methodsContainer = document.querySelector(`.${methodsContainer}`);
    this.otherTextArea = document.querySelector(`.${otherTextArea}`);

    this.methodsTrigger.addEventListener("click", () => {
      if (this.methodsContainer.style.display === "block") {
        this.methodsContainer.style.display = "none";
        this.methodsTrigger.children[2].innerHTML =
          '<i class="fas fa-chevron-down"></i>';
      } else {
        this.methodsContainer.style.display = "block";
        this.methodsTrigger.children[2].innerHTML =
          '<i class="fas fa-chevron-up"></i>';
      }
    });
    [...this.methodsContainer.children].forEach((c) => {
      c.addEventListener("click", () => {
        const symbol = c.children[0].innerHTML;
        const method = c.children[1].innerHTML;
        this.methodsTrigger.children[0].innerText = symbol;
        this.methodsTrigger.children[1].innerText = method;
        this.methodsContainer.style.display = "none";
        this.methodsTrigger.children[2].innerHTML =
          '<i class="fas fa-chevron-down"></i>';
        this.symbol = symbol;
        if (this.otherTextArea) {
          if (symbol === s) {
            this.otherTextArea.style.display = "flex";
          } else {
            this.otherTextArea.style.display = "none";
          }
        }
      });
    });
    document.addEventListener("click", (e) => {
      if (
        e.target !== this.methodsContainer &&
        !this.methodsContainer.contains(e.target) &&
        e.target !== this.methodsTrigger &&
        !this.methodsTrigger.contains(e.target)
      ) {
        this.methodsContainer.style.display = "none";
        this.methodsTrigger.children[2].innerHTML =
          '<i class="fas fa-chevron-down"></i>';
      }
    });
  }
  getSymbol = () => {
    return this.symbol;
  };
}
