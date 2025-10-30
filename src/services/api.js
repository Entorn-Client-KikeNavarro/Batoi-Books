// Este fichero solo contendrá las funciones que SÍ llaman a la API en la rama 5-dom
const API_URL = 'http://localhost:3000';

/**
 * Obtiene un libro específico desde la API
 * @param {string|number} id El ID del libro
 * @returns {Promise<object>} El objeto del libro
 */
export const getDBBook = async (id) => {
  const response = await fetch(`${API_URL}/books/${id}`);
  if (!response.ok) {
    throw new Error('Libro no encontrado en la API');
  }
  return response.json();
};