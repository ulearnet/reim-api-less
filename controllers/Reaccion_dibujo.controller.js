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
const get_reacciones_x_img = async (req, res) => {
    const { id_dibujo_reim } = req.body;
    console.log(id_dibujo_reim)
    await pool.query(
        `SELECT DISTINCT d.id_dibujo_reim, 
            (SELECT COUNT(idreaccion) FROM reaccionxdibujo WHERE idreaccion = 1 AND iddibujo = d.id_dibujo_reim) Tristeza,
            (SELECT COUNT(idreaccion) FROM reaccionxdibujo WHERE idreaccion = 2 AND iddibujo = d.id_dibujo_reim) Alegria,
            (SELECT COUNT(idreaccion) FROM reaccionxdibujo WHERE idreaccion = 3 AND iddibujo = d.id_dibujo_reim) Desagrado,
            (SELECT COUNT(idreaccion) FROM reaccionxdibujo WHERE idreaccion = 4 AND iddibujo = d.id_dibujo_reim) Temor,
            (SELECT COUNT(idreaccion) FROM reaccionxdibujo WHERE idreaccion = 5 AND iddibujo = d.id_dibujo_reim) Enojo
      FROM dibujo_reim d
      WHERE  d.id_dibujo_reim = ?;`,[id_dibujo_reim],
        async function (error, results, fields) {console.log(id_dibujo_reim)
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
    get,
    get_reacciones_x_img
  };
