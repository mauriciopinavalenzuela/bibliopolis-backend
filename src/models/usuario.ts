class Usuario {
    id: number;
    nombre: string;
    correoElectronico: string;
    contrasena: string;
    direccion: string;
    historialPedidos: Pedido[];
  
    constructor(id: number, nombre: string, correoElectronico: string, contrasena: string, direccion: string, historialPedidos: Pedido[] = []) {
      this.id = id;
      this.nombre = nombre;
      this.correoElectronico = correoElectronico;
      this.contrasena = contrasena;
      this.direccion = direccion;
      this.historialPedidos = historialPedidos;
    }
  }
  