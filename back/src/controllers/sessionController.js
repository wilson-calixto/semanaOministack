const connection = require("../database/connection")

module.exports = {

    async create(req, res) {
        const {ong_id} = req.body
        
        const ong = await connection('ongs')
        .where('id',ong_id)
        .select('name')
        .first()

        if(!ong){
            return res.status(400).json({error: 'No ong found with this id.'})
        }
        
        return res.json(ong)
    },
   


}