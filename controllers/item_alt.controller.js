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

module.exports = {
  put_item_alt,
  get_item_alts,
};
