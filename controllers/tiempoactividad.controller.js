const {pool} = require('../dbcnx')
const md5 = require('md5')

const addtiempoxactividad = async (req, res) => {
    const {inicio, final, causa, usuario_id, reim_id, actividad_id} = req.body

    await pool.query(`insert into tiempoxactividad (inicio, final, causa, usuario_id, reim_id, actividad_id) 
                      values (
                              ?, ?, ?, ?, ?, ?
                             )`,[inicio, final, causa, usuario_id, reim_id, actividad_id],async function (error, results, fields) {
        if (error) throw error;
        await pool.end()
        pool.quit()
        await res.status(200).json(results.insertId)
    })

}

const updatetiempoxactividad = async (req, res) => {
    const id_tiempoactividad = req.params.id;
    const {inicio, final, causa, usuario_id, reim_id, actividad_id } = req.body

    await pool.query(`update tiempoxactividad set
                          inicio = ?, final= ?, causa= ?, usuario_id= ?, reim_id= ?, actividad_id= ?                            
                      where
                          id = ?
                      `,[inicio, final, causa, usuario_id, reim_id, actividad_id, id_tiempoactividad],async function (error, results, fields) {
        if (error) throw error;
        await pool.end()
        pool.quit()
        await res.status(200).json(results.insertId)
    })
}

const updatetiempoxactividadfinal = async (req, res) => {
    const id_tiempoactividad = req.params.id;
    const {final} = req.body

    await pool.query(`update tiempoxactividad set final= ? where id = ? `,[final, id_tiempoactividad],async function (error, results, fields) {
        if (error) throw error;
        await pool.end()
        pool.quit()
        await res.status(200).json("OK")
    })
}

module.exports = {
    addtiempoxactividad, updatetiempoxactividad, updatetiempoxactividadfinal
}
