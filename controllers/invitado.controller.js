const { pool } = require("../dbcnx");
const md5 = require("md5");

const InsertGuest = async (req, res) => {
    const { nombres, username } = req.body;

    await pool.query(
        `insert into usuario (nombres,username,tipo_usuario_id) values (?,?,3);`,
        [nombres, username],
        async function (error, results, fields) {console.log(nombres,username)
            if (error) throw error;
            await pool.end()
            pool.quit()
            console.log(results)
            if (results.insertId > 0) {
                await res.status(200).json(results.insertId);
            } else {
                await res.status(404).json(null);
            }
        }
    );
};
const guest_a_colegio = async (req, res) => {
    const { fecha, usuario_id,colegio_id,nivel_id ,letra_id} = req.body;
    await pool.query(
        `insert into pertenece(fecha,usuario_id,colegio_id,nivel_id,letra_id) values(?,?,?,?,?);`,
        [fecha, usuario_id,colegio_id,nivel_id ,letra_id],
        async function (error, results, fields) {
            if (error) throw error;
            await pool.end()
            pool.quit()
            if (results.length > 0) {
                await res.status(200).json("ok");
            } else {
                await res.status(404).json(null);
            }
        }
    );
};
const updatear_usuario = async (req, res) => {
    const { nombres, username,id} = req.body;
    await pool.query(
        `update usuario set nombres = ?, username = ? where id = ?;`,
        [ nombres, username,id],
        async function (error, results, fields) {
            if (error) throw error;
            await pool.end()
            pool.quit()
            if (results.length > 0) {
                await res.status(200).json("ok");
            } else {
                await res.status(404).json(null);
            }
        }
    );
};






module.exports = {
    InsertGuest,updatear_usuario,guest_a_colegio
};