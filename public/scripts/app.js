//app.js
document.addEventListener('DOMContentLoaded', () => {
    // Función para descargar la imagen generada
    
const downloadImage = () => {
    const resultContainer = document.getElementById('resultContainer');
    const img = resultContainer.querySelector('img');
    if (img) {
      const link = document.createElement('a');
      link.href = img.src;
      link.download = 'generated_image.png';
      link.click();
    }
  };
  document.getElementById('resultContainer').addEventListener('click', viewFullScreen);
 
  // Función para descargar el diagrama
 // Función para descargar el diagrama
const downloadDiagram = async () => {
    const fileInput = document.getElementById('fileInput');
    const formData = prepareFormData(fileInput);
    if (!formData) return;
  
    try {
      const erbContent = await fetchAndHandleConversionERB('/convert/sql/erb', formData);
  
      // Descargar el contenido ERB como archivo
      const blob = new Blob([erbContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'generated_diagram.erb';
      link.click();
    } catch (error) {
      console.error('Error al convertir y descargar el diagrama:', error);
      // Aquí puedes manejar errores de manera apropiada, como mostrar un mensaje al usuario
    }
  };
  
    // Event listener para manejar la descarga según el formato seleccionado
    document.getElementById('downloadButton').addEventListener('click', () => {
        const downloadFormat = document.getElementById('downloadFormat').value;
        if (downloadFormat === 'image') {
            console.log("image");
          downloadImage();
        } else if (downloadFormat === 'diagram') {
            console.log("diagram");
          downloadDiagram();
        }
      });
      // Agrega el evento al botón showResult para llamar a convertToPNG
  document.getElementById('showResult').addEventListener('click', convertToPNG);
  document.getElementById('viewFullScreen').addEventListener('click', viewFullScreen);
   const sqlEditor = CodeMirror.fromTextArea(document.getElementById('sql-editor'), {
        mode: 'text/x-sql', 
        theme: 'dracula', 
        lineNumbers: true,
        indentUnit: 4,
        autofocus: true
    });

    const fileInput = document.getElementById('fileInput');
    const fileNameElement = document.getElementById('fileName');

    if (fileInput && fileNameElement) {
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = async function (e) {
                    const content = e.target.result;
                    sqlEditor.getDoc().setValue(content);
                    
                    //const isValidSQL = await isSQLValid(content);
                    //f (isValidSQL) {
                        //console.log('El archivo SQL es válido.');
                    //} else {
                        //console.log('El archivo no es un script SQL válido.');
                    //}
                    convertToPNG()
                };
                reader.readAsText(file);

                fileNameElement.textContent = file.name;
            }
        });
    }

    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
   
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const main = document.querySelector('.main');
    
    sidebarToggle.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    document.querySelectorAll('.sidebar-dropdown-toggle').forEach(item => {
        item.addEventListener('click', handleSidebarDropdownClick);
    });

    initDropdowns();
});