# 📅 Agendia — Plataforma de reservas

Plataforma de reservas simplificada (estilo Booking/Calendly) donde los negocios publican servicios y horarios, y los clientes reservan. Proyecto de aprendizaje full-stack en **JavaScript puro**, pensado para construirse por fases pequeñas, con commits frecuentes y sin infraestructura compleja.

> 🚧 **Estado actual:** Fase 1 completada (proyecto base, modelos de datos y seed). El resto de funcionalidades se irán añadiendo fase a fase, ver [Roadmap](#-roadmap).

## 🎯 Qué demuestra este proyecto

- Relaciones **1:N** y **N:M** con Sequelize
- **Prevención de reservas solapadas** mediante transacciones
- Autenticación con **JWT** y control de acceso por **roles**
- Emails de confirmación con **Nodemailer**
- Calendario visual de reservas

## 🧱 Stack

| Capa | Tecnología |
|---|---|
| Frontend | React + Vite (JavaScript) |
| Backend | Node.js ≥ 20.6 + Express 5 (JavaScript, ES Modules) |
| ORM | Sequelize |
| Base de datos | SQLite en local · PostgreSQL gestionado (Neon/Supabase) opcional mediante `DATABASE_URL` |
| Email | Nodemailer + Ethereal Email (pruebas) |
| Seguridad | helmet, cors, bcryptjs, JWT |

Sin Docker, sin TypeScript y sin monorepo: solo dos carpetas.

## 📁 Estructura actual

```
Agendia/
├── client/                  # React + Vite
│   └── src/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js        # Conexión Sequelize (SQLite o Postgres)
│   │   ├── models/
│   │   │   └── index.js     # Modelos y relaciones
│   │   ├── app.js           # Express: middlewares, health y errores
│   │   └── server.js        # Arranque y sincronización de la BD
│   ├── seed.js              # Datos de ejemplo
│   ├── .env                 # Variables de entorno (no se sube a git)
│   └── package.json
├── .gitignore
└── README.md
```

Las carpetas `routes/`, `controllers/`, `services/` y `middlewares/` se crearán en `server/src/` conforme se necesiten.

## 🗄️ Modelo de datos

| Modelo | Descripción | Relaciones |
|---|---|---|
| **User** | Usuario con rol `ADMIN`, `OWNER` o `CUSTOMER` | 1:N Business, 1:N Booking |
| **Business** | Negocio con zona horaria y política de cancelación | N:1 User (dueño), 1:N Service, 1:N Professional |
| **Service** | Servicio con duración, buffer y precio | N:1 Business, N:M Professional, 1:N Booking |
| **Professional** | Persona que atiende en un negocio | N:1 Business, N:M Service, 1:N Availability, 1:N Booking |
| **Availability** | Horario semanal recurrente (día + franja) | N:1 Professional |
| **Booking** | Reserva con inicio, fin y estado (`CONFIRMED`, `CANCELLED`, `COMPLETED`) | N:1 User, Service y Professional |

La tabla intermedia `ProfessionalServices` implementa la relación N:M entre profesionales y servicios.

## 🚀 Puesta en marcha

### Requisitos

- [Node.js](https://nodejs.org) v20.6 o superior (recomendado: LTS)
- Git

### Instalación

```bash
git clone https://github.com/<tu-usuario>/Agendia.git
cd Agendia

# Backend
cd server
npm install
```

Crea el archivo `server/.env`:

```env
PORT=4000
DB_STORAGE=./database.sqlite
JWT_SECRET=cambia-esto-por-un-texto-largo-y-aleatorio
CLIENT_URL=http://localhost:5173
# DATABASE_URL=postgres://...   (opcional: Neon/Supabase; requiere npm i pg pg-hstore)
```

Carga los datos de ejemplo y arranca el servidor:

```bash
npm run seed
npm run dev
```

En otra terminal, el frontend:

```bash
cd client
npm install
npm run dev
```

| Servicio | URL |
|---|---|
| Web | http://localhost:5173 |
| API | http://localhost:4000/api |
| Health check | http://localhost:4000/api/health |

### Usuarios de prueba (seed)

| Rol | Email | Contraseña |
|---|---|---|
| ADMIN | admin@Agendia.test | Password123! |
| OWNER | owner@Agendia.test | Password123! |
| CUSTOMER | cliente@Agendia.test | Password123! |

> ⚠️ `npm run seed` borra y recrea todas las tablas. Úsalo solo en desarrollo.

## 📜 Scripts del servidor

| Comando | Descripción |
|---|---|
| `npm run dev` | Arranca la API con recarga automática |
| `npm start` | Arranca la API sin recarga |
| `npm run seed` | Recrea la base de datos con datos de ejemplo |

## 🗺️ Roadmap

- [x] **Fase 1** — Proyecto base, servidor Express, modelos Sequelize y seed
- [ ] **Fase 2** — Registro, login, JWT y roles
- [ ] **Fase 3** — CRUD de negocios, servicios y profesionales
- [ ] **Fase 4** — Disponibilidad y cálculo de huecos libres
- [ ] **Fase 5** — Reservas, prevención de solapamientos y cancelaciones
- [ ] **Fase 6** — Emails de confirmación con Nodemailer (Ethereal)
- [ ] **Fase 7** — Frontend: autenticación y flujo de reserva
- [ ] **Fase 8** — Calendario visual (FullCalendar)
- [ ] **Fase 9** — Panel de administración
- [ ] **Fase 10** — Validación con Zod, tests y despliegue (Render + Neon)

## 🔒 Prevención de reservas solapadas

Dos reservas confirmadas del mismo profesional no pueden cruzarse en el tiempo. La comprobación y la inserción se ejecutan dentro de una transacción para evitar condiciones de carrera. Dos rangos se solapan cuando:

```
inicio_existente < fin_nuevo  Y  fin_existente > inicio_nuevo
```

Las reservas canceladas no bloquean el hueco. Si se migra a PostgreSQL, se podrá añadir además una constraint `EXCLUDE` como segunda capa de seguridad.

## 🧭 Notas

- Las fechas se guardan en UTC; cada negocio define su zona horaria IANA para calcular la disponibilidad.
- `sequelize.sync()` se usa solo en desarrollo. Al estabilizar el esquema se pasará a migraciones.
- Nunca subas `.env` ni archivos `.sqlite` al repositorio (ya están en `.gitignore`).

## 📄 Licencia

MIT © <Ruben-Serrejon-Porras>
