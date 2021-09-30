const { pool } = require("../dbcnx");
const md5 = require("md5");

const add_opinion_dibujo = async (req, res) => {

    const {
      id_dibujo_reim,
      fecha_insert,
      id_usuario,
      opinion,
    } = req.body;
    await pool.query(
      `insert into opinionxdibujo (id_dibujo_reim,fecha_insert,id_usuario,opinion)
           values (?, ?, ?, ?)`,
      [
        id_dibujo_reim,
        fecha_insert,
        id_usuario,
        opinion,
      ],
      async function (error, results, fields) {
          if (error) throw error;
          await pool.end()
          pool.quit()
          res.status(200).json(results.insertId);
      }
    );

  };


module.exports = {
    add_opinion_dibujo,
  };
