const { pool } = require("../dbcnx");
const md5 = require("md5");

const put_item_alt = async (req, res) => {
  const { indice, idlaternativa, orden, escorrecto, ITEM_IdItem } = req.body;

  await pool.query(
    `insert into item_alt (indice, idlaternativa, orden, escorrecto, ITEM_IdItem)
         values (?, ?, ?, ?, ?)`,
    [indice, idlaternativa, orden, escorrecto, ITEM_IdItem],
    function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results.insertId);
    }
  );
};

const get_item_alts = async (req, res) => {
  const { indice, idlaternativa, orden, escorrecto, ITEM_IdItem } = req.body;

  let filterQuery = "";

  if (indice) filterQuery += " and indice = " + indice;
  if (idlaternativa) filterQuery += " and idlaternativa = " + idlaternativa;
  if (orden) filterQuery += " and orden = " + orden;
  if (escorrecto) filterQuery += " and escorrecto = " + escorrecto;
  if (ITEM_IdItem) filterQuery += " and ITEM_IdItem = " + ITEM_IdItem;

  await pool.query(
    `select (indice, idlaternativa, orden, escorrecto, ITEM_IdItem)
         from item_alt
         where 1 = 1 ` + filterQuery,
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json(null);
      }
    }
  );
};

const get_item_alt_by_item= async (req,res) =>{
  const{ITEM_IdItem} = req.body;

  await pool.query(
        `select idlaternativa
         from item_alt
         where ITEM_IdItem = ?`,
         [ITEM_IdItem],
         function(error, results, fields){
            if (error) throw error;
            if(results.length > 0){
                const respuesta = results[0];
                res.status(200).json(respuesta);
            }else{
                res.status(404).json(null);
            }
        }
  );
};

const get_item_alt_order = async (req, res) => {
  const id = req.params.id;
  await pool.query(
    `SELECT A.ITEM_IdItem,
            A.idlaternativa,
            B.Pregunta,
            C.txt_alte
      FROM item_alt AS A
      JOIN item AS B ON A.ITEM_IdItem = B.IdItem
      JOIN alternativa AS C ON A.idlaternativa = C.idlaternativa
      WHERE A.escorrecto = "1" AND B.reim_id = ?
      ORDER BY rand() LIMIT 8
                                       `,
     [id],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        const Preg = results;
        res.status(200).json(Preg);
      } else {
        res.status(404).json(null);
      }
    }
  );
};


module.exports = {
  put_item_alt,
  get_item_alts,
  get_item_alt_by_item,
  get_item_alt_order
};
