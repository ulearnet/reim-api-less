const { pool } = require("../dbcnx");
const md5 = require("md5");

const getNombre = async (req, res) => {
  const { id } = req.body;

  await pool.query(
    `select nombres, apellido_paterno
    from usuario 
    where id = ?`,
    [id],
    async function (error, results, fields) {
        if (error) throw error;
        await pool.end()
        pool.quit()
        if (results.length > 0) {

            const nombre = results[0];
            await res.status(200).json(nombre);

        } else {

            await res.status(404).json(null);

        }
    }
  );

};

const getNickname = async (req, res) => {
  const { id } = req.body;

  await pool.query(
    `select nick_name
    from usuario 
    where id = ?`,
    [id],
    async function (error, results, fields) {
        if (error) throw error;
        await pool.end()
        pool.quit()
        if (results.length > 0) {

            const nombre = results[0];
            await res.status(200).json(nombre);

        } else {

            await res.status(404).json(null);

        }
    }
  );

};

module.exports = {
  getNombre,
  getNickname
};
