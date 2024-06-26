
const showViewer = () => {
    const filePicker = document.getElementById('filePicker');
    const viewerContainer = document.getElementById('viewerContainer');
    if (filePicker && viewerContainer) {
        filePicker.classList.add('hidden');
        viewerContainer.classList.remove('hidden');
    }
};

const showPicker = () => {
    const filePicker = document.getElementById('filePicker');
    const viewerContainer = document.getElementById('viewerContainer');
    if (filePicker && viewerContainer) {
        filePicker.classList.remove('hidden');
        viewerContainer.classList.add('hidden');
    }
};

// Funciones para manejar pantalla completa
const openFullscreen = () => {
    const modal = document.getElementById('imageModal');
    if (modal) {
        if (modal.requestFullscreen) {
            modal.requestFullscreen();
        } else if (modal.webkitRequestFullscreen) { /* Safari */
            modal.webkitRequestFullscreen();
        } else if (modal.msRequestFullscreen) { /* IE11 */
            modal.msRequestFullscreen();
        }
    }
};

const closeFullscreen = () => {
    const modal = document.getElementById('imageModal');
    if (modal) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
};

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.add('hidden');
    }
};
