import { Body, Controller, Get, Query, Param, Post, Res, Delete } from '@nestjs/common';
import { Response } from 'express';
import { LibrosService } from './libros.service';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Post()
  crearLibro(
    @Body() libro: Libro,
    @Res() response: Response
  ) {
    const libroCreado = this.librosService.crearLibro(libro);

    if (libroCreado) {
      response.status(201).send(libroCreado);
    } else {
      response.status(400).send({ error: 'Error al crear el libro' });
    }
  }

  @Get(':isbn')
  obtenerLibroPorIsbn(
    @Param('isbn') isbn: string, 
    @Res() response: Response
  ) {
    const libro = this.librosService.obtenerLibroPorIsbn(isbn);
    if (libro) {
      response.status(200).send(libro);
    } else {
      response.status(404).send({ error: 'Libro no existe' });
    }
  }

  @Get()
  obtenerTodosLosLibros(
    @Query('autor') autor: string,
    @Query('genero') genero: string,
    @Res() response: Response
  ) {
    const libros = this.librosService.obtenerTodosLosLibros(autor, genero);
    response.status(200).send(libros);
  }

  @Delete(':isbn')
  eliminarLibro(
    @Param('isbn') isbn: string, 
    @Res() response: Response
  ) {
    const resultado = this.librosService.eliminarLibro(isbn);
    if (resultado) {
      response.status(204).send(); 
    } else {
      response.status(404).send({ error: 'Libro no encontrado' }); 
    }
  }
}
