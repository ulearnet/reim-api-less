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
    async function (error, results, fields) {
        if (error) throw error;
        await pool.end()
        pool.quit()
        if (results.length > 0) {
            var max = results.length - 1;
            var min = 0;
            const item = results[Math.floor(Math.random() * (max - min)) + min];

            await res.status(200).json(item);
        } else {
            await res.status(404).json(null);
        }
    }
  );

};

module.exports = {
  get_itemAleatorio
};
