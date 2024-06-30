function FormButtonComponent({
  text = 'Submit',
  isSubmitting = false,
  onClick = () => { },
  className = '',
  type = 'button',
  ariaLabel = 'Form Button'
}) {
  const render = () => {
    const buttonText = isSubmitting ? 'Espere...' : text;
    const disabledAttr = isSubmitting ? 'disabled' : '';
    return `
      <button
        class="mb-3 bg-gradient-to-r from-purple-500 to-indigo-500 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong ${className}"
        type="${type}"
        aria-label="${ariaLabel}"
        data-twe-ripple-init
        data-twe-ripple-color="light"
        ${disabledAttr}
        onclick="(${onClick.toString()})(event)"
      >
        ${buttonText}
      </button>`;
  };

  return render();
}

export default FormButtonComponent;
