import { Body, Controller, Get, Query, Param, Post, Res, Put } from '@nestjs/common';
import { Response } from 'express';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  crearPedido(
    @Body() pedido: Pedido,
    @Res() response: Response
  ) {
    const pedidoCreado = this.pedidosService.crearPedido(pedido);

    if (pedidoCreado) {
      response.status(201).send(pedidoCreado);
    } else {
      response.status(400).send({ error: 'Error al crear pedido' });
    }
  }

  @Get(':id')
  obtenerPedidoPorId(
    @Param('id') id: number,
    @Res() response: Response
  ) {
    const pedido = this.pedidosService.obtenerPedidoPorId(id);

    if (pedido) {
      response.status(200).send(pedido);
    } else {
      response.status(404).send({ error: 'El pedido no existe' });
    }
  }

  @Get()
  obtenerTodosLosPedidos(
    @Query('estado') estado: "pendiente" | "en proceso" | "enviado" | "entregado", 
    @Query('usuario') usuario: Usuario,
    @Res() response: Response
  ): void {
    const pedidos = this.pedidosService.obtenerTodosLosPedidos(estado, usuario);
    response.status(200).send(pedidos);
  }

  @Put(':id/estado')
  modificarEstadoPedido(
    @Param('id') id: number,
    @Body('estado') nuevoEstado: "pendiente" | "en proceso" | "enviado" | "entregado",
    @Res() response: Response
  ) {
    const resultado = this.pedidosService.modificarEstadoPedido(id, nuevoEstado);
    if (resultado) {
      response.status(200).send({ mensaje: 'Estado del pedido actualizado' });
    } else {
      response.status(404).send({ error: 'Pedido no encontrado' });
    }
  }
}
