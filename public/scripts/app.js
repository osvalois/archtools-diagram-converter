document.addEventListener('DOMContentLoaded', () => {
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