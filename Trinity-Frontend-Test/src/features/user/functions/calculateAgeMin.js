export const calculateAgeMin = () => {
    // Obtener la fecha actual
    const currentDate = new Date();

    // Calcular la fecha mínima para una persona de 18 años
    currentDate.setFullYear(currentDate.getFullYear() - 18);

    // Formatear la fecha en formato YYYY-MM-DD (como requiere el campo 'date')
    const minDate = currentDate.toISOString().split('T')[0];

    return minDate
}