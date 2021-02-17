const { pool } = require("../dbcnx");
const md5 = require("md5");

const put_alumno_respuesta_actividad = async (req, res) => {
  const {
    id_reim,
    id_actividad,
    id_elemento,
    datetime_touch,
    fila,
    columna,
    correcta,
    id_user,
    id_per,
  } = req.body;

  await pool.query(
    `insert into alumno_respuesta_actividad (id_reim, id_actividad, id_elemento, datetime_touch, fila, columna, correcta, id_user, id_per)
         values (?, ?, ?, ?, ?,
                 ?, ?, ?, ?)`,
    [
      id_reim,
      id_actividad,
      id_elemento,
      datetime_touch,
      fila,
      columna,
      correcta,
      id_user,
      id_per,
    ],
    function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results.insertId);
    }
  );
};

module.exports = {
  put_alumno_respuesta_actividad,
};
