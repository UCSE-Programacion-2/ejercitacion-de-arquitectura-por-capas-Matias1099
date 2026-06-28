  require('dotenv').config();
  const express = require('express');
const connectDB = require('./config/db');
  const app = express();
  const partidoRoutes = require('./routes/partidosRoutes');
  app.use(express.json());
  // TODO: Configurar la conexión a la base de datos (MongoDB)
  connectDB();
  // TODO: Importar y usar las rutas de partidos
  app.use('/partidos', partidoRoutes);
  const PORT = process.env.PORT || 3000;

  // Exportamos 'app' para poder hacer testing
  module.exports = { app };

  // Iniciar el servidor solo si este archivo se ejecuta directamente
  if (require.main === module) {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  }
