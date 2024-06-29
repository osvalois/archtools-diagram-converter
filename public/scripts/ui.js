//ui.js

const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const fileNameDisplay = document.getElementById('fileName');
    
    if (file) {
        displaySQLPreview(file);
        showViewer();
        fileNameDisplay.textContent = file.name;
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
