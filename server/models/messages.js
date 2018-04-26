module.exports = {
    getByUserId: async function (userid) {
        let result = await sql.query("SELECT * FROM messages WHERE user_id = ?", [userid]);
        return result[0][0];
    },
    insert: async function (message, unix_timestamp,  user_id) {
        const msg = await sql.query("INSERT INTO messages (message, user_id, unix_timestamp, created_date) VALUES (?, ?, ?, ?)", [message, user_id, unix_timestamp, currentTimeStamp]);
        return {
            'id': msg[0].id,
            'message': message,
            'position':unix_timestamp,
            'user_id': user_id
        }
    },
    getAllMessages: async function () {
        let result = await sql.query("SELECT messages.message, messages.unix_timestamp as position, users.name, users.username FROM messages INNER JOIN users ON users.id = messages.user_id");
        return result[0];
    }
};
