const connection = require("../database/connection")

module.exports = {
    async index(req, res) {
    const {page = 1} = req.query;

    const [count] = await connection('incident').count()

    const incidents = await connection('incident')
    .join('ongs','ongs.id','=','incidents.ongs_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
    ])

    res.header('X-Total-Count',count['count("*")'])

    return res.json(incidents)
    },
    
    async create(req, res) {
        const ong_id = req.header.authorization
        const { title, description, vaule } = req.body;
        // const id = crypto.randomBytes(4).toString('HEX');
        const [id] = await connection('incident').insert({
            id,
            title,
            description,
            vaule,
            ong_id
        })
        return res.json({ id })
    },
    async delete(req, res) {
        const ong_id = req.header.authorization
        const {id} = req.params;
        const incident = await connection('incident')
        .where('id',id)
        .select('ong_id')
        .first()
        if(incident.ong_id!== ong_id){
            return res.status(401).json({error: 'Operation not permited.'})
        }
        await connection('incidents').where('id',id).delete();

        return res.status(204).send()
    
    },


}