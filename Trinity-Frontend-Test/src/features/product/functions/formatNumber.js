export const formatNumber = (number) => {
    // Dividimos el número en dos partes: enteros y decimales
    const [integer, decimal] = number.toString().split('.');
  
    // Formateamos la parte entera agregando los puntos cada tres dígitos
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    // Si tiene parte decimal, la unimos con la parte entera
    return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
  }