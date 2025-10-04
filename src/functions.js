const NOTE_TYPE = 'Apunts';

function getBookById(books,bookId) {
    let book = books.find(libro=>libro.id===bookId);
    if(!book) throw new Error("Libro no encontrado");
    return book;
}
function getBookIndexById(books,bookId) {
    let book = books.findIndex(libro=>libro.id===bookId);
    if(book===-1) throw new Error("Libro no encontrado");
    return book;
}
function bookExists(books,userId,moduleCode) {
    let libro = books.find(libro=>libro.userId===userId && libro.moduleCode===moduleCode);
    return !!libro
}
function booksFromUser(books, userId) {
    return books.filter((book) => book.userId === userId);
}
function booksFromModule(books, moduleCode) {
    return books.filter((book) => book.moduleCode === moduleCode);
}
function booksCheeperThan(books, price) {
    return books.filter((book) => book.price <= price);
}
function booksWithStatus(books, status) {
    return books.filter((book) => book.status === status);
}
function averagePriceOfBooks(books) {
    if (books.length == []) {
        return "0.00 €";
    }
    let suma = books.reduce((total, book) => total += book.price, 0) / books.length;
    
    return suma.toFixed(2) + ' €';
}
function booksOfTypeNotes(books) {
    return books.filter((book) => book.publisher === NOTE_TYPE)
}
function booksNotSold(books) {
    return books.filter((book) => !book.soldDate);
}
function incrementPriceOfbooks(books, percentage) {
    return books.map((book) => {
        return {
            ...book,
            price: book.price + book.price * percentage, 
        };
    });
}
function getUserById(users, userId) {
  const user = users.find(u => u.id === userId);
  if (!user) throw new Error("Usuario no encontrado");
  return user;
}
function getUserIndexById(users, userId) {
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) throw new Error("Usuario no encontrado");
  return index;
}
function getUserByNickName(users, nick) {
  const user = users.find(u => u.nick === nick);
  if (!user) throw new Error("Usuario no encontrado");
  return user;
}

function getModuleByCode(modules, moduleCode) {
  const module = modules.find(m => m.code === moduleCode);
  if (!module) throw new Error("Módulo no encontrado");
  return module;
}

export {
  getBookById,
  getBookIndexById,
  bookExists,
  booksFromUser,
  booksFromModule,
  booksCheeperThan,
  booksWithStatus,
  averagePriceOfBooks,
  booksOfTypeNotes,
  booksNotSold,
  incrementPriceOfbooks,
  getUserById,
  getUserIndexById,
  getUserByNickName,
  getModuleByCode 
}