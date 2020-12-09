const {pool} = require('../dbcnx')
const md5 = require('md5')

const addtiempoxactividad = async (req, res) => {

    const {inicio, final, causa, usuario_id, reim_id, actividad_id} = req.body


    await pool.query(`insert into tiempoxactividad (inicio, final, causa, usuario_id, reim_id, actividad_id) 
                      values (
                              ?, ?, ?, ?, ?, ?
                             )`,[inicio, final, causa, usuario_id, reim_id, actividad_id],function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results.insertId)
    })


}

const updatetiempoxactividad = async (req, res) => {
    const id_tiempoactividad = req.params.id;
    const {inicio, final, causa, usuario_id, reim_id, actividad_id } = req.body


    await pool.query(`update 
                            tiempoxactividad 
                      set
                          inicio = ?, final= ?, causa= ?, usuario_id= ?, reim_id= ?, actividad_id= ?                            
                      where
                          id = ?
                      `,[inicio, final, causa, usuario_id
                       , reim_id, actividad_id, id_tiempoactividad],function (error, results, fields) {
        if (error) throw error;
        res.status(200).json(results.insertId)
    })


}

module.exports = {
    addtiempoxactividad, updatetiempoxactividad
}
