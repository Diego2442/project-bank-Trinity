export const formatDate = (dateString) => {

    const date = new Date(dateString);

    // Formatear en formato legible
    const formattedDate = date.toLocaleString();  

    return formattedDate
}