const { pool } = require("../dbcnx");
const md5 = require("md5");


const get_detalle_usuario = async (req, res) =>{
    const {
        id_usuario,
        id_reim,
      } = req.body; 

    await pool.query(
        `select *
         from detalle_usuario
         where id_usuario = ? and id_reim = ?`,
         [id_usuario , id_reim],
         function(error, results, fields){
            if (error) throw error;
            if(results.length > 0){
                const userLoged = results[0];
                res.status(200).json(userLoged);
            }else{
                var no = false;
                res.status(404).json(no);
            }
         }
    )   
}

const update_detalle_usuario = async (req, res) =>{
  const {
      id_usuario,
      id_reim,
      opciones_inicio
    } = req.body; 

  await pool.query(
      `update detalle_usuario
       set opciones_inicio = ?
       where id_usuario = ? and id_reim = ?`,
       [opciones_inicio, id_usuario , id_reim],
       function(error, results, fields){
          if (error) throw error;
          res.status(200).json("OK");
       }
  )   
}

const put_detalle_usuario = async (req, res) => {
  const {
    id_usuario,
    id_reim,
    identificador_personal,
    opciones_inicio,
  } = req.body;

  await pool.query(
    `insert into detalle_usuario (id_usuario, id_reim, identificador_personal, opciones_inicio)
         values (?, ?, ?, ?)`,
    [
      id_usuario,
      id_reim,
      identificador_personal,
      opciones_inicio,
    ],
    function (error, results, fields) {
      if (error) throw error;
      res.status(200).json("OK");
    }
  );
};

const getLast = async (req, res) => { 

    await pool.query(
      ` SELECT id
        from detalle_usuario
        where id = (select max(id) from transaccion_reim)`,
      function(error, results, fields){
          if (error) throw error;
          res.status(200).json(results[0].id);
      }
)
}



module.exports = {
  get_detalle_usuario,
  update_detalle_usuario,
  put_detalle_usuario,
  getLast,
};
