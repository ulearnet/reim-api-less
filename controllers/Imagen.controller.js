const { pool } = require("../dbcnx");
const md5 = require("md5");

const get_imagen_reim = async (req, res) => {
  const  reim_id = req.params.id;
  await pool.query(
    `SELECT i.idimagen, 
            i.nombre,
            i.imagen,
            i.id_elemento,
            i.descripcion,
            (SELECT imagen FROM imagen WHERE id_elemento = i.id_elemento AND descripcion IS NULL) as cuadro
        FROM imagen i
        LEFT JOIN `+"`Elem-REIM`"+ `er ON i.id_elemento = er.elemento_id
        WHERE er.reim_id = ? AND i.descripcion IS NOT NULL
        ORDER BY idimagen DESC limit 8
    `,
     [ reim_id],
     async function (error, results, fields) {
       if (error) throw error;
       await pool.end()
       pool.quit()
       if (results.length > 0) {
         const Resp = results;
         await res.status(200).json(Resp);
       } else {
         await res.status(404).json(null);
       }
     }
  );

};


module.exports = {
    get_imagen_reim,
  };