
// const mysql = require('mariadb');
// const pool  = mysql.createPool({
//   connectionLimit : 10,
//   host: 'localhost',
//   user: 'taxaudit',
//   password: 'taxaudit__2021',
//   database: 'taxaudit',
// });


// async function myInsert(){
//    const connect = await pool.getConnection();
    
//      data = {
//        operator_id:1,
//        file_name: 'thbhsjns',
//        file_date:"2021-09-09",
//        time_stamp:"2021-09-09: 11:30:am",
//        charge_amount:300,
//        reserved_08:"3443",
//        reserved_03:"345422",
//        account_type:"2000",
//        source_type:"33322",
//        serial_no:"373767882",
//        received_at: "2021-09-09",
//         year: 2021,
//      }
//      let arrayItem = [data.operator_id, data.file_name, data.file_date, data.source_type, data.serial_no, data.time_stamp, data.charge_amount, data.reserved_03, data.reserved_08, data.account_type, data.received_at, data.year, "09034162632"]
//      //(${1}, ${data.file_name}, ${data.file_date}, ${data.source_type}, ${data.serial_no}, ${data.time_stamp}, ${data.charge_amount}, ${data.reserved_03}, ${data.reserved_08}, ${data.account_type}, 2021-09-09, 2021 )
//     const result =  await connect.query("INSERT INTO eti_sms (operator_id, file_name, file_date, source_type, serial_no, time_stamp ,charge_amount, reserved_03, reserved_08, account_type, received_at, year, charging_party_no) value(?,?,?,?,?,?,?,?,?,?,?,?,?)", arrayItem);
//      console.log(result)

// }

// myInsert();

// exports = pool
 
const getArea = (k, a)=>{
   
     
  let arrivedInTime = 0;
  let arrivedLate   = 0;
  for(let i = 0; i<a.length; i++){
      let currentValue = a[i];
      if(currentValue <= 0){
          arrivedInTime =arrivedInTime + 1;
      }
      if(currentValue > 0)
          arrivedLate = arrivedLate +1;
  }
  
  if(arrivedInTime >= k) return "YES"

  return "NO"
  //console.log(height);
}

const arry = [1, 3, 1, 3, 1, 4, 1, 3, 2, 5, 5 ,5, 5, 5, 5, 5, 5 ,5 ,5, 5, 5, 5, 5, 5, 5, 5]
console.log(getArea(2, [0, -1, 2, 1,]))