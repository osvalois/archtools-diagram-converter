import { darkThemeColors, lightThemeColors } from '../../../../data/datasource/themes.datasource.js'
function IconInputTextComponent({
    value = '',
    placeholder = '',
    identifier = 'input-text',
    onChange = () => { },
    className = '',
    ariaLabel = 'Input Text',
    inputBorderColor = lightThemeColors.inputBackground,
    arialLabelColor = lightThemeColors.label,
    SVG = `
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
    `,
    theme = 'light'
}) {
    const colors = theme === 'dark' ? darkThemeColors : lightThemeColors;
    const render = () => {
        return `
        <div class="relative mb-1">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                ${SVG}
            </div>
            <input type="text" id="${identifier}" class="border ${inputBorderColor} ${colors.inputBackground} ${colors.inputText} text-sm rounded-lg ${colors.focusRing} ${colors.focusBorder} block w-full ps-10 p-2.5 ${className}" placeholder="${placeholder}" value="${value}" onChange="${onChange}">
        </div>
        <label for="${identifier}" class="block text-sm font-medium ${arialLabelColor} text-right">${ariaLabel}</label>
    `;
    };

    return render();
}

export default IconInputTextComponent;
