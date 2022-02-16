
const moment = require('moment');
const {BillyRonK}     = require("../../model/BillyRonk")


exports.insertData = async (tableName, datas, type, connection) => {

    
    let {
        id, customer_id, customer_auth_name,vendor_id,duration,src_prefix_out,dst_prefix_out,
        time_start,time_connect,time_end,pai_in, duration_min, charged, amount_kobo, amount, vat,
        pop, src_prefix_routing, dst_prefix_routing

    } = datas
    

    const fileDate = moment("2021-07-04 00:04:58.611817+00").format("YYYY-MM-DD");
    
    let data = {
        call_id: id,
        customer :parseInt(customer_id, 10),
        vendor  : parseInt(vendor_id, 10),
        customer_auth_name,
        duration: parseFloat(duration),
        dst_prefix_out,
        src_prefix_out,
        time_start,
        time_connect,
        time_end,
        file_date:fileDate,
        pop: pop||-1,
        src_prefix_routing: src_prefix_routing || "", 
        dst_prefix_routing: dst_prefix_routing || "",
        pai_in,
        duration_min,
        charged,
        amount_kobo,
        amount,
        vat,

    } 


    let arrayItem = Object.values(data);
    let result = null;
    try {
     result =  await connection.query(`INSERT INTO ${tableName} (call_id, customer, vendor, customer_auth_name, duration, dst_prefix_out, src_prefix_out, time_start,time_connect,time_end,file_date,pop,src_prefix_routing, dst_prefix_routing,pai_in,duration_min,charged,amount_kobo,amount,vat) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, arrayItem);
    } catch (error) {
        
        let billyRonk = new BillyRonK({data, type, message:error.message})
         await billyRonk.save();
        console.log(error)
    }
    //(${1}, ${data.file_name}, ${data.file_date}, ${data.source_type}, ${data.serial_no}, ${data.time_stamp}, ${data.charge_amount}, ${data.reserved_03}, ${data.reserved_08}, ${data.account_type}, 2021-09-09, 2021 )
 
   console.log(result)

}