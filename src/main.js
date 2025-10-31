import './style.css'
import Books from "./model/books.class.js";
import Modules from "./model/modules.class.js";
import Users from "./model/users.class.js";
import Controller from './controller/controller.class.js';



import { getDBUsers, getDBBooks, getDBModules, getDBUser, addDBUser, addDBBook , removeDBBook, changeDBBook, changeDBUserPassword } from './services/api'



document.querySelector('#app').innerHTML = `
<div>
    
    <img src="public/logoBatoi.png" class="logo" alt="Batoi logo" />
    <header>BatoiBooks</header>
    <nav>
        <ul>
            <li><a href="#list">Ver Libros</a></li>
            <li><a href="#form">Añadir Libro</a></li>
            <li><a href="#about">Acerca de...</a></li>
        </ul>
    </nav>
</div>
<div id="messages"></div>
    <div>
        <div id="list"></div>
        <div id="remove">
        <label for="remove-id">ID a Borrar: </label>
        <input type="number" name="id-to-remove" id="remove-id">
        <button type="button" id="btn-remove">borrar libro</button>
    </div>

    <div id="form">
        <div>
            <label for="book-userId">userId: </label>
            <input type="number" name="userId" id="book-userId" required>
        </div>

        <div>
            <label for="book-moduleCode">moduleCode: </label>
            <select name="moduleCode" id="book-moduleCode" required>
                <option value="" id="select">tria el modul:</option>
            </select>
        </div>

        <div>
            <p>publisher: </p>
            <input type="radio" id="Apunts-radio" name="publisher" value="apunts" required>
            <label for="Apunts-radio">Apunts</label>

            <input type="radio" id="McGraw-Hill-radio" name="publisher" value="McGraw-Hill">
            <label for="McGraw-Hill-radio">McGraw-Hill</label>
        </div>

        <div>
            <label for="book-price">Precio: </label>
            <input type="number" name="price" id="book-price" required>
        </div>

        <div>
            <label for="book-pages">Paginas: </label>
            <input type="number" name="pages" id="book-pages" required>
        </div>
        
        <div>
            <p>Status: </p>
            <input type="radio" id="status-good" name="status" value="good" required>
            <label for="status-good">good</label>

            <input type="radio" id="status-bad" name="status" value="bad">
            <label for="status-bad">bad</label>
        </div>

        <div>
            <label for="book-comments">comentarios: </label>
            <textarea name="comments" id="book-comments" required></textarea> 
        </div>

        <div>
            <label for="book-soldDate">Fecha de venta: </label>
            <input type="date" name="soldDate" id="book-soldDate" required>
        </div>

        <div>
            <button type="submit" id="btn-submit">Guardar Libro</button>
        </div>

    </div>
    <br>
    <div id="about">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem sapiente illum corrupti repellendus! Ad natus quod ullam quibusdam, cum perspiciatis iste ex est inventore doloribus. Tempore sit harum beatae assumenda.</p>
    </div>
</div>
`
document.addEventListener('DOMContentLoaded', () => {
    const myController = new Controller();
    myController.init()
})