const {BillyRonk} = require('./NineMobile');
const {insertData} = require('./insertData');
const path  = require("path");
const moment = require('moment');
const {pool} = require('../../startup/mySql')
const {convertToNaira, getMinutes, getVAT} = require('../helper');
const {
        NINEMOBILEAMOUNTS,
        THREEM, 
        TENM,
        TWENTHYM, 
        FOURTYM,
        SIXTYM,
        EIGHTYM,
        ONEHUNDREDM
      } = require('../../constants');
const BillyRonkPath = async () => {


  //await cache.clear("billy-ninemobile-call");
  //await cache.clear("ninemobile-minutes");
  //await cache.clear("nine-current-month")
  //await cache.clear("mine-current-year")
   

  const connect = await pool.getConnection();

    const folderPath =path.join(__dirname, '..', '..', './taxaudit/billyronk/raw/ninemobile/call')
    console.log(folderPath);
   
    await BillyRonk.fetchCall(folderPath);




    let billyNine_call = await cache.rpopAsync("billy-ninemobile-call")
    let   minutesCounter = 0; 


    console.log(billyNine_call, "here", billyNine_call);
    
    setInterval(async()=>{
      if(billyNine_call !== null){

        let res = JSON.parse(billyNine_call)
  
        //minuets tracker
        let  billy_nine_call = await cache.getAsync("ninemobile-minutes")
  
        if(billy_nine_call !== null){
  
          minutesCounter =  parseFloat(JSON.parse(billy_nine_call))
  
          console.log("from redis", minutesCounter)
       }
  
       //get date as year, month, day
        const [year, month, day] = moment(res.time_start).format("YYYY-MM-DD").split('-');
  
        console.log("year", year, "Month", month);
  
        let currentMonth = await cache.getAsync("nine-current-month");
  
        if(currentMonth === null){
          await cache.setAsync("nine-current-month", "01")
          currentMonth = await cache.getAsync("nine-current-month");
        }
  
        let currentYear =  await cache.getAsync("nine-current-year");
  
        if(currentYear === null){        
          await cache.setAsync("nine-current-year",  "2016")
          currentYear =  await cache.getAsync("nine-current-year");
        }
  
        console.log(currentYear === year, currentYear, year,  typeof currentYear, typeof year);
  
          if(year !== currentYear ){
            minutesCounter = 0
            await cache.setAsync("nine-current-year",  year);
          }
  
          if(month !== currentMonth ){
            minutesCounter = 0
            await cache.setAsync("nine-current-month",  month);
          }
  
          if(res.duration){
  
            switch(month){
              case "01":
                if(minutesCounter <= THREEM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['40k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > THREEM && minutesCounter <= TENM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['35k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TENM && minutesCounter <= TWENTHYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['26k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TWENTHYM && minutesCounter <= FOURTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['23k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > FOURTYM && minutesCounter <= SIXTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['20k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > SIXTYM && minutesCounter <= EIGHTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['17k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > EIGHTYM && minutesCounter <= ONEHUNDREDM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['14k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else{
                  //for when it is greater than 100, 000,000M
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['11k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }
  
                break;
              case "02":
                if(minutesCounter <= THREEM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['40k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > THREEM && minutesCounter <= TENM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['35k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TENM && minutesCounter <= TWENTHYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['26k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TWENTHYM && minutesCounter <= FOURTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['23k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > FOURTYM && minutesCounter <= SIXTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['20k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > SIXTYM && minutesCounter <= EIGHTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['17k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > EIGHTYM && minutesCounter <= ONEHUNDREDM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['14k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else{
                  //for when it is greater than 100, 000,000M
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['11k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }
                break;
              case "03":
                if(minutesCounter <= THREEM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['40k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > THREEM && minutesCounter <= TENM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['35k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TENM && minutesCounter <= TWENTHYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['26k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TWENTHYM && minutesCounter <= FOURTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['23k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > FOURTYM && minutesCounter <= SIXTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['20k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > SIXTYM && minutesCounter <= EIGHTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['17k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > EIGHTYM && minutesCounter <= ONEHUNDREDM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['14k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else{
                  //for when it is greater than 100, 000,000M
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['11k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }
                break;
              case "04":
                if(minutesCounter <= THREEM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['40k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > THREEM && minutesCounter <= TENM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['35k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TENM && minutesCounter <= TWENTHYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['26k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TWENTHYM && minutesCounter <= FOURTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['23k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > FOURTYM && minutesCounter <= SIXTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['20k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > SIXTYM && minutesCounter <= EIGHTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['17k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > EIGHTYM && minutesCounter <= ONEHUNDREDM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['14k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else{
                  //for when it is greater than 100, 000,000M
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['11k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }
                break;
              case "05":
                if(minutesCounter <= THREEM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['40k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > THREEM && minutesCounter <= TENM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['35k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TENM && minutesCounter <= TWENTHYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['26k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TWENTHYM && minutesCounter <= FOURTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['23k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > FOURTYM && minutesCounter <= SIXTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['20k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > SIXTYM && minutesCounter <= EIGHTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['17k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > EIGHTYM && minutesCounter <= ONEHUNDREDM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['14k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else{
                  //for when it is greater than 100, 000,000M
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['11k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }
                break;
              case "06":
                if(minutesCounter <= THREEM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['40k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > THREEM && minutesCounter <= TENM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['35k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TENM && minutesCounter <= TWENTHYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['26k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TWENTHYM && minutesCounter <= FOURTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['23k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > FOURTYM && minutesCounter <= SIXTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['20k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > SIXTYM && minutesCounter <= EIGHTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['17k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > EIGHTYM && minutesCounter <= ONEHUNDREDM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['14k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else{
                  //for when it is greater than 100, 000,000M
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['11k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }
                break;
              case "07":
                if(minutesCounter <= THREEM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['40k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > THREEM && minutesCounter <= TENM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['35k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TENM && minutesCounter <= TWENTHYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['26k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TWENTHYM && minutesCounter <= FOURTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['23k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > FOURTYM && minutesCounter <= SIXTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['20k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > SIXTYM && minutesCounter <= EIGHTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['17k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > EIGHTYM && minutesCounter <= ONEHUNDREDM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['14k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else{
                  //for when it is greater than 100, 000,000M
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['11k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }
                break;
              case "08":
                if(minutesCounter <= THREEM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['40k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > THREEM && minutesCounter <= TENM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['35k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TENM && minutesCounter <= TWENTHYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['26k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TWENTHYM && minutesCounter <= FOURTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['23k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > FOURTYM && minutesCounter <= SIXTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['20k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > SIXTYM && minutesCounter <= EIGHTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['17k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > EIGHTYM && minutesCounter <= ONEHUNDREDM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['14k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else{
                  //for when it is greater than 100, 000,000M
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['11k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }
                break;
              case "09":
                if(minutesCounter <= THREEM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['40k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > THREEM && minutesCounter <= TENM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['35k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TENM && minutesCounter <= TWENTHYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['26k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TWENTHYM && minutesCounter <= FOURTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['23k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > FOURTYM && minutesCounter <= SIXTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['20k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > SIXTYM && minutesCounter <= EIGHTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['17k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > EIGHTYM && minutesCounter <= ONEHUNDREDM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['14k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else{
                  //for when it is greater than 100, 000,000M
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['11k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }
                break;
              case "10":
                if(minutesCounter <= THREEM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['40k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > THREEM && minutesCounter <= TENM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['35k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TENM && minutesCounter <= TWENTHYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['26k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TWENTHYM && minutesCounter <= FOURTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['23k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > FOURTYM && minutesCounter <= SIXTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['20k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > SIXTYM && minutesCounter <= EIGHTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['17k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > EIGHTYM && minutesCounter <= ONEHUNDREDM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['14k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else{
                  //for when it is greater than 100, 000,000M
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['11k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }
                break;
              case "11":
                if(minutesCounter <= THREEM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['40k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > THREEM && minutesCounter <= TENM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['35k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TENM && minutesCounter <= TWENTHYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['26k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TWENTHYM && minutesCounter <= FOURTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['23k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > FOURTYM && minutesCounter <= SIXTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['20k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > SIXTYM && minutesCounter <= EIGHTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['17k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > EIGHTYM && minutesCounter <= ONEHUNDREDM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['14k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else{
                  //for when it is greater than 100, 000,000M
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['11k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }
                  break;
              case "12":
                if(minutesCounter <= THREEM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['40k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > THREEM && minutesCounter <= TENM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['35k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TENM && minutesCounter <= TWENTHYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['26k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > TWENTHYM && minutesCounter <= FOURTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['23k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > FOURTYM && minutesCounter <= SIXTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['20k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > SIXTYM && minutesCounter <= EIGHTYM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['17k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else if(minutesCounter > EIGHTYM && minutesCounter <= ONEHUNDREDM){
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['14k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                }else{
                  //for when it is greater than 100, 000,000M
                  saveAndUpdateRecords(NINEMOBILEAMOUNTS['11k'], minutesCounter, connect, billyNine_call, type="NINEMOBILE-CALL");
                } 
                break;
              default:
                console.log("Not Valid", res)
            }
  
          }
      billyNine_call = await cache.rpopAsync("billy-ninemobile-call")
    }
    }, 500)

    
}


const saveAndUpdateRecords = async(chargeAmount, counter, connect, billyNine_call, type) => {
    if(billyNine_call !== null){
      try{
        let res = JSON.parse(billyNine_call);

        if(res.duration){

          let duration_min  =   getMinutes(res.duration);
          let charge_amount =  duration_min * chargeAmount;
          let amount        =  convertToNaira(charge_amount);
          let vat           =  getVAT(amount);
          let currentCounter =  duration_min + counter;
  
          console.log("minutes counter", currentCounter)
            res.duration_min = `${duration_min}`;
            res.charged      = chargeAmount;
            res.amount_kobo  = `${charge_amount}`;
            res.amount       = `${amount}`;
            res.vat          = `${vat}`

           await insertData("billyronk_eti_calls_info", res, type, connect, currentCounter)

          

        }

      }catch(err){
        console.log(err)
      }
    }else{
      await connect.release();
    }
}


exports.BillyRonkPath = BillyRonkPath;