export default class View {
  constructor() {
    this.booksList = document.getElementById('list');
    this.about = document.getElementById('about');
    this.form = document.getElementById('form');
    this.remove = document.getElementById('remove');
    this.removeBtn = document.getElementById('removeBtn');
    this.bookForm = document.getElementById('bookForm');
    this.messages = document.getElementById('messages');
    this.moduleSelect = document.getElementById('moduleCode');

    // Manejo de la navegación
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
    this.handleHashChange(); // Llama al inicio para mostrar la vista correcta
  }

  handleHashChange() {
    const hash = window.location.hash || '#list';
    document.querySelectorAll('.view').forEach(view => {
      view.style.display = 'none';
    });
    const activeView = document.querySelector(hash);
    if (activeView) {
      activeView.style.display = 'block';
    }
  }

  fillModuleSelect(modules) {
    modules.forEach(module => {
      const option = document.createElement('option');
      option.value = module.code;
      option.textContent = module.cliteral;
      this.moduleSelect.appendChild(option);
    });
  }

  renderBook(book, module) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${book.photo || 'https://via.placeholder.com/150'}" alt="Libro: ${book.id}">
      <div>
        <h3>${module.cliteral} (${book.id})</h3>
        <h4>${book.publisher}</h4>
        <p>${book.pages} páginas</p>
        <p>Estado: ${book.status}</p>
        <p>${book.soldDate ? `Vendido el ${new Date(book.soldDate).toLocaleDateString()}` : 'En venta'}</p>
        <p>${book.comments || ''}</p>
        <h4>${book.price} €</h4>
      </div>
    `;
    this.booksList.appendChild(card);
  }

  clearBooksList() {
      this.booksList.innerHTML = '';
  }

  showMessage(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `_${type}_ alert alert-${type === 'error' ? 'danger' : 'info'} alert-dismissible`;
    messageDiv.setAttribute('role', 'alert');
    messageDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
    `;
    this.messages.appendChild(messageDiv);

    if (type !== 'error') {
      setTimeout(() => {
        messageDiv.remove();
      }, 3000);
    }
  }

  setBookSubmitHandler(callback) {
    this.bookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(this.bookForm);
      const payload = Object.fromEntries(formData.entries());
      callback(payload);
      this.bookForm.reset();
    });
  }

  setBookRemoveHandler(callback) {
    this.removeBtn.addEventListener('click', () => {
      const idToRemove = document.getElementById('bookId').value;
      if (idToRemove) {
          callback(idToRemove);
          document.getElementById('bookId').value = '';
      } else {
          this.showMessage('error', 'Por favor, introduce una ID de libro a borrar');
      }
    });
  }
}