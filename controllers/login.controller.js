const { pool } = require("../dbcnx");
const md5 = require("md5");

const login = async (req, res) => {
  const { loginame, password } = req.body;

  await pool.query(
    `select id, concat(nombres, apellido_paterno, apellido_materno) as nombre
     from usuario
     where username = ?
     and password = ?  
     `,
    [loginame, password],
    async function (error, results, fields) {
        if (error) throw error;
        await pool.end()
        pool.quit()
        if (results.length > 0) {
            const userLoged = results[0];

            await res.status(200).json(userLoged);
        } else {
            await res.status(404).json(null);
        }
    }
  );

};

module.exports = {
  login,
};
