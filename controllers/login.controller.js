const { pool } = require("../dbcnx");
const md5 = require("md5");

const login = async (req, res) => {
  const { loginame, password} = req.body;
  const reim_id = req.params.reim_id;

  await pool.query(
    `select id, concat(nombres, apellido_paterno, apellido_materno) as nombre from usuario u 
     where username = ? 
     and password = ? 
     and id in (select usuario_id from pertenece where usuario_id = u.id 
                and nivel_id in (select nivel_id from asigna_reim where reim_id = ${reim_id})
                and letra_id in (select letra_id from asigna_reim where reim_id = ${reim_id} )
                and colegio_id in (select colegio_id from asigna_reim where reim_id = ${reim_id}))`,
    [loginame, password],
    async function (error, results, fields) {
        if (error) throw error;
        await pool.end()
        pool.quit()
        if (results.length > 0) {
            const userLoged = results[0];

            await res.status(200).json(userLoged);
        } else {
            await res.status(404).json(null);
        }
    }
  );

};


module.exports = {
  login
};
