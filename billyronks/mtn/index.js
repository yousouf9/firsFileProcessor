const {BillyRonk} = require('./Mtn');
const {insertData} = require('./insertData');
const path  = require("path");
const {pool} = require('../../startup/mySql')
const {convertToNaira, getMinutes, getVAT} = require('../helper');
const {
        MTNCHARGEAMOUNTS,
        FIVEHUNDRED,
        THREEM, 
        TENM,
        TWENTHYM, 
        FOURTYM,
        SIXTYM,
        EIGHTYM,
        ONEHUNDREDM,
        ONETWENTHYM,
        ONEFOURTYM,
        ONESIXTYM,
        ONEEIGHTYM,
        TWOHUNDREDM
      } = require('../../constants');
const BillyRonkPath = async () => {


  //await cache.clear("billy-mtn-call");
  //await cache.clear("mtn-minutes");
   

  const connect = await pool.getConnection();

    const folderPath = path.join(__dirname, '..', '..', './taxaudit/billyronk/raw/mtn/call')
    
    console.log("Why here?",folderPath), 
    await BillyRonk.fetchCall(folderPath);




    let billyMTN_call = await cache.rpopAsync("billy-mtn-call")
    let   minutesCounter = 0;

    console.log("testing", billyMTN_call)

    while(billyMTN_call !== null){

      console.log("From MTN", billyMTN_call);

        let  billy_mtn_call = await cache.getAsync("mtn-minutes")

        if(billy_mtn_call !== null){
           minutesCounter =  parseFloat(JSON.parse(billy_mtn_call))
        }

      if(minutesCounter <= FIVEHUNDRED){
        saveAndUpdateRecords(MTNCHARGEAMOUNTS['48k'], minutesCounter, connect, billyMTN_call, type="MTN-CALL");
      }else if(minutesCounter > FIVEHUNDRED && minutesCounter <= THREEM){
        saveAndUpdateRecords(MTNCHARGEAMOUNTS['41k'], minutesCounter, connect, billyMTN_call, type="MTN-CALL");
      }else if(minutesCounter > THREEM && minutesCounter <= TENM){
        saveAndUpdateRecords(MTNCHARGEAMOUNTS['36k'], minutesCounter, connect, billyMTN_call, type="MTN-CALL");
      }else if(minutesCounter > TENM && minutesCounter <= TWENTHYM){
        saveAndUpdateRecords(MTNCHARGEAMOUNTS['31k'], minutesCounter, connect, billyMTN_call, type="MTN-CALL");
      }else if(minutesCounter > TWENTHYM && minutesCounter <= FOURTYM){
        saveAndUpdateRecords(MTNCHARGEAMOUNTS['26k'], minutesCounter, connect, billyMTN_call, type="MTN-CALL");
      }else if(minutesCounter > FOURTYM && minutesCounter <= SIXTYM){
        saveAndUpdateRecords(MTNCHARGEAMOUNTS['24k'], minutesCounter, connect, billyMTN_call, type="MTN-CALL");
      }else if(minutesCounter > SIXTYM && minutesCounter <= EIGHTYM){
        saveAndUpdateRecords(MTNCHARGEAMOUNTS['20k'], minutesCounter, connect, billyMTN_call, type="MTN-CALL");
      }else if(minutesCounter > EIGHTYM && minutesCounter <= ONEHUNDREDM){
        saveAndUpdateRecords(MTNCHARGEAMOUNTS['19k'], minutesCounter, connect, billyMTN_call, type="MTN-CALL");
      }else if(minutesCounter > ONEHUNDREDM && minutesCounter <= ONETWENTHYM){
        saveAndUpdateRecords(MTNCHARGEAMOUNTS['17k'], minutesCounter, connect, billyMTN_call, type="MTN-CALL");
      }else if(minutesCounter > ONETWENTHYM && minutesCounter <= ONEFOURTYM){
        saveAndUpdateRecords(MTNCHARGEAMOUNTS['14k'], minutesCounter, connect, billyMTN_call, type="MTN-CALL");
      }else if(minutesCounter > ONEFOURTYM && minutesCounter <= ONESIXTYM){
        saveAndUpdateRecords(MTNCHARGEAMOUNTS['12k'], minutesCounter, connect, billyMTN_call, type="MTN-CALL");
      }else if(minutesCounter > ONESIXTYM && minutesCounter <= ONEEIGHTYM){
        saveAndUpdateRecords(MTNCHARGEAMOUNTS['10k'], minutesCounter, connect, billyMTN_call, type="MTN-CALL");
      }else if(minutesCounter > ONEEIGHTYM && minutesCounter <= TWOHUNDREDM){
        saveAndUpdateRecords(MTNCHARGEAMOUNTS['07k'], minutesCounter, connect, billyMTN_call, type="MTN-CALL");
      }else{
        //for when it is greater than 200, 000,000M
        saveAndUpdateRecords(MTNCHARGEAMOUNTS['05k'], minutesCounter, connect, billyMTN_call, type="MTN-CALL");
      }

      billyMTN_call = await cache.rpopAsync("billy-mtn-call")
  }


    
}


const saveAndUpdateRecords = async(chargeAmount, counter, connect, billyMTN_call, type) => {
    console.log("here now", typeof billyMTN_call)
    if(billyMTN_call !== null){
      try{
        let res = JSON.parse(billyMTN_call);

        if(res.duration){

          console.log("just checking to be sure", typeof res,  res.duration,  typeof res.duration);
          let duration_min  =   getMinutes(res.duration);
          let charge_amount =  duration_min * chargeAmount;
          let amount        =  convertToNaira(charge_amount);
          let vat           =  getVAT(amount);
          let currentCounter =  duration_min + counter;
  
            console.log("anotherc", currentCounter)
            
            await cache.setAsync("mtn-minutes", JSON.stringify(currentCounter))

            res.duration_min = `${duration_min}`;
            res.charged      = chargeAmount;
            res.amount_kobo  = `${charge_amount}`;
            res.amount       = `${amount}`;
            res.vat          = `${vat}`

           await insertData("billyronk_mtn_calls_info", res, type, connect)

          

        }

      }catch(err){
        console.log(err)
      }
    }else{
      await connect.release();
    }
}



exports.BillyRonkPath = BillyRonkPath;