const {BillyRonk} = require('./Airtel');
const {insertData} = require('./insertData');
const path  = require("path");
const moment = require('moment');
const {pool} = require('../../startup/mySql')
const {convertToNaira, getMinutes, getVAT} = require('../helper');
const {
        AIRTELAMOUNTS,
        THREEM, 
        TENM,
        TWENTHYM, 
        FOURTYM,
        SIXTYM,
        EIGHTYM,
        ONEHUNDREDM,
        THIRTYM
      } = require('../../constants');
const BillyRonkPath = async () => {


  //await cache.clear("billy-airtel-call");
  //await cache.clear("airtel-minutes");
  //await cache.clear("airtel-current-month")
  //await cache.clear("airtel-current-year")
   

  const connect = await pool.getConnection();

    const folderPath =path.join(__dirname, '..', '..', './taxaudit/billyronk/raw/airtel/call')
    console.log(folderPath);
   
    await BillyRonk.fetchCall(folderPath);




    let billyAirtel_call = await cache.rpopAsync("billy-airtel-call")
    let   minutesCounter = 0; 


    console.log(billyAirtel_call, "here", billyAirtel_call);

    setInterval(async() => {
        if(billyAirtel_call !== null){

            let res = JSON.parse(billyAirtel_call)
      
            //minuets tracker
            let  billy_airtel_call = await cache.getAsync("airtel-minutes")
      
            if(billy_airtel_call !== null){
      
              minutesCounter =  parseFloat(JSON.parse(billy_airtel_call))
      
              console.log("from redis", minutesCounter)
           }
      
           //get date as year, month, day
            const [year, month, day] = moment(res.time_start).format("YYYY-MM-DD").split('-');
      
            console.log("year", year, "Month", month);
      
            let currentMonth = await cache.getAsync("airtel-current-month");
      
            if(currentMonth === null){
              await cache.setAsync("airtel-current-month", "01")
              currentMonth = await cache.getAsync("airtel-current-month");
            }
      
            let currentYear =  await cache.getAsync("airtel-current-year");
      
            if(currentYear === null){        
              await cache.setAsync("airtel-current-year",  "2016")
              currentYear =  await cache.getAsync("airtel-current-year");
            }
      
            console.log(currentYear === year, currentYear, year,  typeof currentYear, typeof year);
      
              if(year !== currentYear ){
                minutesCounter = 0
                await cache.setAsync("airtel-current-year",  year);
              }
      
              if(month !== currentMonth ){
                minutesCounter = 0
                await cache.setAsync("airtel-current-month",  month);
              }
      
              if(res.duration){
      
                switch(month){
                  case "01":
                    if(minutesCounter <= THIRTYM){
                      saveAndUpdateRecords(AIRTELAMOUNTS['40k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                    }else if(minutesCounter > THIRTYM && minutesCounter <= SIXTYM){
                      saveAndUpdateRecords(AIRTELAMOUNTS['35k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                    }else if(minutesCounter > SIXTYM && minutesCounter <= ONEHUNDREDM){
                      saveAndUpdateRecords(AIRTELAMOUNTS['30k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                    }else{
                      //for when it is greater than 100, 000,000M
                      saveAndUpdateRecords(AIRTELAMOUNTS['20k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                    }
      
                    break;
                  case "02":
                      if(minutesCounter <= THIRTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['40k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > THIRTYM && minutesCounter <= SIXTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['35k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > SIXTYM && minutesCounter <= ONEHUNDREDM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['30k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else{
                          //for when it is greater than 100, 000,000M
                          saveAndUpdateRecords(AIRTELAMOUNTS['20k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }
                    break;
                  case "03":
                        if(minutesCounter <= THIRTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['40k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > THIRTYM && minutesCounter <= SIXTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['35k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > SIXTYM && minutesCounter <= ONEHUNDREDM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['30k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else{
                          //for when it is greater than 100, 000,000M
                          saveAndUpdateRecords(AIRTELAMOUNTS['20k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        } 
                         break;
                  case "04":
                      if(minutesCounter <= THIRTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['40k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > THIRTYM && minutesCounter <= SIXTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['35k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > SIXTYM && minutesCounter <= ONEHUNDREDM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['30k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else{
                          //for when it is greater than 100, 000,000M
                          saveAndUpdateRecords(AIRTELAMOUNTS['20k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        } 
                      break;
                  case "05":
                      if(minutesCounter <= THIRTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['40k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > THIRTYM && minutesCounter <= SIXTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['35k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > SIXTYM && minutesCounter <= ONEHUNDREDM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['30k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else{
                          //for when it is greater than 100, 000,000M
                          saveAndUpdateRecords(AIRTELAMOUNTS['20k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        } 
                    break;
                  case "06":
                      if(minutesCounter <= THIRTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['40k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > THIRTYM && minutesCounter <= SIXTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['35k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > SIXTYM && minutesCounter <= ONEHUNDREDM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['30k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else{
                          //for when it is greater than 100, 000,000M
                          saveAndUpdateRecords(AIRTELAMOUNTS['20k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        } 
                    break;
                  case "07":
                      if(minutesCounter <= THIRTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['40k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > THIRTYM && minutesCounter <= SIXTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['35k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > SIXTYM && minutesCounter <= ONEHUNDREDM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['30k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else{
                          //for when it is greater than 100, 000,000M
                          saveAndUpdateRecords(AIRTELAMOUNTS['20k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        } 
                    break;
                  case "08":
                      if(minutesCounter <= THIRTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['40k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > THIRTYM && minutesCounter <= SIXTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['35k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > SIXTYM && minutesCounter <= ONEHUNDREDM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['30k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else{
                          //for when it is greater than 100, 000,000M
                          saveAndUpdateRecords(AIRTELAMOUNTS['20k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        } 
                    break;
                  case "09":
                      if(minutesCounter <= THIRTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['40k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > THIRTYM && minutesCounter <= SIXTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['35k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > SIXTYM && minutesCounter <= ONEHUNDREDM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['30k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else{
                          //for when it is greater than 100, 000,000M
                          saveAndUpdateRecords(AIRTELAMOUNTS['20k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        } 
                    break;
                  case "10":
                      if(minutesCounter <= THIRTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['40k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > THIRTYM && minutesCounter <= SIXTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['35k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > SIXTYM && minutesCounter <= ONEHUNDREDM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['30k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else{
                          //for when it is greater than 100, 000,000M
                          saveAndUpdateRecords(AIRTELAMOUNTS['20k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        } 
                    break;
                  case "11":
                      if(minutesCounter <= THIRTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['40k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > THIRTYM && minutesCounter <= SIXTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['35k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > SIXTYM && minutesCounter <= ONEHUNDREDM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['30k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else{
                          //for when it is greater than 100, 000,000M
                          saveAndUpdateRecords(AIRTELAMOUNTS['20k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        } 
                      break;
                  case "12":
                      if(minutesCounter <= THIRTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['40k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > THIRTYM && minutesCounter <= SIXTYM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['35k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else if(minutesCounter > SIXTYM && minutesCounter <= ONEHUNDREDM){
                          saveAndUpdateRecords(AIRTELAMOUNTS['30k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        }else{
                          //for when it is greater than 100, 000,000M
                          saveAndUpdateRecords(AIRTELAMOUNTS['20k'], minutesCounter, connect, billyAirtel_call, type="NINEMOBILE-CALL");
                        } 
                    break;
                  default:
                    console.log("Not Valid", res)
                }
      
              }
          billyAirtel_call = await cache.rpopAsync("billy-airtel-call")
        }
    }, 500);
    
}


const saveAndUpdateRecords = async(chargeAmount, counter, connect, billyAirtel_call, type) => {
    if(billyAirtel_call !== null){
      try{
        let res = JSON.parse(billyAirtel_call);

        if(res.duration){

          let duration_min  =   getMinutes(res.duration);
          let charge_amount =  duration_min * chargeAmount;
          let amount        =  convertToNaira(charge_amount);
          let vat           =  getVAT(amount);
          let currentCounter =  duration_min + counter;
  
            console.log("sum counter", typeof currentCounter,  "inputed counter", typeof counter, "duration min", typeof duration_min, "duration sec", typeof res.duration)

            console.log("sum counter", currentCounter,  "inputed counter", counter, "duration min", duration_min, "duration sec", res.duration)
            
            console.log("minutes counter", currentCounter)

            res.duration_min = `${duration_min}`;
            res.charged      = chargeAmount;
            res.amount_kobo  = `${charge_amount}`;
            res.amount       = `${amount}`;
            res.vat          = `${vat}`

           await insertData("billyronk_airtel_calls_info", res, type, connect)

          

        }

      }catch(err){
        console.log(err)
      }
    }else{
      await connect.release();
    }
}



exports.BillyRonkPath = BillyRonkPath;