const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const dataToJson = require("data-to-json");
const {Etisalat} = require('../model/etisalatModel')
const {Mtn} = require('../model/mtnModel')
const {Glo} = require('../model/gloModel')
const {Airtel} = require('../model/airtelModel')

const {storage} = require('../util')

let upload = multer({storage: storage}).single('file');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Sample' });
});

router.get('/api/v1/deleteAll',  async (req, res) => {
   
      await Etisalat.deleteMany({});
      await Glo.deleteMany({});
      await Mtn.deleteMany({});
      await Airtel.deleteMany({});

      req.flash("success", "Database emptied!")
       res.location('/')
       res.redirect('/')

})


router.get('/api/v1/etisalat_data',  async (req, res) => {
   
  const result = await Etisalat.find({data_type:"etisalat_data"})
    res.json(result)

})
router.get('/api/v1/etisalat_voice',  async (req, res) => {
  const result = await Etisalat.find({data_type:"etisalat_voice"})
  res.json(result)
})
router.get('/api/v1/etisalat_sms',  async (req, res) => {
  const result = await Etisalat.find({data_type:"etisalat_sms"})
  res.json(result)
})
router.get('/api/v1/etisalat_voucher',  async (req, res) => {
  const result = await Etisalat.find({data_type:"etisalat_voucher"})
  res.json(result)
})

router.get('/api/v1/mtn_data',  async (req, res) => {
  const result = await Mtn.find({data_type:"mtn_data"})
  res.json(result)
})
router.get('/api/v1/mtn_voice',  async (req, res) => {
  const result = await Mtn.find({data_type:"mtn_voice"})
  res.json(result)
})
router.get('/api/v1/mtn_sms',  async (req, res) => {
  const result = await Mtn.find({data_type:"mtn_sms"})
  res.json(result)
})
router.get('/api/v1/mtn_voucher',  async (req, res) => {
  const result = await Mtn.find({data_type:"mtn_voucher"})
  res.json(result)
})
router.get('/api/v1/airtel_data',  async (req, res) => {
  const result = await Airtel.find({data_type:"airtel_data"})
  res.json(result)
})
router.get('/api/v1/airtel_voice',  async (req, res) => {
  const result = await Airtel.find({data_type:"airtel_voice"})
  res.json(result)
})
router.get('/api/v1/airtel_sms',  async (req, res) => {
  const result = await Airtel.find({data_type:"airtel_sms"})
  res.json(result)
})
router.get('/api/v1/airtel_voucher',  async (req, res) => {
  const result = await Airtel.find({data_type:"airtel_voucher"})
  res.json(result)
})
router.get('/api/v1/glo_data',  async (req, res) => {
  const result = await Glo.find({data_type:"glo_data"})
  res.json(result)
})
router.get('/api/v1/glo_voice',  async (req, res) => {
  const result = await Glo.find({data_type:"glo_voice"})
  res.json(result)
})
router.get('/api/v1/glo_sms',  async (req, res) => {
  const result = await Glo.find({data_type:"glo_sms"})
  res.json(result)
})
router.get('/api/v1/glo_voucher',  async (req, res) => {
  const result = await Glo.find({data_type:"glo_voucher"})
  res.json(result)
})

router.post('/api/v1/sendFile',  async (req, res) => {

  upload(req,res, async function(err){
      if(err){
           res.json({error_code:401,err_desc:err});
           return;
      }
      if(!req.file){
          res.json({error_code:404,err_desc:"File not found!"});
          return;
      }

      if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'txt'){
    
          const directory = path.join(`${__dirname}`, `../public/temp/`)
          const txtfile = path.join(`${__dirname}`, `../public/temp/${req.file.filename}`)
          const dataInJSON = dataToJson.csv({ filePath: txtfile }).toJson();
      

          const isInserted = await inputDataType(dataInJSON, req.body.data_type);
          if(isInserted){
            
            deleteAllTempFiles(directory);

            req.flash('success', 'Successfully uploaded')
            res.location('/')
            res.redirect('/')
            return  
          }else{
            deleteAllTempFiles(directory);

            req.flash('error', "file not uploaded!, Please check file type and try again")
            res.location('/')
            res.redirect('/')
            return 
          }

      
        
      } else {
        req.flash('error', "File extension type not supported")
        res.location('/')
        res.redirect('/')
        return 
      }

  })

});


