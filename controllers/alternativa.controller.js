const { pool } = require("../dbcnx");
const md5 = require("md5");

const get_alternativa = async (req, res) => {
    const {idlaternativa} = req.body;
    await pool.query(
        `select
                 txt_alte
         from
                alternativa
         where idlaternativa = ?
            `,
        [idlaternativa],
        function (error, results, fields) {
          if (error) throw error;
          
          const respuesta = results[0]
          res.status(200).json(respuesta);
        }
    );
}

module.exports = {
  get_alternativa
};