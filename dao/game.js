const db = require('../services/mysql.service');

const getAll = async () => {
    return await db.query('SELECT idgame, name FROM game ORDER BY name');
};

const getById = async (id) => {
    const rows = await db.query('SELECT idgame, name FROM game WHERE idgame = ?', [id]);
    return rows[0];
};

// Streamers que usan este juego como game_1 o game_2
const getStreamers = async (id) => {
    return await db.query(
        `SELECT name, total_views, total_followers,
                CASE WHEN game_1 = ? THEN 'game_1' ELSE 'game_2' END AS posicion
         FROM streamer
         WHERE game_1 = ? OR game_2 = ?
         ORDER BY total_followers DESC`,
        [id, id, id]
    );
};

const create = async (name) => {
    const result = await db.pool.query('INSERT INTO game (name) VALUES (?)', [name]);
    return { idgame: result[0].insertId, name: name };
};

const update = async (id, name) => {
    const result = await db.pool.query('UPDATE game SET name = ? WHERE idgame = ?', [name, id]);
    return result[0].affectedRows > 0;
};

const remove = async (id) => {
    const uso = await db.query(
        'SELECT COUNT(*) AS total FROM streamer WHERE game_1 = ? OR game_2 = ?', [id, id]);
    if (uso[0].total > 0) {
        throw new Error(`No se puede borrar: ${uso[0].total} streamers usan este juego`);
    }
    const result = await db.pool.query('DELETE FROM game WHERE idgame = ?', [id]);
    return result[0].affectedRows > 0;
};

module.exports = {
    getAll, getById, getStreamers, create, update, remove,
    // nombres alternativos por si tus rutas usan el estilo del profesor
    getAllInfo: getAll,
    createInfo: create
};