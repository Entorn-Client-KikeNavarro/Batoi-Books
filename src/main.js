import './style.css'
import Controller from './controller.js';

// 1. Renderizar la estructura base de la aplicación en el div #app
document.querySelector('#app').innerHTML = `
  <header>
    <img src="/logoBatoi.png" class="logo" alt="Batoi logo" />
    <h1>BatoiBooks</h1>
  </header>

  <nav>
    <ul>
      <li><a href="#list">Ver Libros</a></li>
      <li><a href="#remove">Borrar Libro</a></li>
      <li><a href="#form">Añadir Libro</a></li>
      <li><a href="#about">Acerca de...</a></li>
    </ul>
  </nav>

  <div id="messages"></div>

  <main>
    <div id="list" class="view">
        </div>
    <div id="remove" class="view" style="display:none;">
        <label for="bookIdInput">ID del libro a borrar:</label>
        <input type="text" id="bookIdInput" name="bookId" required>
        <button id="removeBtn">Borrar</button>
    </div>
    <div id="form" class="view" style="display:none;">
      <form id="bookForm">
        <div>
          <label for="moduleCode">Módulo:</label>
          <select id="moduleCode" name="moduleCode" required></select>
        </div>
        <div>
          <label for="publisher">Editorial:</label>
          <input type="text" id="publisher" name="publisher" required>
        </div>
        <div>
          <label for="price">Precio (€):</label>
          <input type="number" id="price" name="price" required min="0" step="0.01">
        </div>
        <div>
          <label for="pages">Páginas:</label>
          <input type="number" id="pages" name="pages" required min="1">
        </div>
        <div class="radio-group">
          <span>Estado:</span>
          <input type="radio" id="status_new" name="status" value="new" checked>
          <label for="status_new">Nuevo</label>
          <input type="radio" id="status_good" name="status" value="good">
          <label for="status_good">Bueno</label>
          <input type="radio" id="status_bad" name="status" value="bad">
          <label for="status_bad">Malo</label>
        </div>
        <div>
          <label for="comments">Comentarios:</label>
          <textarea id="comments" name="comments" rows="3"></textarea>
        </div>
        <div class="form-buttons">
          <button type="submit">Guardar</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
    <div id="about" class="view" style="display:none;">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  </main>

  <footer>
    <p>Kike Navarro</p>
  </footer>
`;

document.addEventListener('DOMContentLoaded', () => {
  const myController = new Controller();
  myController.init();
});