$(document).ready(function(){
 const maxlen = 140;
  $("#txt_tweet").keyup(function(e){
  
   // Finding total characters in Textarea
   const txtLen = $(this).val().length;
  console.log(txtLen);
   if(txtLen <= maxlen){
   const remain = maxlen - txtLen;
  
    // Updating remaining character count
    $("#remain").text(remain);
   }
  });
 
 // $("#txt_tweet").keydown(function(e){
   //var keycode = e.keyCode;
 
   // Finding total characters in Textarea 
  //  var txtLen = $(this).val().length;
  
  //  if(txtLen > maxlen){
  
  //   // when keycode is not of backspace
  //   if(keycode != 8){
  //     // Stopping new character to enter
  //     // e.preventDefault();
  //     return false;
  //   }
  //  }
  // });
 });
 