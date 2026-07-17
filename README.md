# La Navaja — Barbería

Sitio de citas para una barbería, con 3 páginas:

- **index.html** — página pública: el cliente elige barbero, servicio, fecha y hora, y recibe un "ticket de turno".
- **login.html** — acceso del barbero (usuario: `barbero`, clave: `navaja123`, editable en `assets/data.js`).
- **admin.html** — panel del barbero: ve todas las citas, filtra por barbero/fecha/estado, y las confirma, completa, cancela o elimina.

No lleva backend: todo se guarda en el `localStorage` del navegador (funciona perfecto en GitHub Pages, pero cada visitante ve solo lo que agenda **en su propio navegador** — para compartir citas entre varios dispositivos reales necesitarías una base de datos, esto es una demo/prototipo funcional).

## Cómo publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub (ej. `la-navaja-barberia`).
2. Sube estos archivos tal cual (mantén la carpeta `assets/`).
3. En el repo: **Settings → Pages → Source**, elige la rama `main` y carpeta `/ (root)`.
4. Guarda. En un par de minutos tu sitio estará en:
   `https://tu-usuario.github.io/la-navaja-barberia/`

## Cómo personalizarlo

- **Nombre del negocio**: busca "La Navaja" en los 3 archivos `.html` y reemplázalo.
- **Barberos y servicios**: edita los arreglos `BARBEROS` y `SERVICIOS` en `assets/data.js`.
- **Horarios disponibles**: edita `HORARIOS` en `assets/data.js`.
- **Usuario/clave del barbero**: edita `CREDENCIALES` en `assets/data.js`.
- **Colores**: variables `:root` al inicio de `assets/style.css`.

## Ideas para cuando quieras llevarlo a producción real

- Guardar las citas en una base de datos real (Firebase, Supabase, etc.) en vez de `localStorage`, para que el cliente y el barbero vean la misma información desde cualquier dispositivo.
- Enviar confirmación por WhatsApp (como en tu página de Build&Restore).
- Autenticación real si hay más de un barbero con su propio login.
