export default class View {
  constructor() {
    // Propiedades de la vista
    this.booksList = document.getElementById('list');
    this.about = document.getElementById('about');
    this.form = document.getElementById('form');
    this.remove = document.getElementById('remove');
    
    this.removeBtn = document.getElementById('removeBtn');
    this.bookForm = document.getElementById('bookForm');
    this.messages = document.getElementById('messages');
    
    this.moduleSelect = document.getElementById('moduleCode');
    
    // Manejador para la navegación simple (mostrar/ocultar vistas)
    this.views = document.querySelectorAll('.view');
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
    this.handleHashChange(); // Llama al inicio para mostrar la vista correcta
  }

  // Muestra la vista activa y oculta las demás
  handleHashChange() {
    const hash = window.location.hash || '#list';
    this.views.forEach(view => {
      view.style.display = 'none';
    });
    const activeView = document.querySelector(hash);
    if (activeView) {
      // Usamos 'block' o 'grid' según corresponda
      activeView.style.display = (hash === '#list') ? 'grid' : 'block';
    }
  }

  // Rellena el <select> de módulos
  fillModuleSelect(modules) {
    this.moduleSelect.innerHTML = '<option value="">Selecciona un módulo</option>'; // Opción por defecto
    modules.forEach(module => {
      const option = document.createElement('option');
      option.value = module.code;
      option.textContent = module.cliteral;
      this.moduleSelect.appendChild(option);
    });
  }

  // Pinta un libro (card) en la lista
  renderBook(book, module) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${book.photo || 'public/logoBatoi.png'}" alt="Libro: ${book.id}">
      <div>
        <h3>${module.cliteral} (${book.id})</h3>
        <h4>${book.publisher}</h4>
        <p>${book.pages} páginas</p>
        <p>Estado: ${book.status}</p>
        <p>${book.soldDate ? `Vendido el ${new Date(book.soldDate).toLocaleDateString()}` : 'En venta'}</p>
        <p>${book.comments || 'Sin comentarios'}</p>
        <h4>${book.price.toFixed(2)} €</h4>
      </div>
    `;
    this.booksList.appendChild(card);
  }
  
  // Limpia la lista de libros (para repintar)
  clearBooksList() {
      this.booksList.innerHTML = '';
  }

  // Muestra un mensaje al usuario
  showMessage(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `_${type}_ alert alert-${type === 'error' ? 'danger' : 'info'} alert-dismissible`;
    messageDiv.setAttribute('role', 'alert');
    messageDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
    `;
    this.messages.appendChild(messageDiv);

    // Auto-cierre si NO es un error
    if (type !== 'error') {
      setTimeout(() => {
        messageDiv.remove();
      }, 3000);
    }
  }

  // Escuchador para el formulario de AÑADIR libro
  setBookSubmitHandler(callback) {
    this.bookForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Evita que la página se recargue
      
      // Recoge los datos del formulario
      const formData = new FormData(this.bookForm);
      const payload = Object.fromEntries(formData.entries());
      
      // Convierte los números
      payload.price = parseFloat(payload.price);
      payload.pages = parseInt(payload.pages);
      
      callback(payload); // Llama al controlador
      this.bookForm.reset();
      window.location.hash = '#list'; // Vuelve a la lista
    });
  }

  // Escuchador para el botón de BORRAR libro
  setBookRemoveHandler(callback) {
    this.removeBtn.addEventListener('click', () => {
      const idToRemove = document.getElementById('bookIdInput').value;
      if (idToRemove) {
          callback(idToRemove); // Llama al controlador
          document.getElementById('bookIdInput').value = '';
          window.location.hash = '#list'; // Vuelve a la lista
      } else {
          this.showMessage('error', 'Debes introducir una ID para borrar');
      }
    });
  }
}