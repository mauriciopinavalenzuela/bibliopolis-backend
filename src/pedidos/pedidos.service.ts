import { Injectable } from '@nestjs/common';

@Injectable()
export class PedidosService {
    private pedidos: Pedido[] = [];
    private usuarios: Usuario[] = [];
    private libros: Libro[] = [];

    crearPedido(pedido: Pedido): Pedido | null {
        const fechaActual = new Date();
        let totalPedido = 0;
        let stockValido = true;

        for (let i = 0; i < pedido.items.length; i++) {
            const item = pedido.items[i];
            let libroEncontrado = false;

            for (let j = 0; j < this.libros.length; j++) {
                const libro = this.libros[j];

                if (libro.isbn === item.libro.isbn) {
                    libroEncontrado = true;

                    if (libro.stock < item.cantidad) {
                        stockValido = false;
                        break;
                    }

                    totalPedido += libro.precio * item.cantidad;
                    break;
                }
            }

            if (!libroEncontrado) {
                return null; 
            }
        }

        if (!stockValido) {
            return null; 
        }

        pedido.fechaPedido = fechaActual;
        pedido.total = totalPedido;

        this.pedidos.push(pedido);
        return pedido;
    }

    obtenerPedidoPorId(id: number): Pedido | null {
        for (let i = 0; i < this.pedidos.length; i++) {
            if (this.pedidos[i].id === id) {
                return this.pedidos[i];
            }
        }
        return null; 
    }

    obtenerTodosLosPedidos(
        estado?: "pendiente" | "en proceso" | "enviado" | "entregado",
        usuario?: Usuario
    ): Pedido[] {
        let resultados: Pedido[] = [];

        for (let i = 0; i < this.pedidos.length; i++) {
            const pedido = this.pedidos[i];

            if (estado && pedido.estado !== estado) {
                continue;
            }

            if (usuario && pedido.usuario.id !== usuario.id) {
                continue;
            }

            resultados.push(pedido);
        }

        return resultados;
    }

    modificarEstadoPedido(
        id: number,
        nuevoEstado: "pendiente" | "en proceso" | "enviado" | "entregado"
    ): boolean {
        for (let i = 0; i < this.pedidos.length; i++) {
            if (this.pedidos[i].id === id) {
                const estadoActual = this.pedidos[i].estado;

                if (
                    (estadoActual === "pendiente" && nuevoEstado === "en proceso") ||
                    (estadoActual === "en proceso" && nuevoEstado === "enviado") ||
                    (estadoActual === "enviado" && nuevoEstado === "entregado") ||
                    (estadoActual === "entregado" && nuevoEstado === estadoActual)
                ) {
                    this.pedidos[i].estado = nuevoEstado;
                    return true;
                } else {
                    return false; 
                }
            }
        }
        return false;
    }
}
