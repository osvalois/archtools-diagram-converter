
 //utils.js
 const prepareFormData = (fileInput) => {
    const tableBgColor = document.getElementById('tableBgColor').value;
    const headerBgColor = document.getElementById('headerBgColor').value;
    const headerTextColor = document.getElementById('headerTextColor').value;
    const relationshipColor = document.getElementById('relationshipColor').value;
    const cellTextColor = document.getElementById('cellTextColor').value;
    const fontFamily = document.getElementById('fontFamily').value;
  
    const file = fileInput.files[0];
    if (!file) {
      const resultContainer = document.getElementById('resultContainer');
      if (resultContainer) {
        resultContainer.innerHTML = '<p>Por favor selecciona un archivo .sql.</p>';
      }
      return null;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('table_bgcolor', tableBgColor);
    formData.append('header_bgcolor', headerBgColor);
    formData.append('header_text_color', headerTextColor);
    formData.append('relationship_color', relationshipColor);
    formData.append('cell_text_color', cellTextColor);
    formData.append('font_family', fontFamily);
  
    return formData;
  };
// Función para manejar la solicitud de conversión a ERB
const fetchAndHandleConversionERB = async (url, formData) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('La conversión a ERB falló.');
    }

    const erbContent = await response.text();
    return erbContent;
  } catch (error) {
    console.error('Error al manejar la conversión a ERB:', error);
    throw error; // Propaga el error para que sea manejado por el caller adecuadamente
  }
};

  // Función genérica para manejar la conversión y resultados
// Función para manejar la conversión y pintar la imagen
const fetchAndHandleConversion = async (url, formData, resultContainer) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    // Limpiar el contenedor y añadir la imagen
    resultContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Generated Image';
    img.classList.add('max-w-full', 'max-h-full');
    resultContainer.appendChild(img);
  } catch (error) {
    console.error('Error during conversion:', error);
    resultContainer.innerHTML = '<span class="text-red-500">Failed to generate image</span>';
  }
};
// Función para verificar si el contenido es un script SQL válido usando sql.js
async function isSQLValid(sqlContent) {
  const SQL = await initSqlJs({ locateFile: file => '../src/plugins/sql-wasm.js' }); // Ajusta la ruta al archivo sql-wasm.js según tu estructura
  try {
      const db = new SQL.Database();
      db.run(sqlContent); // Intenta ejecutar el script SQL
      return true; // Si se ejecuta sin errores, es válido
  } catch (error) {
      return false; // Si hay errores al ejecutar, no es válido
  }
}
