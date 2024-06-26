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
    const sqlPreview = document.getElementById('sqlPreview');
    if (sqlPreview) {
      sqlPreview.value = e.target.result;
    }
  };
  reader.readAsText(file);
};

// Otras funciones de servicios
