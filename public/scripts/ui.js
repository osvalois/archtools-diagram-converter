//ui.js

const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const fileNameDisplay = document.getElementById('fileName');
    
    if (file) {
        showViewer();
        fileNameDisplay.textContent = file.name;
    }
};
// Función para ver la imagen en pantalla completa usando un modal
const viewFullScreen = () => {
    const resultContainer = document.getElementById('resultContainer');
    const img = resultContainer.querySelector('img');
    if (img) {
      const modalContainer = document.createElement('div');
      modalContainer.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-black', 'bg-opacity-90', 'flex', 'items-center', 'justify-center', 'z-50');
      
      const modalContent = document.createElement('div');
      modalContent.classList.add('max-w-screen-lg', 'mx-auto', 'overflow-hidden', 'shadow-lg', 'rounded-md');
  
      const fullScreenImage = document.createElement('img');
      fullScreenImage.src = img.src;
      fullScreenImage.classList.add('max-w-full', 'max-h-full');
  
      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close';
      closeButton.classList.add('absolute', 'top-4', 'right-4', 'px-3', 'py-1', 'bg-gray-800', 'text-white', 'rounded-md', 'hover:bg-gray-700', 'focus:outline-none');
      closeButton.addEventListener('click', () => {
        modalContainer.remove();
      });
  
      modalContent.appendChild(fullScreenImage);
      modalContent.appendChild(closeButton);
      modalContainer.appendChild(modalContent);
  
      document.body.appendChild(modalContainer);
  
      // Event listener para cerrar el modal al hacer clic fuera de la imagen
      modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
          modalContainer.remove();
        }
      });
    }
  };
  
const toggleSidebar = (event) => {
    event.preventDefault();
    document.querySelector('.main').classList.toggle('active');
    document.querySelector('.sidebar-overlay').classList.toggle('hidden');
    document.querySelector('.sidebar-menu').classList.toggle('-translate-x-full');
};

const closeSidebar = (event) => {
    event.preventDefault();
    document.querySelector('.main').classList.add('active');
    document.querySelector('.sidebar-overlay').classList.add('hidden');
    document.querySelector('.sidebar-menu').classList.add('-translate-x-full');
};

const handleSidebarDropdownClick = (event) => {
    event.preventDefault();
    const parent = event.currentTarget.closest('.group');
    const selectedClass = 'selected';
    
    if (parent.classList.contains(selectedClass)) {
        parent.classList.remove(selectedClass);
    } else {
        document.querySelectorAll('.sidebar-dropdown-toggle').forEach(item => {
            item.closest('.group').classList.remove(selectedClass);
        });
        parent.classList.add(selectedClass);
    }
};

const initDropdowns = () => {
    const popperInstance = {};

    document.querySelectorAll('.dropdown').forEach((item, index) => {
        const popperId = `popper-${index}`;
        const toggle = item.querySelector('.dropdown-toggle');
        const menu = item.querySelector('.dropdown-menu');
        
        menu.dataset.popperId = popperId;
        popperInstance[popperId] = Popper.createPopper(toggle, menu, {
            modifiers: [
                { name: 'offset', options: { offset: [0, 8] } },
                { name: 'preventOverflow', options: { padding: 24 } },
            ],
            placement: 'bottom-end'
        });
    });

    document.addEventListener('click', (event) => {
        const toggle = event.target.closest('.dropdown-toggle');
        const menu = event.target.closest('.dropdown-menu');
        
        if (toggle) {
            const menuEl = toggle.closest('.dropdown').querySelector('.dropdown-menu');
            const popperId = menuEl.dataset.popperId;
            
            if (menuEl.classList.contains('hidden')) {
                hideDropdown();
                menuEl.classList.remove('hidden');
                showPopper(popperId, popperInstance);
            } else {
                menuEl.classList.add('hidden');
                hidePopper(popperId, popperInstance);
            }
        } else if (!menu) {
            hideDropdown();
        }
    });
};

const hideDropdown = () => {
    document.querySelectorAll('.dropdown-menu').forEach(item => {
        item.classList.add('hidden');
    });
};

const showPopper = (popperId, popperInstance) => {
    popperInstance[popperId].setOptions(options => ({
        ...options,
        modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: true },
        ],
    }));
    popperInstance[popperId].update();
};

const hidePopper = (popperId, popperInstance) => {
    popperInstance[popperId].setOptions(options => ({
        ...options,
        modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: false },
        ],
    }));
};
