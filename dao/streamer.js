const db = require('../services/mysql.service');

const SELECT_BASE = `
    SELECT s.name, s.total_views, s.total_followers,
           s.language_idlanguage, l.name_language AS language,
           s.game_1, g1.name AS game_1_name,
           s.game_2, g2.name AS game_2_name
    FROM streamer s
    JOIN language l   ON l.idlanguage = s.language_idlanguage
    JOIN game g1      ON g1.idgame = s.game_1
    LEFT JOIN game g2 ON g2.idgame = s.game_2
`;

const getAll = async () => {
    const [rows] = await db.query(`${SELECT_BASE} ORDER BY s.name`);
    return rows;
};

const getById = async (name) => {
    const [rows] = await db.query(`${SELECT_BASE} WHERE s.name = ?`, [name]);
    return rows[0];
};

const getWithStreams = async (name) => {
    const streamer = await getById(name);
    if (!streamer) return undefined;
    const [streams] = await db.query(
        `SELECT idStream, active_days_per_week, avg_viewers_per_stream
         FROM stream WHERE streamer_name = ? ORDER BY idStream`,
        [name]
    );
    return { ...streamer, streams: streams };
};

const getByLanguage = async (idlanguage) => {
    const [rows] = await db.query(
        `${SELECT_BASE} WHERE s.language_idlanguage = ? ORDER BY s.total_followers DESC`, [idlanguage]);
    return rows;
};

const getByGame = async (idgame) => {
    const [rows] = await db.query(
        `${SELECT_BASE} WHERE s.game_1 = ? OR s.game_2 = ? ORDER BY s.total_followers DESC`,
        [idgame, idgame]);
    return rows;
};

const create = async (data) => {
    const { name, total_views, total_followers, language_idlanguage, game_1, game_2 } = data;
    await db.query(
        `INSERT INTO streamer (name, total_views, total_followers, language_idlanguage, game_1, game_2)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, total_views, total_followers, language_idlanguage, game_1, game_2 || null]
    );
    return getById(name);
};

const update = async (name, data) => {
    const { total_views, total_followers, language_idlanguage, game_1, game_2 } = data;
    const [result] = await db.query(
        `UPDATE streamer
         SET total_views = ?, total_followers = ?, language_idlanguage = ?, game_1 = ?, game_2 = ?
         WHERE name = ?`,
        [total_views, total_followers, language_idlanguage, game_1, game_2 || null, name]
    );
    return result.affectedRows > 0;
};

const remove = async (name) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        await conn.query('DELETE FROM stream WHERE streamer_name = ?', [name]);
        const [result] = await conn.query('DELETE FROM streamer WHERE name = ?', [name]);
        await conn.commit();
        return result.affectedRows > 0;
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
};

module.exports = { getAll, getById, getWithStreams, getByLanguage, getByGame, create, update, remove };