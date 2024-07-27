import { Body, Controller, Post, Get, Delete, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsuariosService } from './usuarios.service';
import { Usuario } from 'src/models/usuario';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Post()
    registrarUsuario(
        @Body() usuario: Usuario, 
        @Res() response: Response,
    ) {
        const usuarioLocal = this.usuariosService.crearUsuario(usuario);
        if (usuarioLocal) {
            response.status(201).send(usuarioLocal);
        } else {
            response
                .status(400)
                .send({ error: 'Ya existe un usuario con este correo electrónico' });
        }
    }

    @Get(':id')
    obtenerUsuarioPorId(
        @Param('id') id: number, 
        @Res() response: Response
    ) {
        const usuario = this.usuariosService.obtenerUsuario(id);
        if (usuario) {
            response.status(200).send(usuario);
        } else {
            response.status(404).send({ error: 'Usuario no existe' });
        }
    }

    @Get()
    obtenerTodosLosUsuarios(@Res() response: Response) {
        const usuarios = this.usuariosService.obtenerTodosLosUsuarios();
        response.status(200).send(usuarios);
    }

    @Delete(':id')
    eliminarUsuario(
        @Param('id') id: number, 
        @Res() response: Response
    ) {
        const resultado = this.usuariosService.eliminarUsuario(id);
        if (resultado) {
            response.status(204).send(); 
        } else {
            response.status(404).send({ error: 'Usuario no encontrado' });
        }
    }
}

