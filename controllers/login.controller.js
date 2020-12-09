const {pool} = require('../dbcnx')
const md5 = require('md5')

const getTokenLoged = (req) => {
    const {authorization} = req.headers

    const accessToken =
        authorization &&
        authorization.startsWith('Bearer ') &&
        authorization.slice('Bearer '.length)

    return accessToken
}
const getUserLoged = async (req) => {
    const token = getTokenLoged(req)
    return await getUserByToken(token)
}
const getUserByToken = async (token) => {
    const response = await pool.query(`select id_usu                   as id,
                                              usu_nombre,
                                              usu_pat,
                                              usu_mat,
                                              usu_mail,
                                              id_suc_cli,
                                              concat(usuarios.usu_nombre, ' ', usuarios.usu_pat, ' ',
                                                     usuarios.usu_mat) as fullname,
                                              id_perfil
                                       from usuarios
                                                
                                       where accesstoken = $1
    `, [token])

    //traemos los permisos del usuario
    const userLoged = response.rows[0]
    if (userLoged) {
        const permisosQuery = await pool.query(`select id_permiso::integer
                                                from perfilusu_has_permisos
                                                where id_perfil_usuario = $1`, [userLoged.id_perfil])


        userLoged.permisos = permisosQuery.rows.map(x => (x.id_permiso))
    }
    return userLoged

}
const checkUserAccess = async (id_user, id_permiso) => {

    const accessQuery = await pool.query(`select php.id_permiso
                                          from perfilusu_has_permisos php
                                                   inner join perfil_usuario pu on pu.id_perfil = php.id_perfil_usuario
                                                   inner join usuarios u on pu.id_perfil = u.id_perfil
                                          where php.id_permiso = $1
                                            and u.id_usu = $2 `, [id_permiso, id_user])
    return accessQuery.rowCount > 0
}

const login = async (req, res) => {


    /*
    const makeToken = () => {
        const largo = 15
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        for (let i = 0; i < largo; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }*/

    const {loginame, password} = req.body
    /*
        let filter = ""
        if (id_perfil) filter += " and id_perfil= " + id_perfil
        const response = await pool.query(`select
                                             id_usu                   as id,
                                             id_suc_cli,
                                             usu_nombre,
                                             usu_login,
                                             usu_pat,
                                             usu_mat,
                                             usu_mail,
        usu_fono,
                                             concat(usuarios.usu_nombre, ' ', usuarios.usu_pat, ' ',
                                                    usuarios.usu_mat) as fullname
                                         from
                                             usuarios
                                         where
                                               lower(usu_login) = $1
                                           and usu_pass = $2
                                           and eliminado = false
                                            ${filter}
                                           `, [loginame.toLowerCase(), md5(password)])*/

    await pool.query(`select
                                        id,
                                        concat(nombres, apellido_paterno, apellido_materno) as nombre
                                     from
                                         usuario
                                     where username = ?
                                     and password = ?  
                                       `,[loginame, password],function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {

            //usuario existe
            //const token = makeToken()
            const userLoged = results[0]


            //cargamos token en la bd
            /*await pool.query(`update usuarios
                              set accesstoken=$1
                              where id_usu = $2`, [token, userLoged.id])

            userLoged.accessToken = token*/

            res.json(userLoged)
        } else {
            return null
            //res.status(400).send('Acceso denegado')
        }
    })





}
const me = async (req, res) => {
    const {check_access} = req.query
    const accessToken = getTokenLoged(req)

    if (accessToken) {

        const userLoged = await getUserByToken(accessToken)
        let access_granted = true
        if (check_access) access_granted = await checkUserAccess(userLoged.id, check_access)
        if (userLoged && access_granted) res.status(200).json(userLoged)
        else res.status(401).send('Acceso denegado')

    } else res.status(401).send('Acceso denegado')
}

const changePass = async (req, res) => {
    const {authorization} = req.headers
    const {data} = req.body
    const {oldPass, newPass} = data

    const accessToken =
        authorization &&
        authorization.startsWith('Bearer ') &&
        authorization.slice('Bearer '.length)

    if (accessToken) {
        //validamos password antiguo
        const responseUserExist = await pool.query(`select id_usu
                                                    from usuarios
                                                    where accesstoken = $1
                                                      and usu_pass = $2
                                                      and eliminado = false `,
            [accessToken, oldPass])

        if (responseUserExist.rowCount > 0) {
            //cambiamos password
            const responseUserUpdatePass = await pool.query(`
                        update usuarios
                        set usu_pass=$1
                        where accesstoken = $2 `,
                [newPass, accessToken])

            res.status(200).send('OK')
        } else
            res.status(401).send('No es posible cambiar el password, clave o usuario incorrecto')
    } else
        res.status(401).send('No es posible cambiar el password, token de acceso inválido')

}

module.exports = {
    login, me, changePass, getTokenLoged, getUserByToken, getUserLoged
}
