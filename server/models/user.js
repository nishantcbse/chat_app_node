module.exports = {
    getById: async (userid)=> {
        let result = await sql.query("SELECT * FROM users WHERE id = ?", [userid]);
        return result[0][0];
    },
    insert: async (name, username, password)=> {
        const user = await sql.query("INSERT INTO users (name, username, password, created_date) VALUES (?, ?, ?, ?)", [name, username, generateHash(password), currentTimeStamp]);
        return {
            'id': user[0].id,
            'name': name,
            'username': username
        }
    },
    getUserByUsername: async (username)=> {
        let result= await sql.query("SELECT id, name, username FROM users WHERE username = ? ORDER BY id DESC LIMIT 1", [username]);
        return result[0];
    },
    authUser: async (username)=> {
        let result= await sql.query("SELECT id, name, username, password FROM users WHERE username = ? ORDER BY id DESC LIMIT 1", [username]);
        return result[0];
    },
    changePassword:async (user_id, new_password)=>{
        await sql.query("UPDATE users SET password = ? WHERE id = ?", [generateHash(new_password), user_id]);
        return true;
    },
    updateDetails:async (user_id, name)=>{
        await sql.query("UPDATE users SET name = ? WHERE id = ?", [name, user_id]);
        return true;
    },
};
