function CardInformacionRegistro({ title, description }) {
    const render = () => {
        return `
            <div class="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                <div class="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 class="mb-6 text-xl font-semibold">
                        ${title}
                    </h4>
                    <p class="text-sm">
                        ${description}
                    </p>
                </div>
            </div>
        `;
    };

    return render();
}

export default CardInformacionRegistro;