async function inputDataType(dataInJSON, datatype){
    
  if(typeof  datatype !== 'string'){
    console.log( datatype);
    return false
  }

  if(datatype === "mtn_data"){
      try {
        dataInJSON.forEach( async(element) => {
          console.log("MTN");
          await Mtn.insertMany({data:element, data_type:"mtn_data"})
        });
        return true
      } catch (error) {
          console.log(error);
          return false
      }
  }

  if(datatype === "mtn_voice"){
    try {
      dataInJSON.forEach( async(element) => {
        await Mtn.insertMany({data:element, data_type:"mtn_voice"})
      });
      return true
    } catch (error) {
        console.log(error);
        return false
    }
   }

   if(datatype === "mtn_sms"){
    try {
      

      dataInJSON.forEach( async(element) => {
        await Mtn.insertMany({data:element, data_type:"mtn_sms"})
      });
      return true
    } catch (error) {
        console.log(error);
        return false
    }
   }
   if(datatype === "mtn_voucher"){
    try {
      dataInJSON.forEach( async(element) => {
        await Mtn.insertMany({data:element, data_type:"mtn_voucher"})
      });
      return true
    } catch (error) {
        console.log(error);
        return false
    }
   }


   if(datatype === "glo_data"){
    try {

      dataInJSON.forEach( async(element) => {
        await Glo.insertMany({data:element, data_type:"glo_data"})
      });
      return true
    } catch (error) {
        console.log(error);
        return false
    }
    
}

if(datatype === "glo_voice"){
  try {
    dataInJSON.forEach( async(element) => {
      await Glo.insertMany({data:element, data_type:"glo_voice"})
    });
    return true
  } catch (error) {
      console.log(error);
      return false
  }
 }

 if(datatype === "glo_sms"){
  try {
    dataInJSON.forEach( async(element) => {
      await Glo.insertMany({data:element, data_type:"glo_sms"})
    });
    return true
  } catch (error) {
      console.log(error);
      return false
  }
 }
 if(datatype === "glo_voucher"){
  try {
    dataInJSON.forEach( async(element) => {
      await Glo.insertMany({data:element, data_type:"glo_voucher"})
    });
    return true
  } catch (error) {
      console.log(error);
      return false
  }
 }


 if(datatype === "etisalat_data"){
  try {
    dataInJSON.forEach( async(element) => {
      await Etisalat.insertMany({data:element, data_type:"etisalat_data"})
    });
    return true
  } catch (error) {
      console.log(error);
      return false
  }
}
 if(datatype === "etisalat_voice"){
  try {

    dataInJSON.forEach( async(element) => {
      await Etisalat.insertMany({data:element, data_type:"etisalat_voice"})
    });
    return true
  } catch (error) {
      console.log(error);
      return false
  }
 }

 if(datatype === "etisalat_sms"){
  try {
    dataInJSON.forEach( async(element) => {
      await Etisalat.insertMany({data:element, data_type:"etisalat_sms"})
    });
    return true
  } catch (error) {
      console.log(error);
      return false
  }
 }
 if(datatype === "etisalat_voucher"){
  try {
    dataInJSON.forEach( async(element) => {
      await Etisalat.insertMany({data:element, data_type:"etisalat_voucher"})
    });
    return true
  } catch (error) {
      console.log(error);
      return false
  }
 }


 
 if(datatype === "airtel_data"){
  try {
    dataInJSON.forEach( async(element) => {
      await Airtel.insertMany({data:element, data_type:"airtel_data"})
    });
    return true
  } catch (error) {
      console.log(error);
      return false
  }
}
 if(datatype === "airtel_voice"){
  try {
    dataInJSON.forEach( async(element) => {
      await Airtel.insertMany({data:element, data_type:"airtel_voice"})
    });
    return true
  } catch (error) {
      console.log(error);
      return false
  }
 }

 if(datatype === "airtel_sms"){
  try {
    dataInJSON.forEach( async(element) => {
      await Airtel.insertMany({data:element, data_type:"airtel_sms"})
    });
    return true
  } catch (error) {
      console.log(error);
      return false
  }
 }
 if(Airtel === "airtel_voucher"){
  try {
    dataInJSON.forEach( async(element) => {
      await Airtel.insertMany({data:element, data_type:"airtel_voucher"})
    });
    return true
  } catch (error) {
      console.log(error);
      return false
  }
 }

 return false

}


function deleteAllTempFiles(directory){
    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;

          console.log("done!!");
        });
      }
    });
}

/**
 *             option(value='mtn_data') MTN DATA
              option(value='mtn_voice') MTN VOICE
              option(value='mtn_sms') MTN SMS
              option(value='mtn_voucher') MTN VOUCHER
              option(value='glo_voice') GLO VOICE
              option(value='glo_sms') GLO SMS
              option(value='glo_data') GLO DATA
              option(value='glo_voucher') GLO VOUCHER
              option(value='etisalat_sms') ETISALAT SMS
              option(value='etisalat_data') ETISALAT DATA
              option(value='etisalat_voice') ETISALAT VOICE
              option(value='etisalat_voucher') ETISALAT VOUCHER
              option(value='airtel_data') AIRTEL DATA
              option(value='airtel_voice') AIRTEL VOICE
              option(value='airtel_sms') AIRTEL SMS
              option(value='airtel_voucher') AIRTEL VOUCHER 
 */
module.exports = router;
