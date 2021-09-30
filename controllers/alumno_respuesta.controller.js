const {pool} = require("../dbcnx");
const md5 = require("md5");

const put_alumno_respuesta_actividad2 = async (req, res) => {
    const {
        id_per, id_user, id_reim, id_actividad, id_elemento, datetime_touch, Eje_X, Eje_Y, correcta, resultado
    } = req.body;

    await pool.query(
        `insert into alumno_respuesta_actividad (id_per, id_user, id_reim, id_actividad, id_elemento, datetime_touch,
                                                 Eje_X, Eje_Y, correcta, resultado)
         values (?, ?, ?, ?, ?,
                 ?, ?, ?, ?, ?)`,
        [
            id_per, id_user, id_reim, id_actividad, id_elemento, datetime_touch, Eje_X, Eje_Y, correcta, resultado
        ],
        async function (error, results, fields) {
            if (error) throw error;
            await pool.end()
            pool.quit()
            await res.status(200).json(results.insertId);
        }
    );

};


const put_alumno_respuesta_actividad = async (req, res) => {
    const {
        id_per,
        id_user,
        id_reim,
        id_actividad,
        id_elemento,
        datetime_touch,
        Eje_X,
        Eje_Y,
        Eje_Z,
        correcta,
        resultado,
        Tipo_Registro
    } = req.body;

    await pool.query(
        `insert into alumno_respuesta_actividad (id_per, id_user, id_reim, id_actividad, id_elemento, datetime_touch,
                                                 Eje_X, Eje_Y, Eje_Z, correcta, resultado, Tipo_Registro)
         values (?, ?, ?, ?, ?,
                 ?, ?, ?, ?, ?, ?, ?)`,
        [
            id_per, id_user, id_reim, id_actividad, id_elemento, datetime_touch, Eje_X, Eje_Y, Eje_Z, correcta, resultado, Tipo_Registro
        ],
        async function (error, results, fields) {
            if (error) throw error;
            await pool.end()
            pool.quit()
            await res.status(200).json(results.insertId);
        }
    );
};

const get_colab_spacemath = async (req, res) => {
    const {id_elemento} = req.body;
    await pool.query(
        `select sum(resultado) as counter
         from alumno_respuesta_actividad
         where id_elemento = ?
        `,
        [id_elemento],
        async function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                console.log(results[0]);
                await pool.end()
                pool.quit()
                await res.status(200).json(results[0]);
            } else {
                await pool.end()
                pool.quit()
                await res.status(404).json(null);
            }
        }
    );

};

const get_tienda_spacemath = async (req, res) => {
    const {id_user} = req.body;
    await pool.query(
        `SELECT sum(id_elemento IN (500018, 500022, 500105, 500032)) +
                (SELECT sum(resultado)
                 FROM alumno_respuesta_actividad
                 WHERE (id_elemento BETWEEN 500035 AND 500046) and id_user = ?) as '@'
         FROM alumno_respuesta_actividad
         WHERE id_user = ?
        `,
        [id_user, id_user],
        async function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                console.log(results[0]);
                await pool.end()
                pool.quit()
                await res.status(200).json(results[0]);
            } else {
                await pool.end()
                pool.quit()
                await res.status(404).json(null);
            }
        }
    );
};


const get_count_element_alumno_respuesta_actividad = async (req, res) => {
    const {
        id_elemento,
        id_user,
    } = req.body;
    await pool.query(
        `SELECT Count(id_elemento) as cantidad
         FROM alumno_respuesta_actividad
         WHERE id_elemento = ?
           AND id_user = ?
        `,
        [id_elemento, id_user],
        async function (error, results, fields) {
            if (error) throw error;
            await pool.end()
            pool.quit()
            if (results.length > 0) {
                await res.status(200).json(results[0]);
            } else {
                await res.status(404).json(null);
            }
        }
    );
    await pool.end()
    pool.quit()
};

module.exports = {
    put_alumno_respuesta_actividad2,
    put_alumno_respuesta_actividad,
    get_colab_spacemath,
    get_tienda_spacemath,
    get_count_element_alumno_respuesta_actividad
};
