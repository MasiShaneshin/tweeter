$(document).ready(function(){
 const maxlen = 140;
  $("#tweet-text").keyup(function(e){
  
   // Finding total characters in Textarea
   const txtLen = $(this).val().length;
   const remain = maxlen - txtLen;
   console.log("keyup",txtLen,remain); 
   // Updating remaining character count
    $(".counter").text(remain);
   
  });
});
 
 
 
