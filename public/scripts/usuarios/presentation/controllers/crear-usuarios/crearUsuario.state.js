let state = {
    nombreUsuario: '',
    recoveryKey: '',
    isSubmitting: false,
    errors: {
      nombreUsuario: '',
    },
  };
  
  const setState = (newState) => {
    state = { ...state, ...newState };
    validateForm();
    setTimeout(() => {
      // Llamar a render() si está definido en tu aplicación
      if (typeof render === 'function') {
        render();
      } else {
        console.error('La función render no está definida.');
      }
    }, 0);
  };
  
  const validateForm = () => {
    state.errors.nombreUsuario = '';
    if (!state.nombreUsuario) {
      state.errors.nombreUsuario = 'El nombre de usuario no puede estar vacío.';
    } else if (/[^a-zA-Z0-9]/.test(state.nombreUsuario)) {
      state.errors.nombreUsuario = 'El nombre de usuario no debe contener caracteres especiales.';
    }
  };
  
  const getState = () => ({ ...state });
  
  export { setState, getState, validateForm };
  