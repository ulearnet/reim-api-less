const { pool } = require("../dbcnx");
const md5 = require("md5");

const add_reaccion_dibujo = async (req, res) => {

    const {
      idreaccion,
      iddibujo,
      idusuario,
      fecha,
    } = req.body;
    await pool.query(
      `insert into reaccionxdibujo (idreaccion,iddibujo,idusuario,fecha)
           values (?, ?, ?, ?)`,
      [
        idreaccion,
        iddibujo,
        idusuario,
        fecha,
      ],
      async function (error, results, fields) {
          if (error) throw error;
          await pool.end()
          pool.quit()
          await res.status(200).json(results.insertId);
      }
    );

  };

  const get = async (req, res) => {
    const { iddibujo } = req.body;

    await pool.query(
      `
      select * from reaccionxdibujo where iddibujo = ?
      `,
      [iddibujo],
      async function (error, results, fields) {
          if (error) throw error;
          await pool.end()
          pool.quit()
          if (results.length > 0) {
              await res.status(200).json(results);
          } else {
              await res.status(404).json(null);
          }
      }
    );

  };

module.exports = {
    add_reaccion_dibujo,
    get
  };
