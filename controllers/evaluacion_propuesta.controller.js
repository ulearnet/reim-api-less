const { pool } = require("../dbcnx");
const md5 = require("md5");

const get_evaluacion_docen = async (req, res) => {
    const {
      id_usuario,
      fecha_evaluacion,
      id_elemento,
      } = req.body;
  await pool.query(
    `SELECT (SUM(CAST(evaluacion AS UNSIGNED))*5) as evaluacion
    FROM evaluacion_propuesta
    WHERE id_usuario = ? AND fecha_evaluacion >= ${fecha_evaluacion} AND id_elemento = ?
   `,
   [id_usuario,id_elemento],
     async function (error, results, fields) {
       if (error) throw error;
       await pool.end()
       pool.quit()
       if (results.length > 0) {
         var string=JSON.stringify(results);
         var json =  JSON.parse(string);
         const Resp = json[0].evaluacion;
         await res.status(200).json(Resp);
       } else {
         await res.status(404).json(null);
       }
     }
  );
};

module.exports = {
    get_evaluacion_docen,
  };