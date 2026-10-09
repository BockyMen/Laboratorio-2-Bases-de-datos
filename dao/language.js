const db = require('../services/mysql.service');

const getAll = async () => {
    const [rows] = await db.query('SELECT idlanguage, name_language FROM language ORDER BY name_language');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT idlanguage, name_language FROM language WHERE idlanguage = ?', [id]);
    return rows[0];
};

const getStreamers = async (id) => {
    const [rows] = await db.query(
        `SELECT name, total_views, total_followers
         FROM streamer
         WHERE language_idlanguage = ?
         ORDER BY total_followers DESC`,
        [id]
    );
    return rows;
};

const create = async (name_language) => {
    const [result] = await db.query('INSERT INTO language (name_language) VALUES (?)', [name_language]);
    return { idlanguage: result.insertId, name_language: name_language };
};

const update = async (id, name_language) => {
    const [result] = await db.query('UPDATE language SET name_language = ? WHERE idlanguage = ?', [name_language, id]);
    return result.affectedRows > 0;
};

const remove = async (id) => {
    const [[uso]] = await db.query(
        'SELECT COUNT(*) AS total FROM streamer WHERE language_idlanguage = ?', [id]);
    if (uso.total > 0) {
        throw new Error(`No se puede borrar: ${uso.total} streamers usan este idioma`);
    }
    const [result] = await db.query('DELETE FROM language WHERE idlanguage = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = { getAll, getById, getStreamers, create, update, remove };