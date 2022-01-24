const {db} = require('../config/database');

module.exports = {
    getData: (req,res) => {

        let getKategori = `SELECT * FROM kategori_reseps;`

        db.query(getKategori,(err,result) => {
            if(err){
                res.status(500).send({
                    message: `failed get kategori`,
                    success: false,
                    error: err
                })
            }

            res.status(200).send({
                message: 'success get kategori',
                success: true,
                dataKategori: result
            })
        })
    }
}