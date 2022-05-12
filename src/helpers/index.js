
  export const formatFecha = fecha => {
    const newFecha = new Date(fecha);
    const opc = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return newFecha.toLocaleDateString('es-ES', opc);
  };