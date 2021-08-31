const { pool } = require("../dbcnx");
const md5 = require("md5");

const put_asigna_reim_alumno = async (req, res) => {
  const {sesion_id,usuario_id,periodo_id,reim_id,datetime_inicio,datetime_termino,} = req.body;

  await pool.query(
    `insert into asigna_reim_alumno (sesion_id, usuario_id, periodo_id, reim_id, datetime_inicio, datetime_termino)
         values (?, ?, ?, ?, ?, ?)`,
    [sesion_id,usuario_id,periodo_id,reim_id,datetime_inicio,datetime_termino],
    function (error, results, fields) {
      if (error) throw error;
      res.status(200).json("OK");
    }
  );
};

const update_asigna_reim_alumno = async (req, res) => {
  const id = req.params.id;
  const {usuario_id, periodo_id, reim_id, datetime_inicio,datetime_termino,} = req.body;

  await pool.query(
    `update asigna_reim_alumno set usuario_id = ?, periodo_id = ?, reim_id = ?, datetime_inicio = ?, datetime_termino = ?
         where sesion_id = ? `, [usuario_id, periodo_id, reim_id, datetime_inicio, datetime_termino, id],
    function (error, results, fields) {
      if (error) throw error;
      res.status(200).json("OK");
    }
  );
};

const update_asigna_reim_alumno_final = async (req, res) => {
  const sesion_id = req.params.id;
  const { datetime_termino} = req.body;

  await pool.query(
    `update asigna_reim_alumno set datetime_termino= ? where sesion_id = ? `,
      [datetime_termino, sesion_id],
      function (error, results, fields) {
      if (error) throw error;

      res.status(200).json(results.insertId)
    }
  );
};

const update_termino_json = async (req, res) => {
  const { datetime_termino, sesion_id } = req.body;

  await pool.query(
    `update
         asigna_reim_alumno
         set datetime_termino= ?
         where sesion_id = ?
    `,
    [datetime_termino, sesion_id],
    function (error, results, fields) {
      if (error) throw error;
      res.status(200).json("OK");
    }
  );
};

module.exports = {
  put_asigna_reim_alumno,
  update_asigna_reim_alumno,
  update_asigna_reim_alumno_final,
  update_termino_json
};
