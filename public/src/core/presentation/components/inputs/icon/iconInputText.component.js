import { getThemeColors } from '../../../../../../configuration/themes/adapter.themes.js';

export class IconInputTextComponent {
    constructor({
        value = '',
        placeholder = '',
        identifier = 'input-text',
        onChange = () => {},
        className = '',
        ariaLabel = '',
        inputBorderColor = 'lightThemeColors.inputBackground',
        ariaLabelColor = 'lightThemeColors.label',
        SVG = `
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 absolute right-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
        `,
        theme = 'light'
    }) {
        this.value = value;
        this.placeholder = placeholder;
        this.identifier = identifier;
        this.onChange = onChange;
        this.className = className;
        this.ariaLabel = ariaLabel;
        this.inputBorderColor = inputBorderColor;
        this.ariaLabelColor = ariaLabelColor;
        this.SVG = SVG;
        this.theme = theme;
        this.render();
    }

    render() {
        this.element = document.createElement('div');
        this.element.classList.add('relative');

        const colors = getThemeColors(this.theme);

        this.element.innerHTML = `
            <input 
                type="text" 
                id="${this.identifier}" 
                class="border ${this.inputBorderColor} ${colors.inputBackground} ${colors.inputText} text-sm rounded-lg ${colors.focusRing} ${colors.focusBorder} block w-full pl-3 pr-10 py-2.5 ${this.className}" 
                placeholder="${this.placeholder}" 
                value="${this.value}">
            ${this.SVG}
            <label for="${this.identifier}" class="block text-sm font-medium ${this.ariaLabelColor} text-right mt-1 pr-2.5">${this.ariaLabel}</label>
        `;

        const inputElement = this.element.querySelector('input');
        inputElement.addEventListener('change', this.onChange);
    }

    getElement() {
        return this.element;
    }
}
