import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/models/usuario'; 
import { UsuariosModule } from './usuarios.module';

@Injectable()
export class UsuariosService {
    private usuarios: Usuario[] = [];

    constructor() {
        this.usuarios.push(
            new Usuario(
                1,
                'mauricio',
                'ganaroservir@gmail.com',
                'sabelo123',
                'calle 123',
            ),
        );
    }

    crearUsuario(usuario: Usuario): Usuario {
        for (let i = 0; i < this.usuarios.length; i++) {
            if (this.usuarios[i].correoElectronico == usuario.correoElectronico) {
                return null;
            }
        }
        usuario.id = this.usuarios.length + 1;
        this.usuarios.push(usuario);
        return usuario;
    }

    obtenerUsuario(id: number): Usuario {
        for (let i = 0; i < this.usuarios.length; i++) {
            if (this.usuarios[i].id == id) {
                return this.usuarios[i];
            }
        }
        return null;
    }

    obtenerTodosLosUsuarios(): Usuario[] {
        return this.usuarios;
    }

    eliminarUsuario(id: number): boolean {
        for (let i = 0; i < this.usuarios.length; i++) {
            if (this.usuarios[i].id == id) {
                this.usuarios.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}
