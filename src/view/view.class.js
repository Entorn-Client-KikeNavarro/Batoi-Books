import Modules from "../model/modules.class.js";

export default class View {

    
    constructor() {
        this.messages = document.getElementById("messages");
        this.lista = document.getElementById("list");
        //this.removeBookButton = document.getElementById("removeBookButton");
        //this.bookIdRemove = document.getElementById("id-remove");
    }

    renderModulos(modulos){
        modulos.forEach(modulo => {
            const newOption = document.createElement('option')
            newOption.innerHTML = modulo.vliteral;
            document.getElementById('book-moduleCode').append(newOption);
        });
    }

    renderBook(book){
        const newDiv = document.createElement('div');
        newDiv.className = "card"
        newDiv.id = book.id;
        newDiv.innerHTML = "<h3>" + "libro: " + book.id + "</h3>" + "<br>" + "<h3>" + book.moduleCode + "</h3>" +
        "<p>" +  book.publisher + "</p>" + "<br>" + "<p>" + book.pages + " paginas" + "</p>" + "<br>" + 
        "<p>Estado: " + book.status + "</p>" + "<br>" + "<p>vendido en: " + book.soldDate + "</p>" + "<br>" + 
        "<p>" + book.comments + "</p>" + "<br>" + "<p>" + book.price + "€</p>";
        this.lista.append(newDiv);
    }

    removeBook(id){
        document.getElementById(id).remove();
    }

    renderMessage(type, message){
        const newMessage = document.createElement("div");
        newMessage.innerHTML =  `${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>`
        this.messages.append(newMessage);
    }
}