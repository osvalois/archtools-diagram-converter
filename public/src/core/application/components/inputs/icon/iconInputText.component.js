// iconInputText.component.js

import { darkThemeColors, lightThemeColors } from '../../../../data/adapter/themes.adapter.js';

export class IconInputTextComponent {
    constructor({
        value = '',
        placeholder = '',
        identifier = 'input-text',
        onChange = () => {},
        className = '',
        ariaLabel = '',
        inputBorderColor = lightThemeColors.inputBackground,
        ariaLabelColor = lightThemeColors.label,
        SVG = `
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
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
        const colors = this.theme === 'dark' ? darkThemeColors : lightThemeColors;
        const inputHtml = `
            <input 
                type="text" 
                id="${this.identifier}" 
                class="border ${this.inputBorderColor} ${colors.inputBackground} ${colors.inputText} text-sm rounded-lg ${colors.focusRing} ${colors.focusBorder} block w-full pl-10 pr-2.5 py-2.5 ${this.className}" 
                placeholder="${this.placeholder}" 
                value="${this.value}" 
                onchange="${this.onChange}">
        `;
        const labelHtml = `
            <label for="${this.identifier}" class="block text-sm font-medium ${this.ariaLabelColor} text-right">${this.ariaLabel}</label>
        `;
        const svgHtml = `
            <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                ${this.SVG}
            </div>
        `;
        
        // Construir el elemento completo
        this.element = document.createElement('div');
        this.element.innerHTML = `
            ${svgHtml}
            ${inputHtml}
            ${labelHtml}
        `;
    }

    getElement() {
        return this.element;
    }
}
