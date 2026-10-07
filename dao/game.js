const db = require('../services/mysql.service');

const getAll = async () => {
    const [rows] = await db.query('SELECT idgame, name FROM game ORDER BY name');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT idgame, name FROM game WHERE idgame = ?', [id]);
    return rows[0];
};

// Streamers que tienen este juego como mas streameado (game_1) o como segundo (game_2)
const getStreamers = async (id) => {
    const [rows] = await db.query(
        `SELECT name, total_views, total_followers,
                CASE WHEN game_1 = ? THEN 'game_1' ELSE 'game_2' END AS posicion
         FROM streamer
         WHERE game_1 = ? OR game_2 = ?
         ORDER BY total_followers DESC`,
        [id, id, id]
    );
    return rows;
};

const create = async (name) => {
    const [result] = await db.query('INSERT INTO game (name) VALUES (?)', [name]);
    return { idgame: result.insertId, name: name };
};

const update = async (id, name) => {
    const [result] = await db.query('UPDATE game SET name = ? WHERE idgame = ?', [name, id]);
    return result.affectedRows > 0;
};

// No deja borrar un juego que algun streamer este usando (llaves foraneas game_1 / game_2)
const remove = async (id) => {
    const [[uso]] = await db.query(
        'SELECT COUNT(*) AS total FROM streamer WHERE game_1 = ? OR game_2 = ?', [id, id]);
    if (uso.total > 0) {
        throw new Error(`No se puede borrar: ${uso.total} streamers usan este juego`);
    }
    const [result] = await db.query('DELETE FROM game WHERE idgame = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = { getAll, getById, getStreamers, create, update, remove };