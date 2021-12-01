const {pool} = require("../dbcnx");

const get_alumno_pregunta_actividad = async (req, res) => {
    const {id_reim} = req.body;
    await pool.query(
        `SELECT item.Pregunta as pregunta, 
        item.objetivo_aprendizaje_id as objetivo_aprendizaje, 
        alternativa.txt_alte as txt_alte from item 
        inner join item_alt on item.IdItem = item_alt.ITEM_IdItem 
        inner join alternativa on item_alt.idlaternativa = alternativa.idlaternativa
        where item.reim_id = ?`,
        [id_reim],
        function (error, results, fields) {
            if (error) throw error;

            res.status(200).json(results.length > 0 ? {
                ListaDePreguntas: results
            } : {
                mensaje: "no se encontraron preguntas",
                id: 1
            })
        }
    );
};

module.exports = {
    get_alumno_pregunta_actividad
};
