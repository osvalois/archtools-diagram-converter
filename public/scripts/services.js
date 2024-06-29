//services.js
// Función para convertir a ERB
 const convertToERB = () => {
  const fileInput = document.getElementById('fileInput');
  const formData = prepareFormData(fileInput);
  if (!formData) return;

  fetchAndHandleConversion('/convert/sql/erb', formData);
};

// Función para convertir a PNG
 const convertToPNG = () => {
  const fileInput = document.getElementById('fileInput');
  const resultContainer = document.getElementById('resultContainer');
  const formData = prepareFormData(fileInput);
  if (!formData) return;

  displaySQLPreview(formData.get('file')); // Mostrar vista previa del script SQL

  fetchAndHandleConversion('/convert/erb/image', formData, resultContainer);
};
// Funciones adicionales de servicios según sea necesario
const displaySQLPreview = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const existingPreview = document.getElementById('sqlPreview');
    
    // Remove existing preview if it exists
    if (existingPreview) {
      existingPreview.parentNode.removeChild(existingPreview);
    }

    // Create a new textarea for SQL preview
    const sqlPreviewTextarea = document.createElement('textarea');
    sqlPreviewTextarea.id = 'sqlPreview';

    // Append the textarea to the container
    const container = document.getElementById('sqlPreviewContainer');
    container.appendChild(sqlPreviewTextarea);

    // Initialize CodeMirror instance
    CodeMirror.fromTextArea(sqlPreviewTextarea, {
      mode: 'text/x-sql',
      theme: 'dracula',
      lineNumbers: true,
      indentWithTabs: true,
      smartIndent: true,
      lineWrapping: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      styleActiveLine: true,
      extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Ctrl-/": "toggleComment"
      }
    }).setValue(e.target.result);
  };
  
  reader.readAsText(file);
};


// Otras funciones de servicios
