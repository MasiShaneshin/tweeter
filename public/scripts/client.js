const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
//-----render tweet to index.html----
const renderTweets = function(tweets) {
$('#tweets-container').empty();
const reversedTweets = tweets.reverse();
 reversedTweets.forEach( (element) => {
    let $tweet = createTweetElement(element);
    $('#tweets-container').append($tweet); 
 });
}

//-----------Safe text. To prevent harmful text/scripts from being loaded to the server--------------
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//---------render Error message to index.html----------------
const renderErrors = function(error) {
  $('.error-text').text(error);
  $('.error-text').slideDown("slow");
  $('.error-text').css("border-color", "red");
};

//--------Creating a single tweet----------------- 
const createTweetElement = function(tweet) {
  const $tweet = `
  <article class = "article">
    <div class = "headers-footers-alignment">
      <header class = "header-footer-format" style = "align-items: flex-start;">
        <div><img src = "${tweet.user.avatars}"> </div>
        <div style = "margin-left: 10px; margin-top: 15px;">${tweet.user.name}</div>
      </header>
      <header class = "header-hover" style = "align-items: flex-end;"> ${tweet.user.handle} </header>
    </div>
    <div >
      <p style = "word-wrap: break-word; margin: 40px; padding-top: 20px; font-size: 28px;">${escape(tweet.content.text)}</p>
    </div>
    <div class = "headers-footers-alignment" style = "border-top: solid grey 3px;">
      <footer class = "header-footer-format">${tweet.created_at}</footer>
      <footer class = "header-footer-format">
        <i class = "fa fa-flag" style = "margin-right: 5px; color: #4056A1;"></i>   
        <i class = "fa fa-retweet" style = "margin-right: 5px; color: #4056A1;"></i> 
        <i class = "fa fa-heart" style = "color: #4056A1;"></i> 
      </footer>
    </div>
  </article>
  `
  return $tweet;
};
// ------------form submit data----------------

$("#idform").submit(function(event) {

  event.preventDefault(); 

  const form = $(this);
  const url = "http://localhost:8080/tweets";
  
  $.ajax({
         type: "POST",
         url: url,
         data: form.serialize(), 
         success: function(data)
         {
             console.log("succes"); 
         }
       });  
});

//------------Fetching tweets with Ajax---------------
// $(document).ready(function() { 
//  function loadTweets(){ 
// $.ajax({ 
//   type: 'GET', 
//   url: 'http://localhost:8080/tweets', 
//   data:{}, 
//   dataType: 'json',
//   success: function (data) { 
//       $.each(data, function(index, element) {
//           $('body').append($('<div>', {
//               text: element.name
//           }));
//       });
//   }
// })
//  }
//  loadTweets()
//  });

//--------------Get request----------------
const loadTweets =()=>{
  $.ajax({url:'/tweets', method:'GET',}).then((response) => {
    const $tweet = renderTweets (response); 
  })
};

//------------form validation--------------
 
const validation = ((data) => {
  let error = '';
  const length = data.length;
  if (length === 0) {
    error = 'Error: Field is empty. Type somthing!'; 
  } else if(length > 140) { 
    error = 'Error: Too long. Our arbitary limit of 140 chars!';
  } 
  return error;
});
//-- error message------
$(document).ready(function () {
  loadTweets(); 
  $('.counter').val(140);
  $('#button').on('click', (evt) => {
  evt.preventDefault();
    if (!($('.error-text').first().is(":hidden"))) {
      $('.error-text').hide();
    }
    $('.error-text').css("border-color", "transparent");
    $('.error-text').text('');
    $('.error-message').empty();
    const validate = validation($('#tweet-text').val());
    if (validate === '') {
      let tweettext = $('#tweet-text') //data
      $.post("/tweets", tweettext.serialize())
      .then(() =>{
        $('textarea').val('');
        $('.counter').val(140);
        loadTweets();
      })
    } else {
      renderErrors(validate);
    }
  });
});

