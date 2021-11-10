const { pool } = require("../dbcnx");
const md5 = require("md5");

const put_inventario_reim = async (req, res) => {
    const {
        sesion_id,
        id_elemento,
        cantidad,
        datetime_creacion,
    } = req.body;

    await pool.query(
        `insert into inventario_reim (sesion_id, id_elemento, cantidad, datetime_creacion)
         values (?, ?, ?, ?)`,
        [
            sesion_id,
            id_elemento,
            cantidad,
            datetime_creacion,
        ],
        async function (error, results, fields) {console.log(sesion_id, id_elemento, cantidad, datetime_creacion)
            if (error) throw error;
            await pool.end()
            pool.quit()
            await res.status(200).json(results.insertId);
        }
    );

};


const get_inventario_reim = async (req, res) => {
    const { sesion_id } = req.body;

    let filterQuery = "";

    if (sesion_id) filterQuery += `sesion_id LIKE "`+sesion_id+`-%" AND ((id_elemento = 203000 AND datetime_creacion = (SELECT MAX(datetime_creacion) FROM inventario_reim WHERE id_elemento = 203000 AND sesion_id LIKE "`+sesion_id+`-%"))
                                   OR (id_elemento = 203001 AND datetime_creacion = (SELECT MAX(datetime_creacion) FROM inventario_reim where id_elemento = 203001 AND sesion_id LIKE "`+sesion_id+`-%"))
                                   OR (id_elemento = 203002 AND datetime_creacion = (SELECT MAX(datetime_creacion) FROM inventario_reim where id_elemento = 203002 AND sesion_id LIKE "`+sesion_id+`-%"))
                                   OR (id_elemento = 203003 AND datetime_creacion = (SELECT MAX(datetime_creacion) FROM inventario_reim where id_elemento = 203003 AND sesion_id LIKE "`+sesion_id+`-%"))
                                   OR (id_elemento = 203004 AND datetime_creacion = (SELECT MAX(datetime_creacion) FROM inventario_reim where id_elemento = 203004 AND sesion_id LIKE "`+sesion_id+`-%"))
                                   OR (id_elemento = 203029 AND datetime_creacion = (SELECT MAX(datetime_creacion) FROM inventario_reim where id_elemento = 203029 AND sesion_id LIKE "`+sesion_id+`-%"))
                                   OR (id_elemento = 203030 AND datetime_creacion = (SELECT MAX(datetime_creacion) FROM inventario_reim where id_elemento = 203030 AND sesion_id LIKE "`+sesion_id+`-%"))
                                   OR (id_elemento = 203031 AND datetime_creacion = (SELECT MAX(datetime_creacion) FROM inventario_reim where id_elemento = 203031 AND sesion_id LIKE "`+sesion_id+`-%"))
                                   OR (id_elemento = 203032 AND datetime_creacion = (SELECT MAX(datetime_creacion) FROM inventario_reim where id_elemento = 203032 AND sesion_id LIKE "`+sesion_id+`-%"))
                                   OR (id_elemento = 203033 AND datetime_creacion = (SELECT MAX(datetime_creacion) FROM inventario_reim where id_elemento = 203033 AND sesion_id LIKE "`+sesion_id+`-%"))
                                   OR (id_elemento = 203034 AND datetime_creacion = (SELECT MAX(datetime_creacion) FROM inventario_reim where id_elemento = 203034 AND sesion_id LIKE "`+sesion_id+`-%"))
                                   OR (id_elemento = 203035 AND datetime_creacion = (SELECT MAX(datetime_creacion) FROM inventario_reim where id_elemento = 203035 AND sesion_id LIKE "`+sesion_id+`-%"))
                                   )`;

    await pool.query(
        `SELECT id_elemento,
               cantidad
        FROM inventario_reim
        WHERE `+ filterQuery,

        async function (error, results, fields) {
            if (error) throw error;
            await pool.end()
            pool.quit()
            if (results.length > 0) {
                await res.status(200).json(results);
            } else {
                await res.status(404).json(null);
            }
        }
    );

};

const get_cantidad_elemento = async (req, res) => {
    const { usuario_id, id_elemento } = req.body;

    console.log(usuario_id,id_elemento);
    await pool.query(
        `SELECT cantidad FROM inventario_reim i,asigna_reim_alumno a, usuario u where i.sesion_id = a.sesion_id && a.usuario_id = u.id and
        u.id = ?
        and id_elemento = ? and datetime_creacion = (select max(datetime_creacion)) order by datetime_creacion desc;`,
        [usuario_id,id_elemento],

        async function (error, results, fields) {
            if (error) throw error;
            await pool.end()
            pool.quit()
            if (results.length > 0) {
                const cantidad_maxima = results[0];

                await res.status(200).json(cantidad_maxima);
            } else {
                await res.status(404).json(null);
            }
        }
    );
};


module.exports = {
    put_inventario_reim,
    get_inventario_reim,
    get_cantidad_elemento,
};
