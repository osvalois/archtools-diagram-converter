function LogoComponent({
    text1 = 'Default1',
    text2 = 'Default2',
    gradient1 = 'from-blue-500 to-green-500',
    gradient2 = 'from-purple-500 to-pink-500',
    className = '',
    ariaLabel = 'Logo Component'
  }) {
    const render = () => {
      const HTML = `
        <a href="#" class="flex items-center pb-4 ${className}" aria-label="${ariaLabel}">
          <h2 class="font-bold text-3xl text-gray-800 flex items-center" style="font-family: 'Roboto', sans-serif;">
            <span class="bg-gradient-to-r ${gradient1} text-white px-2 py-1 rounded-l-md">${text1}</span>
            <span class="bg-gradient-to-r ${gradient2} text-white px-2 py-1 rounded-r-md">${text2}</span>
          </h2>
        </a>`;
      return HTML;
    };
  
    return render();
  }
  
  export default LogoComponent;
  