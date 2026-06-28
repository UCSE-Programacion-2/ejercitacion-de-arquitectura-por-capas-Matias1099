const Partido = require('../models/partido');
const mongoose = require('mongoose');

// 1. GET /partidos 
const getPartidos = async (req, res) => {
    try {
        const partidos = await Partido.find().limit(20);
        return res.status(200).json(partidos);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener los partidos" });
    }
};

// 2. GET /partidos/:id
const getPartidoById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        const partido = await Partido.findById(id);
        if (!partido) {
            return res.status(404).json({ error: "Partido no encontrado" });
        }
        return res.status(200).json(partido);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener el partido" });
    }
};

// 3. POST /partidos
const createPartido = async (req, res) => {
    try {
        const nuevoPartido = await Partido.create(req.body);
        return res.status(201).json(nuevoPartido);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// 4. PUT /partidos/:id
const updatePartido = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        const partidoActualizado = await Partido.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!partidoActualizado) {
            return res.status(404).json({ error: "Partido no encontrado" });
        }
        return res.status(200).json(partidoActualizado);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// 5. DELETE /partidos/:id
const deletePartido = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        const partidoEliminado = await Partido.findByIdAndDelete(id);
        if (!partidoEliminado) {
            return res.status(404).json({ error: "Partido no encontrado" });
        }
        return res.status(200).json({ mensaje: "Partido eliminado correctamente" });
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar el partido" });
    }
};

// 6. GET partidos torneos
const getPartidosPorTorneo = async (req, res) => {
    try {
        const { torneo } = req.params;
        const partidos = await Partido.find({ tournament: torneo });
        return res.status(200).json(partidos);
    } catch (error) {
        return res.status(500).json({ error: "Error al buscar partidos por torneo" });
    }
};

// 7. GET partidos equipos
const getPartidosPorEquipo = async (req, res) => {
    try {
        const { equipo } = req.params;
        const partidos = await Partido.find({
            $or: [
                { home_team: { $regex: equipo, $options: 'i' } },
                { away_team: { $regex: equipo, $options: 'i' } }
            ]
        });
        return res.status(200).json(partidos);
    } catch (error) {
        return res.status(500).json({ error: "Error al buscar partidos por equipo" });
    }
};

// 8. GET partidos por fechas
const getPartidosPorRangoFechas = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.params;
        const partidos = await Partido.find({
            date: { $gte: fechaInicio, $lte: fechaFin }
        });
        return res.status(200).json(partidos);
    } catch (error) {
        return res.status(500).json({ error: "Error al buscar partidos en ese rango de fechas" });
    }
};

module.exports = {
    getPartidos,
    getPartidoById,
    createPartido,
    updatePartido,
    deletePartido,
    getPartidosPorTorneo,
    getPartidosPorEquipo,
    getPartidosPorRangoFechas
};