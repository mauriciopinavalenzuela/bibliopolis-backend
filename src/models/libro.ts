class Libro {
    isbn: string;
    titulo: string;
    autor: string;
    editorial: string;
    genero: string;
    precio: number;
    descripcion: string;
    imagen: string;
    stock: number;
  
    constructor(isbn: string, titulo: string, autor: string, precio: number, stock: number, editorial: string, genero: string, descripcion: string, imagen: string) {
      this.isbn = isbn;
      this.titulo = titulo;
      this.autor = autor;
      this.precio = precio;
      this.stock = stock;
      this.editorial = editorial;
      this.genero = genero;
      this.descripcion = descripcion;
      this.imagen = imagen;
    }
  }
  