 const getMinutes = (seconds) =>{
    let sec = parseFloat(seconds);
    let  result = (sec / 60)
    return result;
  }
  
  const convertToNaira = (koboValue)=>{
    //100kobo is equal to a naira;
    return 0.01 * koboValue;
  }
  
  const getVAT = (amountINNaira) => {
    //vat is eqaul to 7.5 % of given value in naira;
    return  0.075 * amountINNaira;
  }

  module.exports = {
    getMinutes,
    convertToNaira,
    getVAT

  }