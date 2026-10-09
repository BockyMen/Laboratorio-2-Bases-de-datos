const db = require('../services/mysql.service');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM stream ORDER BY idStream');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM stream WHERE idStream = ?', [id]);
    return rows[0];
};

const getByStreamer = async (streamer_name) => {
    const [rows] = await db.query('SELECT * FROM stream WHERE streamer_name = ?', [streamer_name]);
    return rows;
};

const create = async (data) => {
    const { active_days_per_week, avg_viewers_per_stream, streamer_name } = data;
    const [result] = await db.query(
        `INSERT INTO stream (active_days_per_week, avg_viewers_per_stream, streamer_name)
         VALUES (?, ?, ?)`,
        [active_days_per_week, avg_viewers_per_stream, streamer_name]
    );
    return getById(result.insertId);
};

const update = async (id, data) => {
    const { active_days_per_week, avg_viewers_per_stream, streamer_name } = data;
    const [result] = await db.query(
        `UPDATE stream
         SET active_days_per_week = ?, avg_viewers_per_stream = ?, streamer_name = ?
         WHERE idStream = ?`,
        [active_days_per_week, avg_viewers_per_stream, streamer_name, id]
    );
    return result.affectedRows > 0;
};

const remove = async (id) => {
    const [result] = await db.query('DELETE FROM stream WHERE idStream = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = { getAll, getById, getByStreamer, create, update, remove };