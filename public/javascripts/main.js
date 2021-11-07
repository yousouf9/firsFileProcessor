

if(document.querySelector("#messages")){
    let messages = document.querySelector("#messages");

    setTimeout(function(){
        messages.style.display = "none";
    }, 5000)
}


if(document.querySelector("#delete")){
   
    document.querySelector("#delete").onclick = clickHandler;

   function clickHandler(e){
     

      let result =  confirm("Are you sure you want to empty database?")

      console.log(result);
      if(result) return true

      e.preventDefault();
      return false
   }
}