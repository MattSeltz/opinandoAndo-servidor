# OpinandoAndo - Servidor (API REST)

Este proyecto representa el backend de **OpinandoAndo**, una red social que permite a los usuarios expresar sus opiniones en forma de afirmaciones y recibir votos de otros usuarios.

El servidor está construido con **Express y TypeScript**, expone una API REST para manejar usuarios, afirmaciones, votos, autenticación y recuperación de contraseñas. Utiliza **MongoDB** como base de datos y está preparado para funcionar en conjunto con un frontend desacoplado.

---

## 🚀 Características

- **API REST**: Endpoints para manejar usuarios, afirmaciones y votos.
- **Autenticación segura**: Uso de JWT y cookies `httpOnly` para mantener sesiones seguras.
- **Recuperación de contraseña**: Flujo de email + token para recuperar cuentas.
- **Validaciones y control de acceso**: Middleware para proteger rutas y validar datos.
- **CORS configurado para frontend separado**: Ideal para despliegue independiente del cliente.
- **Desarrollado con TypeScript**: Código más robusto y mantenible.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT**
- **Nodemailer**
- **cookie-parser**
- **dotenv**
