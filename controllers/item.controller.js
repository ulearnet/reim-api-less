const { pool } = require("../dbcnx");
const md5 = require("md5");

const get_itemAleatorio = async (req, res) => {
  const { reim_id, objetivo_aprendizaje_id } = req.body;

  await pool.query(
    `select *                       
    from
    item
    where reim_id = ?
    and objetivo_aprendizaje_id = ?  
     `,
    [reim_id, objetivo_aprendizaje_id],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        var max = results.length - 1;
        var min = 0;
        const item = results[Math.floor(Math.random() * (max - min)) + min];

        res.status(200).json(item);
      } else {
        res.status(404).json(null);
      }
    }
  );
};

module.exports = {
  get_itemAleatorio
};