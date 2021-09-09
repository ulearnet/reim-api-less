const { pool } = require("../dbcnx");
const md5 = require("md5");

const put_dibujo_reim = async (req, res) => {
  const {
    sesion_id,
    reim_id,
    actividad_id,
    imagen,
  } = req.body;

  await pool.query(
    `insert into dibujo_reim (sesion_id,reim_id,actividad_id,imagen)
         values (?, ?, ?, ?, ?)`,
    [
      sesion_id,reim_id,actividad_id,imagen
    ],
    function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results.insertId);
    }

  );
};


const get_dibujo_reim = async (req, res) => {
  const id = req.params.id;
  await pool.query(
    `SELECT id_dibujo_reim, 
            usuario_id,
            imagen
      FROM dibujo_reim
      WHERE  reim_id = ?
      ORDER BY id_dibujo_reim DESC limit 8;
    `,
     [id],
     function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        const Resp = results;
        res.status(200).json(Resp);
      } else {
        res.status(404).json(null);
      }
    }
  );
};


const get_Misdibujo_reim = async (req, res) => {
  const {
    reim_id,usuario_id
  } = req.body;
  await pool.query(
    `SELECT DISTINCT d.id_dibujo_reim, 
            d.imagen,
            (SELECT COUNT(idreaccion) FROM ulearnet_reim_pilotaje.reaccionxdibujo WHERE idreaccion = 1 AND iddibujo = d.id_dibujo_reim) Tristeza,
            (SELECT COUNT(idreaccion) FROM ulearnet_reim_pilotaje.reaccionxdibujo WHERE idreaccion = 2 AND iddibujo = d.id_dibujo_reim) Alegria,
            (SELECT COUNT(idreaccion) FROM ulearnet_reim_pilotaje.reaccionxdibujo WHERE idreaccion = 3 AND iddibujo = d.id_dibujo_reim) Desagrado,
            (SELECT COUNT(idreaccion) FROM ulearnet_reim_pilotaje.reaccionxdibujo WHERE idreaccion = 4 AND iddibujo = d.id_dibujo_reim) Temor,
            (SELECT COUNT(idreaccion) FROM ulearnet_reim_pilotaje.reaccionxdibujo WHERE idreaccion = 5 AND iddibujo = d.id_dibujo_reim) Enojo
      FROM dibujo_reim d
      WHERE  d.reim_id = ? AND d.usuario_id = ?
      ORDER BY d.id_dibujo_reim DESC limit 8;
    `,
     [reim_id,usuario_id],
     function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        const Resp = results;
        res.status(200).json(Resp);
      } else {
        res.status(404).json(null);
      }
    }
  );
};


const get_generaldibujo_reim = async (req, res) => {
  const {
    reim_id,usuario_id
  } = req.body;
  await pool.query(
    `SELECT id_dibujo_reim, 
            usuario_id,
            imagen
      FROM dibujo_reim
      WHERE  reim_id = ? AND usuario_id != ?
      ORDER BY id_dibujo_reim DESC limit 8;
    `,
     [reim_id,usuario_id],
     function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        const Resp = results;
        res.status(200).json(Resp);
      } else {
        res.status(404).json(null);
      }
    }
  );
};


const getAprobados = async (req, res) => {

  const { reim_id} = req.body;

  await pool.query(
    ` 
      SELECT * FROM dibujo_reim 
      where reim_id = ?
      and id_dibujo_reim in (select idimagen from aprueba where esaprobado = 1) 
      ORDER BY id_dibujo_reim DESC limit 8;
    `,
    [reim_id],
    function (error, results, fields) {
      if (error) throw error;
      if(results.length > 0){
        res.status(200).json(results);
      }else{
        res.status(404).json(false);
      }
    }
  );
};

const getLast = async (req, res) => {


  await pool.query(
    ` 
      select * from dibujo_reim where id_dibujo_reim = (select max(id_dibujo_reim) from dibujo_reim); 
    `,
    function (error, results, fields) {
      if (error) throw error;
      if(results.length > 0){
        res.status(200).json(results[0].id_dibujo_reim);
      }else{
        var cero = 0;
        res.status(404).json(cero);
      }
    }
  );
};

module.exports = {
  get_dibujo_reim,
  getAprobados,
  getLast,
  put_dibujo_reim,
  get_Misdibujo_reim,
  get_generaldibujo_reim
};
