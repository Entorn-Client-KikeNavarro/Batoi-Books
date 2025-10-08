export default class Book {
  constructor(book) {
    (this.id = book.id),
      (this.userId = book.userId),
      (this.moduleCode = book.moduleCode),
      (this.publisher = book.publisher),
      (this.price = book.price),
      (this.pages = book.pages),
      (this.status = book.status),
      (this.photo = book.photo || ""),
      (this.comments = book.comments || ""),
      (this.soldDate = book.soldDate || "");
  }

  toString() {
    return `Id: ${this.id} UserId: ${this.userId} ModuleCode: ${this.moduleCode} Publisher: ${this.publisher} Price: ${this.price}
        Pages: ${this.pages} Status: ${this.status} Photo: ${this.photo} Comments: ${this.comments} SoldDate: ${this.soldDate}`;
  }
}
