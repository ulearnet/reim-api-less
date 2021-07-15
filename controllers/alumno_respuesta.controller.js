const { pool } = require("../dbcnx");
const md5 = require("md5");

const put_alumno_respuesta_actividad2 = async (req, res) => {
  const {
    id_per, id_user,id_reim,id_actividad,id_elemento, datetime_touch,Eje_X, Eje_Y, correcta, resultado
  } = req.body;

  await pool.query(
    `insert into alumno_respuesta_actividad (id_per, id_user, id_reim, id_actividad, id_elemento, datetime_touch, Eje_X, Eje_Y, correcta, resultado)
         values (?, ?, ?, ?, ?,
                 ?, ?, ?, ?, ?)`,
    [
      id_per, id_user,id_reim,id_actividad,id_elemento, datetime_touch,Eje_X, Eje_Y, correcta,resultado
    ],
    function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results.insertId);
    }
  );
};


const put_alumno_respuesta_actividad = async (req, res) => {
  const {
    id_per, id_user,id_reim,id_actividad,id_elemento, datetime_touch,Eje_X, Eje_Y, Eje_Z ,correcta, resultado,Tipo_Registro
  } = req.body;

  await pool.query(
    `insert into alumno_respuesta_actividad (id_per, id_user, id_reim, id_actividad, id_elemento, datetime_touch, Eje_X, Eje_Y, Eje_Z , correcta, resultado, Tipo_Registro)
         values (?, ?, ?, ?, ?,
                 ?, ?, ?, ?, ?,?,?)`,
    [
      id_per, id_user,id_reim,id_actividad,id_elemento, datetime_touch,Eje_X, Eje_Y,Eje_Z, correcta,resultado,Tipo_Registro
    ],
    function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results.insertId);
    }

  );
};

const get_colab_spacemath = async (req, res) => {
  const {id_elemento} = req.body;
  await pool.query(
      `select sum(resultado) as counter
    from alumno_respuesta_actividad 
    where  id_elemento = ?
    `,
      [id_elemento],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          console.log(results[0]);
          res.status(200).json(results[0]);
        }else{
          res.status(404).json(null);
        }
      }
  );
};
module.exports = {
  put_alumno_respuesta_actividad2,
  put_alumno_respuesta_actividad,
  get_colab_spacemath
  
};
