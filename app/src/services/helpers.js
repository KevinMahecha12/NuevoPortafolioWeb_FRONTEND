export const levelToText = (level) => {
  const map = {
    1: 'Principiante',
    2: 'Básico',
    3: 'Intermedio',
    4: 'Avanzado',
    5: 'Experto'
  };
  return map[level] || 'Desconocido';
};