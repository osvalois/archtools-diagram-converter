// FormButtonComponent
class FormButtonComponent {
  constructor({
      text = 'Submit',
      isSubmitting = false,
      onClick = () => {},
      className = '',
      type = 'button',
      ariaLabel = 'Form Button'
  }) {
      this.text = text;
      this.isSubmitting = isSubmitting;
      this.onClick = onClick;
      this.className = className;
      this.type = type;
      this.ariaLabel = ariaLabel;
      this.render();
  }

  render() {
      const buttonText = this.isSubmitting ? 'Espere...' : this.text;
      const disabledAttr = this.isSubmitting ? 'disabled' : '';

      const buttonHtml = `
          <button 
              type="${this.type}" 
              class="mb-3 bg-gradient-to-r from-purple-500 to-indigo-500 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong ${this.className}" 
              aria-label="${this.ariaLabel}" 
              data-twe-ripple-init="" 
              data-twe-ripple-color="light" 
              ${disabledAttr}>
              ${buttonText}
          </button>
      `;

      // Construir el elemento completo
      this.element = document.createElement('div');
      this.element.innerHTML = buttonHtml;
      this.element.querySelector('button').addEventListener('click', this.onClick);
  }

  getElement() {
      return this.element;
  }
}

export default FormButtonComponent;
