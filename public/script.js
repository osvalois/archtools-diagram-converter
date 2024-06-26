// Función para cambiar el color de los cards dinámicamente
function changeCardColor(cardId, color) {
  const card = document.getElementById(cardId);
  card.style.backgroundColor = color;
}

// Función para mostrar la vista previa del script SQL
function displaySQLPreview(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const sqlPreview = document.getElementById('sqlPreview');
    sqlPreview.value = e.target.result;
  };
  reader.readAsText(file);
}
// Función para convertir a ERB
function convertToERB() {
  const fileInput = document.getElementById('fileInput');
  const tableBgColor = document.getElementById('tableBgColor').value;
  const headerBgColor = document.getElementById('headerBgColor').value;
  const headerTextColor = document.getElementById('headerTextColor').value;
  const relationshipColor = document.getElementById('relationshipColor').value;
  const cellTextColor = document.getElementById('cellTextColor').value;
  const fontFamily = document.getElementById('fontFamily').value;

  const file = fileInput.files[0];
  if (!file) {
    resultContainer.innerHTML = '<p>Por favor selecciona un archivo .sql.</p>';
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('table_bgcolor', tableBgColor);
  formData.append('header_bgcolor', headerBgColor);
  formData.append('header_text_color', headerTextColor);
  formData.append('relationship_color', relationshipColor);
  formData.append('cell_text_color', cellTextColor);
  formData.append('font_family', fontFamily);

  fetch('/convert/sql/erb', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la conversión a ERB');
      }
      return response.text();
    })
    .then(erbContent => {
      // Aquí puedes manejar el contenido ERB retornado (si se necesita)
      console.log('Contenido ERB:', erbContent);
      // Puedes hacer algo con el contenido ERB si es necesario
    })
    .catch(error => {
      resultContainer.innerHTML = `<p>${error.message}</p>`;
    });
}

// Función para convertir a PNG
function convertToPNG() {
  
  const fileInput = document.getElementById('fileInput');
  const resultContainer = document.getElementById('resultContainer');
  const tableBgColor = document.getElementById('tableBgColor').value;
  const headerBgColor = document.getElementById('headerBgColor').value;
  const headerTextColor = document.getElementById('headerTextColor').value;
  const relationshipColor = document.getElementById('relationshipColor').value;
  const cellTextColor = document.getElementById('cellTextColor').value;
  const fontFamily = document.getElementById('fontFamily').value;

  const file = fileInput.files[0];
  if (!file) {
    resultContainer.innerHTML = '<p>Por favor selecciona un archivo .sql.</p>';
    return;
  }

  displaySQLPreview(file); // Mostrar vista previa del script SQL

  const formData = new FormData();
  formData.append('file', file);
  formData.append('table_bgcolor', tableBgColor);
  formData.append('header_bgcolor', headerBgColor);
  formData.append('header_text_color', headerTextColor);
  formData.append('relationship_color', relationshipColor);
  formData.append('cell_text_color', cellTextColor);
  formData.append('font_family', fontFamily);

  fetch('/convert/erb/image', {
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

      resultContainer.innerHTML = '';

      resultContainer.appendChild(downloadButton);
      resultContainer.appendChild(imageElement);
       // Mostrar el modal
      const modal = document.getElementById('imageModal');
      modal.classList.remove('hidden');

      // Configurar el botón de cerrar modal
      const closeModalButton = document.getElementById('closeModalButton');
      closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    })
    .catch(error => {
      resultContainer.innerHTML = `<p>${error.message}</p>`;
    });

  // Cambiar colores de los cards después de la conversión
  changeCardColor('tableCard', tableBgColor);
  changeCardColor('headerCard', headerBgColor);
  changeCardColor('headerTextCard', headerTextColor);
  changeCardColor('relationshipCard', relationshipColor);
  changeCardColor('cellTextCard', cellTextColor);
}

// Agregar eventos a los inputs de color para cambiar los cards dinámicamente
document.getElementById('tableBgColor').addEventListener('input', (event) => changeCardColor('tableCard', event.target.value));
document.getElementById('headerBgColor').addEventListener('input', (event) => changeCardColor('headerCard', event.target.value));
document.getElementById('headerTextColor').addEventListener('input', (event) => changeCardColor('headerTextCard', event.target.value));
document.getElementById('relationshipColor').addEventListener('input', (event) => changeCardColor('relationshipCard', event.target.value));
document.getElementById('cellTextColor').addEventListener('input', (event) => changeCardColor('cellTextCard', event.target.value));

// Agregar evento al input de archivo para mostrar la vista previa del script SQL
document.getElementById('fileInput').addEventListener('change', function () {
  const file = this.files[0];
  displaySQLPreview(file);
});

// Función para mostrar el visor y ocultar el selector de archivos
function showViewer() {
  document.getElementById('filePicker').classList.add('hidden');
  document.getElementById('viewerContainer').classList.remove('hidden');
}

// Función para mostrar el selector de archivos y ocultar el visor
function showPicker() {
  document.getElementById('filePicker').classList.remove('hidden');
  document.getElementById('viewerContainer').classList.add('hidden');
}

// Event listeners para los botones
document.getElementById('editButton').addEventListener('click', function () {
  //();
});

document.getElementById('deleteButton').addEventListener('click', function () {
  showPicker();
  // Aquí puedes añadir lógica adicional para limpiar el visor si es necesario
});

// Función para manejar la carga del archivo y mostrar su contenido en el visor
document.getElementById('fileInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      document.getElementById('sqlPreview').value = content;
      showViewer(); // Mostrar el visor después de cargar el archivo
    };
    reader.readAsText(file);
  }
});