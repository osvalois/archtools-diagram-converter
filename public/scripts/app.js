// Event listeners para botones y otros elementos de la interfaz
document.getElementById('editButton').addEventListener('click', () => {
    // Lógica para editar
  });
  
  document.getElementById('deleteButton').addEventListener('click', () => {
    showPicker();
    // Lógica para eliminar
  });
  
  document.getElementById('closeModalButton').addEventListener('click', closeFullscreen);
  
  // Event listener para cargar archivos y mostrar vista previa
  const fileInput = document.getElementById('fileInput');
  if (fileInput) {
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) {
        displaySQLPreview(file);
        showViewer(); // Mostrar el visor después de cargar el archivo
      }
    });
  }