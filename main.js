import './src/style.css'
import data from './src/services/datos.js'
import {
  getBookById,
  getBookIndexById,
  bookExists,
  booksFromUser,
  booksFromModule,
  booksCheeperThan,
  booksWithStatus,
  averagePriceOfBooks,
  booksOfTypeNote,
  booksNotSold,
  incrementPriceOfbooks,
  getUserById,
  getUserIndexById,
  getUserByNickName,
  getModuleByCode 
} from './src/functions.js'



document.querySelector('#app').innerHTML = `
  <div>
    
    <img src="public/logoBatoi.png" class="logo" alt="Batoi logo" />
    <header>BatoiBooks</header>
    <p>Abre la consola para ver el resultado</p>
  </div>
`
console.log("hola")

try {
  const user = getUserById(data.users, 1);
  console.log("Usuario encontrado:", user);
} catch (error) {
  alert("Error al buscar usuario: " + error.message);
}

try {
  const book = getBookById(data.books, 9999);
  console.log("Libro encontrado:", book);
} catch (error) {
  alert("Error al buscar libro: " + error.message);
}