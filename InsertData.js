const {pool} = require('./startup/mySql');
const moment = require('moment');


exports.insertData = async (tableName, datas, type, operator_id, connection ) => {

    
    if(type === "voucher"){
        datas.CHARGEAMOUNT = datas.CARDFACEVALUE
    }
    let {FILENAME, FILEDATE, SOURCETYPE, SERIALNO, TIMESTAMP,
 
        RESERVED_03, RESERVED_08, CHARGEAMOUNT, ACCOUNTTYPE1, RESERVED03, RESERVED08
     
    } = datas

    if(!RESERVED03) RESERVED03 = RESERVED_03;
    if(!RESERVED08) RESERVED08 = RESERVED_08;
    if(!CHARGEAMOUNT) CHARGEAMOUNT = 0;


    console.log(FILENAME, FILEDATE, SOURCETYPE, SERIALNO, TIMESTAMP,
 
        RESERVED03, RESERVED_08, CHARGEAMOUNT, ACCOUNTTYPE1);


    const converTDate = FILEDATE.split("/");
    const newYear = converTDate[2];
    const month = converTDate[1];
    const day = converTDate[0];

    const fileDate = moment(`${newYear}-${month}-${day}`).format("YYYY-MM-DD");
    const recived = moment().format("YYYY-MM-DD h:mm:ss a");
    const year = moment().format("YYYY");
    
    let data = {
        operator_id: operator_id,
        file_name :FILENAME,
        file_date:fileDate,
        source_type:SOURCETYPE,
        serial_no:SERIALNO,
        time_stamp:TIMESTAMP,
        charge_amount:CHARGEAMOUNT,
        reserved_03:RESERVED03,
        reserved_08:RESERVED08,
        account_type: ACCOUNTTYPE1,
        received_at : recived,
        year:year
    } 
    console.log(data, RESERVED_03, RESERVED_08, RESERVED03, RESERVED08);

    let arrayItem = [data.operator_id, data.file_name, data.file_date, data.source_type, data.serial_no, data.time_stamp, data.charge_amount, data.reserved_03, data.reserved_08, data.account_type, data.received_at, data.year,]
    //(${1}, ${data.file_name}, ${data.file_date}, ${data.source_type}, ${data.serial_no}, ${data.time_stamp}, ${data.charge_amount}, ${data.reserved_03}, ${data.reserved_08}, ${data.account_type}, 2021-09-09, 2021 )
   const result =  await connection.query(`INSERT INTO ${tableName} (operator_id, file_name, file_date, source_type, serial_no, time_stamp ,charge_amount, reserved_03, reserved_08, account_type, received_at, year) value(?,?,?,?,?,?,?,?,?,?,?,?)`, arrayItem);
    console.log(result)

}
