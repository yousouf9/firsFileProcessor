const {Etisalat} = require('./etisalat');
const {insertData} = require('../InsertData');
const path  = require("path");
const {pool} = require('../startup/mySql')

const etisalatPath = async () => {

  const connect = await pool.getConnection();

    const folderPath = path.join(__dirname, '..', './taxaudit/etisalat/raw/sms')
    
    //await cache.clear("etisalat-sms");

    Etisalat.fetchSMS(folderPath);

    setInterval(async ()=>{

      const etisalat_sms = await cache.rpopAsync("etisalat-sms")

      if(etisalat_sms){
        try{
          let res = JSON.parse(etisalat_sms);
          //insertData("eti_sms", res, "", 1, connect)
          console.log(etisalat_sms)
        }catch(err){
          console.log(err)
        }
      }else{
        await connect.release();
      }

    }, 1000)
    


}

exports.etisalatPath = etisalatPath;