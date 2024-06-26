
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
  
  // Función genérica para manejar la conversión y resultados
   const fetchAndHandleConversion = (url, formData, resultContainer) => {
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la conversión');
        }
        return response.blob();
      })
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.classList.add('max-w-full', 'max-h-full');
  
        const downloadButton = document.createElement('a');
        downloadButton.href = imageUrl;
        downloadButton.download = 'diagram.png';
        downloadButton.textContent = 'Descargar';
        downloadButton.classList.add('block', 'mt-4', 'px-4', 'py-2', 'bg-green-500', 'text-white', 'rounded-lg', 'hover:bg-green-600', 'focus:outline-none');
  
        if (resultContainer) {
          resultContainer.innerHTML = '';
          resultContainer.appendChild(downloadButton);
          resultContainer.appendChild(imageElement);
          
          // Mostrar el modal
          const modal = document.getElementById('imageModal');
          if (modal) {
            modal.classList.remove('hidden');
          }
        }
      })
      .catch(error => {
        if (resultContainer) {
          resultContainer.innerHTML = `<p>${error.message}</p>`;
        }
      });
  };
