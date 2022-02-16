
const moment = require('moment');
const {BillyRonK}     = require("../../model/BillyRonk")


exports.insertData = async (tableName, datas, type, connection, currentCounter) => {

    const myCounter = currentCounter;
    
    let {
        id, customer_id, customer_auth_name,vendor_id,duration,src_prefix_out,dst_prefix_out,
        time_start,time_connect,time_end,pai_in, duration_min, charged, amount_kobo, amount, vat,
        pop, src_prefix_routing, dst_prefix_routing

    } = datas
    

    const fileDate = moment(time_start).format("YYYY-MM-DD");
    
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
   

    
        connection.query(`INSERT INTO ${tableName} (call_id, customer, vendor, customer_auth_name, duration, dst_prefix_out, src_prefix_out, time_start,time_connect,time_end,file_date,pop,src_prefix_routing, dst_prefix_routing,pai_in,duration_min,charged,amount_kobo,amount,vat) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, arrayItem)
        .then(async(result) => await cache.setAsync("mtn-minutes", JSON.stringify(myCounter)))
        .catch(async(error)=>{
        
           await BillyRonK.updateOne({
                "data.call_id": id
            },
             {
                 $set:{
                    data,
                    type,
                    message:error.message
                 }
             },
             {
                 upsert:true,
             }
            )
          
            console.log(error)
        })

    //(${1}, ${data.file_name}, ${data.file_date}, ${data.source_type}, ${data.serial_no}, ${data.time_stamp}, ${data.charge_amount}, ${data.reserved_03}, ${data.reserved_08}, ${data.account_type}, 2021-09-09, 2021 )
 
}