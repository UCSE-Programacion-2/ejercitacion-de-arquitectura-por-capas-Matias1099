const express = require('express');
const router = express.Router();
const partidoController = require('../controllers/partidosControllers');

// 1. Endpoints especializados (Búsquedas - Van arriba para evitar colisiones de rutas)
router.get('/torneo/:torneo', partidoController.getPartidosPorTorneo);
router.get('/equipo/:equipo', partidoController.getPartidosPorEquipo);
router.get('/fecha/:fechaInicio-:fechaFin', partidoController.getPartidosPorRangoFechas);

// 2. Definición de rutas del CRUD Básico
router.get('/', partidoController.getPartidos);
router.get('/:id', partidoController.getPartidoById);
router.post('/', partidoController.createPartido);
router.put('/:id', partidoController.updatePartido);
router.delete('/:id', partidoController.deletePartido);

module.exports = router;