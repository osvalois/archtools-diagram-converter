document.addEventListener('DOMContentLoaded', () => {
    const sqlEditor = CodeMirror.fromTextArea(document.getElementById('sql-editor'), {
        mode: 'text/x-sql', // Modo SQL
        theme: 'dracula', // Tema Dracula
        lineNumbers: true, // Mostrar números de línea
        indentUnit: 4, // Tamaño de la indentación
        autofocus: true // Enfocar automáticamente el editor
    });

    const fileInput = document.getElementById('uploadFile1');
    const fileNameElement = document.getElementById('fileName');

    if (fileInput && fileNameElement) {
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = async function (e) {
                    const content = e.target.result;
                    sqlEditor.getDoc().setValue(content); // Establecer el contenido del editor
                    
                    // Verificar el tipo de SQL usando sql.js
                    const isValidSQL = await isSQLValid(content);
                    if (isValidSQL) {
                        console.log('El archivo SQL es válido.');
                    } else {
                        console.log('El archivo no es un script SQL válido.');
                    }
                };
                reader.readAsText(file);

                // Mostrar el nombre del archivo seleccionado
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

// Función para verificar si el contenido es un script SQL válido usando sql.js
async function isSQLValid(sqlContent) {
    const SQL = await initSqlJs({ locateFile: file => '../scripts/plugins/sql-wasm.js' }); // Ajusta la ruta al archivo sql-wasm.js según tu estructura
    try {
        const db = new SQL.Database();
        db.run(sqlContent); // Intenta ejecutar el script SQL
        return true; // Si se ejecuta sin errores, es válido
    } catch (error) {
        return false; // Si hay errores al ejecutar, no es válido
    }
}
