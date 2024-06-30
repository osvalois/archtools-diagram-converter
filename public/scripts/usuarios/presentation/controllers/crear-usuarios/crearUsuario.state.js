const state = {
    nombreUsuario: '',
    recoveryKey: '',
    isSubmitting: false,
    errors: {
      nombreUsuario: '',
    },
  };
  
  const setState = new Proxy(state, {
    set(target, key, value) {
      target[key] = value;
      validateForm();
      setTimeout(() => render(), 0);
      return true;
    },
  });
  
  const validateForm = () => {
    state.errors.nombreUsuario = '';
    if (!state.nombreUsuario) {
      state.errors.nombreUsuario = 'El nombre de usuario no puede estar vacío.';
    } else if (/[^a-zA-Z0-9]/.test(state.nombreUsuario)) {
      state.errors.nombreUsuario = 'El nombre de usuario no debe contener caracteres especiales.';
    }
  };
  
  const getState = () => state;
  
  export { setState, getState, validateForm };
  