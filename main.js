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
