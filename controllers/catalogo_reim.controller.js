const {pool} = require("../dbcnx");
const md5 = require("md5");

const get_ultimo_id = async (req, res) => {
    await pool.query(
        `SELECT *
         from catalogo_reim
         where id = (select max(id) from catalogo_reim)`
        ,
        async function (error, results, fields) {
            if (error) throw error;
            await pool.end()
            pool.quit()
            await res.status(200).json(results[0].id);
        }
    );

};

const update = async (req, res) => {
    const {
        id, cantidad
    } = req.body;

    await pool.query(
        `
            update catalogo_reim
            set cantidad = ?
            where id = ?;
        `
        , [cantidad, id]
        , async function (error, results, fields) {
            if (error) throw error;
            const OK = "OK";
            await pool.end()
            pool.quit()
            await res.status(200).json(OK);
        }
    );

}

const get_usuarios_necesitados = async (req, res) => {
    const {
        reim_id,id
    } = req.body;

    await pool.query(
        `SELECT *
         from catalogo_reim
         where sesion_id like "%-?-%"
           and precio = 0
           and sesion_id not like "?-%"
           and cantidad > 0
         order by datetime_realiza ASC`
        , [reim_id,id]
        , async function (error, results, fields) {
            if (error) throw error;
            await pool.end()
            pool.quit()
            if (results.length == 0) {
                await res.status(400).json(null);
            } else if (results.length > 0) {
                await  res.status(200).json(results);
            }
        }
    );

}

const get_usuarios_catalogo = async (req, res) => {
    const {
        reim_id, id
    } = req.body;

    await pool.query(
        `SELECT *
         from catalogo_reim
         where sesion_id like "%-?-%"
           and precio != 0 and cantidad != 0 and sesion_id not like "?-%"
         ORDER BY precio ASC`,
        [reim_id,id]
        , async function (error, results, fields) {
            if (error) throw error;
            await pool.end()
            pool.quit()
            if (results.length == 0) {
                await res.status(400).json(null);
            } else if (results.length > 0) {
                await res.status(200).json(results);
            }
        }
    );

}

const get_existe = async (req, res) => {
    const {
        id, id_elemento
    } = req.body;



    await pool.query(
        `SELECT id, cantidad
         from catalogo_reim
         where sesion_id like "?-204-%"
           and precio != 0 and id_elemento = ?`,
        [id, id_elemento]
        , async function (error, results, fields) {
            if (error) throw error;
            await pool.end()
            pool.quit()
            if (results.length == 0) {

                await res.status(400).json(false);
            } else if (results.length > 0) {
                await res.status(200).json(results[0].id + "-" + results[0].cantidad);
            }
        }
    );

}

const update2 = async (req, res) => {
    const {
        id, cantidad, precio
    } = req.body

    await pool.query(
        `
            update catalogo_reim
            set cantidad = ?,
                precio = ?
            where id = ?;
        `
        , [cantidad, precio, id]
        , async function (error, results, fields) {
            if (error) throw error;
            const OK = "OK";
            await pool.end()
            pool.quit()
            await res.status(200).json(OK);
        }
    );

}

const add = async (req, res) => {
    const {
        id, sesion_id, id_elemento, cantidad, precio, datetime_realiza
    } = req.body

    await pool.query(
        `insert into catalogo_reim(id, sesion_id, id_elemento, cantidad, precio, datetime_realiza)
         values (?, ?, ?, ?, ?, ?);
        `
        , [id, sesion_id, id_elemento, cantidad, precio, datetime_realiza]
        , async function (error, results, fields) {
            if (error) throw error;
            const OK = "OK";
            await pool.end()
            pool.quit()
            await res.status(200).json(OK);
        }
    );

}

const get_existe_sesion = async (req, res) => {
    const {
        sesion_id, id_elemento
    } = req.body;


    await pool.query(
        `SELECT *
         FROM catalogo_reim
         where sesion_id = ?
           and id_elemento = ?
           and precio = 0`,
        [sesion_id, id_elemento]
        , async function (error, results, fields) {
            if (error) throw error;


            await pool.end()
            pool.quit()
            if (results.length == 0) {
                await res.status(400).json(false);
            } else if (results.length > 0) {
                await res.status(200).json(true);
            }
        }
    );

}

const get_by_id = async (req, res) => {
    const {
        id_elemento, id
    } = req.body;
    await pool.query(
        `SELECT *
         FROM catalogo_reim
         where sesion_id like "?-204-%"
           and id_elemento = ?
           and precio != 0`,
        [id, id_elemento]
        , async function (error, results, fields) {
            if (error) throw error;

            await pool.end()
            pool.quit()
            if (results.length == 0) {
                await res.status(400).json(false);
            } else if (results.length > 0) {
                await res.status(200).json(results[0]);
            }
        }
    );

}
const get_usuarios_catalogo_1 = async (req, res) => {
    const {id_reim} = req.body;
    await pool.query(
        `SELECT i.id as id_catalogo ,u.id,u.nombres,i.id_elemento,i.precio FROM asigna_reim_alumno a,catalogo_reim i, usuario u where  i.sesion_id = a.sesion_id && a.usuario_id = u.id and a.reim_id = ? and
         datetime_realiza = (select max(datetime_realiza)) order by datetime_realiza desc;`,
        [id_reim]
        , async function (error, results, fields) {
            if (error) throw error;

            await pool.end()
            pool.quit()
            if (results.length == 0) {
                await res.status(400).json(false);
            } else if (results.length > 0) {
                await res.status(200).json(results);
            }
        }
    );
}

const eliminar_id = async (req, res) => {
    const {id} = req.body;
    await pool.query(
        `DELETE from catalogo_reim where id = ?;`,
        [id]

        , async function (error, results, fields) {
            console.log(id)
            if (error) throw error;
            const OK = "OK";
            await pool.end()
            pool.quit()
            await res.status(200).json(results);
        }
    );
}




module.exports = {
    eliminar_id,
    get_ultimo_id,
    update,
    get_usuarios_necesitados,
    get_usuarios_catalogo,
    get_existe,
    update2,
    add,
    get_existe_sesion,
    get_by_id,
    get_usuarios_catalogo_1
};
