const { pool } = require("../dbcnx");
const md5 = require("md5");

const put_aprueba = async (req, res) => {
  const {
    idusuario, idimagen, esaprobado
  } = req.body;

  await pool.query(
    `insert into aprueba(idusuario, idimagen, esaprobado)
         values (?, ?, ?)`,
    [
        idusuario, idimagen, esaprobado
    ],
    function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results.insertId);
    }
  );
};

module.exports = {
  put_aprueba,
};