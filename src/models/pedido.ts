class Pedido {
    id: number;
    usuario: Usuario;
    fechaPedido: Date;
    estado: "pendiente" | "en proceso" | "enviado" | "entregado";
    items: ItemPedido[];
  
    constructor(id: number, usuario: Usuario, fechaPedido: Date, estado: "pendiente" | "en proceso" | "enviado" | "entregado", items: ItemPedido[] = []) {
      this.id = id;
      this.usuario = usuario;
      this.fechaPedido = fechaPedido;
      this.estado = estado;
      this.items = items;
    }
  
    // Método para calcular el total del pedido
    calcularTotal(): number {
        let total = 0;
        for (let i = 0; i < this.items.length; i++) {
          const item = this.items[i];
          total += item.libro.precio * item.cantidad;
        }
        return total;
      }
  }
  