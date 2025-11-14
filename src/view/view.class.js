import Modules from "../model/modules.class.js";

export default class View {
    
    constructor() {
        this.messages = document.getElementById("messages");
        this.lista = document.getElementById("list");
        this.form = document.getElementById("form");
        this.formTitle = document.getElementById("form-title");
        this.bookIdDiv = document.getElementById("book-id-div");
        this.bookIdInput = document.getElementById("book-id");
        this.bookModuleCode = document.getElementById("book-moduleCode");
        this.bookPrice = document.getElementById("book-price");
        this.bookPages = document.getElementById("book-pages");
        this.bookComments = document.getElementById("book-comments");
        this.bookSoldDate = document.getElementById("book-soldDate");
    }

    renderModulos(modulos){
        modulos.forEach(modulo => {
            const newOption = document.createElement('option')
            newOption.value = modulo.code;
            newOption.innerHTML = modulo.vliteral;
            document.getElementById('book-moduleCode').append(newOption);
        });
    }

    _getFormData() {
        const id = this.bookIdInput.value;
        const userId = 2;
        const moduleCode = this.bookModuleCode.value;
        const publisher = this.form.elements.publisher.value;
        const price = parseFloat(this.bookPrice.value);
        const pages = parseInt(this.bookPages.value);
        const status = this.form.elements.status.value;
        const comments = this.bookComments.value;
        const soldDate = this.bookSoldDate.value;

        return { id, userId, moduleCode, publisher, price, pages, status, comments, soldDate };
    }

    resetForm() {
        this.form.reset();
        this.formTitle.textContent = 'Añadir libro';
        this.bookIdDiv.style.display = 'none';
        this.bookIdInput.value = '';
    }

    populateForm(book) {
        this.formTitle.textContent = 'Editar libro';
        this.bookIdDiv.style.display = 'block';
        this.bookIdInput.value = book.id;
        this.bookModuleCode.value = book.moduleCode;
        this.bookPrice.value = book.price;
        this.bookPages.value = book.pages;
        this.bookComments.value = book.comments;
        this.bookSoldDate.value = book.soldDate;
        this.form.elements.publisher.value = book.publisher;
        this.form.elements.status.value = book.status;

        this.form.scrollIntoView();
    }

    _createBookCard(book) {
        return `
            <h3>libro: ${book.id}</h3><br>
            <h3>${book.moduleCode}</h3>
            <p>${book.publisher}</p><br>
            <p>${book.pages} paginas</p><br>
            <p>Estado: ${book.status}</p><br>
            <p>vendido el: ${book.soldDate || 'No vendido'}</p><br>
            <p>${book.comments}</p><br>
            <p>${book.price}€</p>
            <div>
                <button class="btn-add-cart" data-id="${book.id}">
                    <span class="material-icons">add_shopping_cart</span>
                </button>
                <button class="btn-edit" data-id="${book.id}">
                    <span class="material-icons">edit</span>
                </button>
                <button class="btn-delete" data-id="${book.id}">
                    <span class="material-icons">delete</span>
                </button>
            </div>
        `;
    }

    renderBook(book){
        const newDiv = document.createElement('div');
        newDiv.className = "card";
        newDiv.id = book.id;
        newDiv.innerHTML = this._createBookCard(book);
        this.lista.append(newDiv);
    }

    updateBookInList(book) {
        const bookCard = document.getElementById(book.id);
        if (bookCard) {
            bookCard.innerHTML = this._createBookCard(book);
        }
    }

    removeBook(id){
        const bookCard = document.getElementById(id);
        if (bookCard) {
            bookCard.remove();
        }
    }

    renderMessage(type, message){
        const alertType = type === 'error' ? 'alert-danger' : 'alert-success';
        const newMessage = document.createElement("div");
        newMessage.className = `alert ${alertType}`;
        newMessage.innerHTML =  `${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>`;
        this.messages.append(newMessage);

        setTimeout(() => {
            newMessage.remove();
        }, 3000);
    }

    bindSubmitForm(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();

            if (!this.form.checkValidity()) {
                this.form.reportValidity();
            } else {
                const formData = this._getFormData();
                handler(formData);
            }
        });
    }

    bindResetForm() {
        this.form.addEventListener('reset', () => {
            this.resetForm();
        });
    }

    bindBookActions(addCartHandler, editHandler, deleteHandler) {
        this.lista.addEventListener('click', event => {
            const button = event.target.closest('button');
            if (!button) return;

            const id = button.dataset.id;

            if (button.classList.contains('btn-add-cart')) {
                addCartHandler(id);
            } else if (button.classList.contains('btn-edit')) {
                editHandler(id);
            } else if (button.classList.contains('btn-delete')) {
                deleteHandler(id);
            }
        });
    }
}