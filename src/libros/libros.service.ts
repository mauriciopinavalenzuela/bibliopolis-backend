import { Injectable } from '@nestjs/common';

@Injectable()
export class LibrosService {
  private libros: Libro[] = []; 

  crearLibro(libro: Libro): Libro {
    this.libros.push(libro);
    return libro;
  }

  obtenerLibroPorIsbn(isbn: string): Libro {
    for (let i = 0; i < this.libros.length; i++) {
      if (this.libros[i].isbn === isbn) {
        return this.libros[i]; 
      }
    }
    return null; 
  }

  obtenerTodosLosLibros(autor: string, genero: string): Libro[] {
    let resultados = [];

    for (let i = 0; i < this.libros.length; i++) {
      const libro = this.libros[i];
      if (autor && libro.autor !== autor) {
        continue; 
      }
      if (genero && libro.genero !== genero) {
        continue; 
      }
      resultados.push(libro); 
    }

    return resultados;
  }

  eliminarLibro(isbn: string): boolean {
    for (let i = 0; i < this.libros.length; i++) {
      if (this.libros[i].isbn === isbn) {
        this.libros.splice(i, 1); 
        return true; 
      }
    }
    return false; 
  }
}
