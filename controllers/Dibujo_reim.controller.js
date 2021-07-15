const { pool } = require("../dbcnx");
const md5 = require("md5");

const get_dibujo_reim = async (req, res) => {
  const id = req.params.id;
  await pool.query(
    `SELECT id_dibujo_reim, 
            usuario_id,
            imagen
      FROM dibujo_reim
      WHERE  reim_id = ?
      ORDER BY id_dibujo_reim DESC LIMIT 20
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

const getAprobados = async (req, res) => {

  const { reim_id} = req.body;

  await pool.query(
    ` 
      SELECT * FROM dibujo_reim 
      where reim_id = 204 
      and id_dibujo_reim in (select idimagen from ulearnet_reim_pilotaje.aprueba where esaprobado = 1) 
      ORDER BY id_dibujo_reim DESC limit 10 ;
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

  const { } = req.body;

  await pool.query(
    ` 
      select * from dibujo_reim where id_dibujo_reim = (select max(id_dibujo_reim) from ulearnet_reim_pilotaje.dibujo_reim); 
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
  getLast
};
