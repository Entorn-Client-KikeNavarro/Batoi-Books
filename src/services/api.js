const SERVER = import.meta.env.VITE_URL_API;

async function getDBUsers() {
  const response = await fetch(SERVER + "/users");
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const users = await response.json();
  return users;
}

async function addDBUser(user) {
  const response = await fetch(SERVER + "/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const newUser = await response.json();
  return newUser;
}

async function getDBUser(id) {
  const response = await fetch(SERVER + `users/${id}`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw `Error. Usuario no encontrado.`;
  }
  const user = await response.json();
  return user;
}

async function removeDBUser(user) {
  const response = await fetch(SERVER + `/users`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error("Error al añadir el usuario");
  return response.json();
}

async function changeDBUser(user){
    const response = await fetch(SERVER + `/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Error al modificar el usuario');
    return response.json();
}

async function changeDBUserPassword(id, newPassword) {
  const response = await fetch(SERVER + `/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: newPassword }),
  });
  if (!response.ok) throw new Error("Error al cambiar la contraseña");
  return response.json();
}

async function getDBModules() {
  const response = await fetch(SERVER + `/modules`);
  if (!response.ok) throw new Error("Error al obtener los módulos");
  return response.json();
}

async function getDBBooks() {
  const response = await fetch(SERVER + `/books`);
  if (!response.ok) throw new Error("Error al obtener los libros");
  return response.json();
}

async function getDBBook(id) {
    const response = await fetch(SERVER + `/books/${id}`);
    if (!response.ok) throw new Error('Libro no encontrado');
    return response.json();
}

async function addDBBook(book){
    const response = await fetch(SERVER + `/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error('Error al añadir el libro');
    return response.json();
}

async function removeDBBook(id) {
    const response = await fetch(SERVER + `/books/${id}`,{
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar el libro');
};

async function changeDBBook(book) {
    const response = await fetch(SERVER + `/books/${book.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!response.ok) throw new Error('Error al modificar el libro');
  return response.json();
}

export{
    getDBUsers,
    getDBModules,
    getDBBooks,
    getDBBook,
    getDBUser,
    addDBUser,
    addDBBook,
    removeDBBook,
    removeDBUser,
    changeDBBook,
    changeDBUser,
    changeDBUserPassword
}