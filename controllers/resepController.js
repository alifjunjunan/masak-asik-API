const {db} = require('../config/database');

module.exports = {
    getData: (req,res) => {

        let id = req.query.id;
        let limit = req.query.limit;
        let getResep = `SELECT r.*, kr.kategori FROM reseps as r 
        JOIN kategori_reseps as kr on r.idkategori_resep = kr.idkategori_resep 
        ${id ? `WHERE idresep=${db.escape(id)}` : ``} 
        ORDER BY r.idresep DESC ${limit ? `LIMIT ${limit}` : ``};`;

        db.query(getResep,(errResep,resultResep) => {
            if(errResep){
                res.status(500).send({
                    message: `failed get resep`,
                    success: false,
                    error: errResep
                })
            }

            let getBahan = `SELECT * FROM bahan_reseps;`;
            db.query(getBahan,(errBahan,resultBahan) => {
                if(errBahan){
                    res.status(500).send({
                        message: `failed get bahan resep`,
                        success: false,
                        error: errBahan
                    })
                }

                resultResep.forEach((item,index) => {
                    item.bahan = [];
                    resultBahan.forEach((item2,index) => {
                        if(item2.idresep == item.idresep){
                            delete item2.idresep;
                            delete item2.idbahan_resep;
                            item.bahan.push(item2.bahan);
                        }
                    })
                })

                let getInstruksi = `SELECT * FROM instruksi_reseps;`;
                db.query(getInstruksi,(errIns,resultIns) => {
                    if(errIns){
                        res.status(500).send({
                            message: `failed get instruksi resep`,
                            success: false,
                            error: errIns
                        })
                    }

                    resultResep.forEach((item3,index) => {
                        item3.instruksi = [];
                        resultIns.forEach((item4,index) => {
                            if(item4.idresep == item3.idresep){
                                delete item4.idinstruksi_resep;
                                delete item4.idresep;

                                item3.instruksi.push(item4)
                            }
                        })
                    })

                    res.status(200).send({
                        message: `success get resep`,
                        success: true,
                        dataResep: resultResep
                    })

                })

            })
        })
    }
}