//services.js
// Función para convertir SQL a ERB
const convertToERB = () => {
  const fileInput = document.getElementById('fileInput');
  const formData = prepareFormData(fileInput);
  if (!formData) return;
  fetchAndHandleConversionERB('/convert/sql/erb', formData);
};


// Función para convertir a PNG
 const convertToPNG = () => {
  const fileInput = document.getElementById('fileInput');
  const resultContainer = document.getElementById('resultContainer');
  const formData = prepareFormData(fileInput);
  if (!formData) return;
  fetchAndHandleConversion('/convert/erb/image', formData, resultContainer);
};


// Otras funciones de servicios
