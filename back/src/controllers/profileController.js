const connection = require("../database/connection")

module.exports = {


    async index(req, res) {
        const ong_id = req.header.authorization
        const incidents = await connection('incident')
        .where('ong_id',ong_id)
        .select('*')
        
        return res.status(200).send(incidents)
    
    },


}