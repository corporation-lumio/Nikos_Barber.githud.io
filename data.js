/* =========================================================
   LA NAVAJA — capa de datos (localStorage)
   Esto simula un backend: todo vive en el navegador.
   Como index.html, login.html y admin.html están en el mismo
   dominio (tu sitio de GitHub Pages), comparten el mismo
   localStorage sin necesidad de servidor.
   ========================================================= */

const DB = {
  CITAS_KEY: 'lanavaja_citas',
  SESION_KEY: 'lanavaja_sesion',
  CONTADOR_KEY: 'lanavaja_contador',

  // --- catálogo fijo del negocio (edítalo a tu gusto) ---
  BARBEROS: [
    { id: 'b1', nombre: 'Rodolfo' },
    { id: 'b2', nombre: 'Toño' },
    { id: 'b3', nombre: 'Memo' }
  ],

  SERVICIOS: [
    { id: 's1', nombre: 'Corte clásico', minutos: 30, precio: 120 },
    { id: 's2', nombre: 'Corte + barba', minutos: 45, precio: 180 },
    { id: 's3', nombre: 'Arreglo de barba', minutos: 20, precio: 90 },
    { id: 's4', nombre: 'Corte a máquina', minutos: 20, precio: 90 },
    { id: 's5', nombre: 'Diseño / línea', minutos: 15, precio: 60 }
  ],

  HORARIOS: ['07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30',
             '11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30',
             '15:00','15:30','16:00'],

  // --- citas ---
  obtenerCitas() {
    try {
      return JSON.parse(localStorage.getItem(this.CITAS_KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  guardarCitas(citas) {
    localStorage.setItem(this.CITAS_KEY, JSON.stringify(citas));
  },

  siguienteNumero() {
    let n = parseInt(localStorage.getItem(this.CONTADOR_KEY) || '100', 10);
    n += 1;
    localStorage.setItem(this.CONTADOR_KEY, String(n));
    return n;
  },

  crearCita({ nombre, telefono, servicioId, barberoId, fecha, hora, notas }) {
    const citas = this.obtenerCitas();
    const cita = {
      id: 'c_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      numero: this.siguienteNumero(),
      nombre, telefono, servicioId, barberoId, fecha, hora,
      notas: notas || '',
      estado: 'pendiente', // pendiente | confirmada | completada | cancelada
      creada: new Date().toISOString()
    };
    citas.push(cita);
    this.guardarCitas(citas);
    return cita;
  },

  actualizarEstado(id, estado) {
    const citas = this.obtenerCitas();
    const cita = citas.find(c => c.id === id);
    if (cita) {
      cita.estado = estado;
      this.guardarCitas(citas);
    }
    return cita;
  },

  eliminarCita(id) {
    const citas = this.obtenerCitas().filter(c => c.id !== id);
    this.guardarCitas(citas);
  },

  horaOcupada(barberoId, fecha, hora, ignorarId) {
    return this.obtenerCitas().some(c =>
      c.barberoId === barberoId &&
      c.fecha === fecha &&
      c.hora === hora &&
      c.estado !== 'cancelada' &&
      c.id !== ignorarId
    );
  },

  servicio(id) { return this.SERVICIOS.find(s => s.id === id); },
  barbero(id) { return this.BARBEROS.find(b => b.id === id); },

  // --- sesión del barbero (demo, sin backend real) ---
  // Usuario/clave por defecto: barbero / navaja123
  // Puedes cambiarlos aquí abajo.
  CREDENCIALES: { usuario: 'barbero', clave: 'navaja123' },

  iniciarSesion(usuario, clave) {
    if (usuario === this.CREDENCIALES.usuario && clave === this.CREDENCIALES.clave) {
      localStorage.setItem(this.SESION_KEY, JSON.stringify({ usuario, ts: Date.now() }));
      return true;
    }
    return false;
  },

  haySesion() {
    return !!localStorage.getItem(this.SESION_KEY);
  },

  cerrarSesion() {
    localStorage.removeItem(this.SESION_KEY);
  }
};

function mostrarToast(mensaje) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = mensaje;
  requestAnimationFrame(() => el.classList.add('mostrar'));
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => el.classList.remove('mostrar'), 3200);
}

function formatearFecha(fechaISO) {
  const [y, m, d] = fechaISO.split('-');
  const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  return `${d} ${meses[parseInt(m,10)-1]} ${y}`;
}
