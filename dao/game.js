const db = require('../services/mysql.service');

const getAll = async (req, res) => {
    try {
        const rows = await db.query('SELECT idgame, name FROM game ORDER BY name');
        res.json(rows);
    } catch (err) {
        console.error('Error en getAll:', err.message);
        res.status(500).json({ error: err.message });
    }
};

const create = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send("Info Missing");
        }
        const [result] = await db.conTiempoLimite(
            db.pool.query('INSERT INTO game (name) VALUES (?)', [name]));
        res.status(201).json({ idgame: result.insertId, name: name });
    } catch (err) {
        console.error('Error en create:', err.message);
        res.status(500).json({ error: err.message });
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const rows = await db.query('SELECT idgame, name FROM game WHERE idgame = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).send("404 Not Found");
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Error en getById:', err.message);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAll, create, getById };