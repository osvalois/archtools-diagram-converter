import UsuariosController from '../../controllers/usuarios.controller.js';

function CrearUsuarioForm() {
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Espere...';

    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const recoveryKey = document.getElementById('recoveryKey').value;

    try {
      const usuario = await UsuariosController.crearUsuario({ nombreUsuario, recoveryKey });
      console.log('Usuario creado:', usuario);
      alert('Usuario creado correctamente');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('Error al crear usuario');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Crear Usuario';
    }
  };

  const form = document.createElement('form');
  form.id = 'crearUsuarioForm';
  form.addEventListener('submit', handleFormSubmit);

  const labelNombreUsuario = document.createElement('label');
  labelNombreUsuario.textContent = 'Nombre de Usuario:';
  const inputNombreUsuario = document.createElement('input');
  inputNombreUsuario.type = 'text';
  inputNombreUsuario.id = 'nombreUsuario';
  labelNombreUsuario.appendChild(inputNombreUsuario);

  const labelRecoveryKey = document.createElement('label');
  labelRecoveryKey.textContent = 'Recovery Key:';
  const inputRecoveryKey = document.createElement('input');
  inputRecoveryKey.type = 'text';
  inputRecoveryKey.id = 'recoveryKey';
  labelRecoveryKey.appendChild(inputRecoveryKey);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Crear Usuario';

  form.append(
    labelNombreUsuario, document.createElement('br'),

    labelRecoveryKey, document.createElement('br'),
    submitButton
  );

  return form;
}

export default CrearUsuarioForm;
