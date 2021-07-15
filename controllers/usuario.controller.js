const { pool } = require("../dbcnx");
const md5 = require("md5");

const getNombre = async (req, res) => {
  const { id } = req.body;

  await pool.query(
    `select nombres, apellido_paterno
    from ulearnet_reim_pilotaje.usuario 
    where id = ?`,
    [id],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {

        const nombre = results[0];
        res.status(200).json(nombre);

      } else {

        res.status(404).json(null);

      }
    }
  );
};

module.exports = {
  getNombre
};