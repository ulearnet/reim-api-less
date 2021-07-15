const { pool } = require("../dbcnx");
const md5 = require("md5");

const comprar = async (req, res) => {
    const {usuarioenvia_id, usuariorecibe_id, elemento_id, catalogo_id, cantidad, datetime_transac, estado } = req.body;
  
    await pool.query(
      ` 
        insert into transaccion_reim(usuarioenvia_id, usuariorecibe_id, elemento_id, catalogo_id, cantidad, datetime_transac, estado)
        values (?, ?, ?, ?, ?, ?, ?); 
      `,
      [usuarioenvia_id, usuariorecibe_id, elemento_id, catalogo_id, cantidad, datetime_transac, estado],
      function (error, results, fields) {
        if (error) throw error;
        const OK = "OK";
        res.status(200).json(OK);
      }
    );
  };

const get_ultimo_id = async (req,res) => {
  await pool.query(
    `SELECT id
    from transaccion_reim
    where id = (select max(id) from transaccion_reim)`
    ,
    function (error, results, fields) {
      if (error) throw error;
      const last = results[0].id;
      res.status(200).json(last);
    }
  );
};

const get_regalos = async (req,res) =>{
  const { usuarioenvia_id} = req.body;

  await pool.query(
    `SELECT * from transaccion_reim 
    where estado = 2 
    and 
    catalogo_id in (SELECT id from catalogo_reim where sesion_id like "?-204-%" and precio = 0);`
    ,[usuarioenvia_id],
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

const get_ventas = async (req,res) =>{
  const {usuarioenvia_id} = req.body;

  await pool.query(
    `SELECT * from transaccion_reim 
    where estado = 0 
    and 
    catalogo_id in (SELECT id from catalogo_reim where sesion_id like "?-204-%" and precio != 0);`
    ,[usuarioenvia_id],
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

const updateEstadoVentas = async (req,res) =>{
  const { usuarioenvia_id, estado} = req.body;
  console.log(usuarioenvia_id);
  console.log(estado);
  await pool.query(
    `
     update transaccion_reim 
     set estado = ?
     where estado = 0 
     and 
     catalogo_id in (SELECT id from catalogo_reim where sesion_id like "?-204-%" and precio != 0);`
    ,[estado, usuarioenvia_id],
    function (error, results, fields) {
      if (error) throw error;
      const ok = "OK"
      res.status(200).json(ok);
    }
  );
};

const updateEstadoRegalos = async (req,res) =>{
    const { usuarioenvia_id, estado} = req.body;
    console.log(usuarioenvia_id);
    console.log(estado);
    await pool.query(
      `
       update transaccion_reim 
       set estado = ?
       where estado = 2 
       and 
       catalogo_id in (SELECT id from catalogo_reim where sesion_id like "?-204-%" and precio = 0);`
      ,[estado, usuarioenvia_id],
      function (error, results, fields) {
        if (error) throw error;
        const ok = "OK"
        res.status(200).json(ok);
      }
    );
  
};



module.exports = {
    comprar,
    get_ultimo_id,
    get_regalos,
    get_ventas,
    updateEstadoVentas,
    updateEstadoRegalos
};