
document.addEventListener('DOMContentLoaded', () => {
    // Evento cuando se carga el DOM

    // Event listener para editar
    const editButton = document.getElementById('editButton');
    if (editButton) {
        editButton.addEventListener('click', () => {
            // Lógica para editar
        });
    }

    // Event listener para eliminar
    const deleteButton = document.getElementById('deleteButton');
    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            showPicker();
        });
    }
    // Event listener para abrir fullscreen
    const fullscreenButton = document.getElementById('fullscreenButton');
    if (fullscreenButton) {
        fullscreenButton.addEventListener('click', () => {
            openFullscreen();
        });
    }

    // Event listener para cerrar modal y fullscreen
    const closeModalButton = document.getElementById('closeModalButton');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            closeModal();
        });
    }
    // Event listener para cerrar la pantalla completa
    const closeFullscreenButton = document.getElementById('closeFullscreenButton');
    if (closeFullscreenButton) {
        closeFullscreenButton.addEventListener('click', () => {
            closeFullscreen();
        });
    }


    // Event listener para cargar archivos y mostrar vista previa
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) {
                displaySQLPreview(file);
                showViewer();
            }
        });
    }
});
