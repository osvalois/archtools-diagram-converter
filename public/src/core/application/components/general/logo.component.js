// LogoComponent.js
class LogoComponent {
  constructor({
      text1 = 'Default1',
      text2 = 'Default2',
      gradient1 = 'from-blue-500 to-green-500',
      gradient2 = 'from-purple-500 to-pink-500',
      className = '',
      ariaLabel = 'Logo Component'
  }) {
      this.text1 = text1;
      this.text2 = text2;
      this.gradient1 = gradient1;
      this.gradient2 = gradient2;
      this.className = className;
      this.ariaLabel = ariaLabel;
      this.render();
  }

  render() {
      const logoHtml = `
          <a href="#" class="flex items-center pb-4 ${this.className}" aria-label="${this.ariaLabel}">
              <h2 class="font-bold text-3xl text-gray-800 flex items-center" style="font-family: 'Roboto', sans-serif;">
                  <span class="bg-gradient-to-r ${this.gradient1} text-white px-2 py-1 rounded-l-md">${this.text1}</span>
                  <span class="bg-gradient-to-r ${this.gradient2} text-white px-2 py-1 rounded-r-md">${this.text2}</span>
              </h2>
          </a>
      `;

      // Construir el elemento completo
      this.element = document.createElement('div');
      this.element.innerHTML = logoHtml;
  }

  getElement() {
      return this.element;
  }
}

export default LogoComponent;
