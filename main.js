'use strict';
(function() {
  $(document).ready(init);

  function init(){
    $('.container-fluid').append(boardBinder);
    $('.col-xs-2').on('click', flipCard);
  }
  function boardBinder(){
    var boardSize = 6;
    var boardArray = [];
    var rowArray = [];
    for (var i = 0; i < boardSize; i++){
      rowArray.push('<div class="col-xs-2"><span class="glyphicon" aria-hidden="true"></span></div>');
    }
    for (var n = 0; n < boardSize; n++){
      boardArray.push('<div class="row">'+rowArray.join('')+'</div>');
    }
    return boardArray.join('');
  }

  function flipCard(){
    if ($(this).attr('data-showing') !== "match" && $(this).attr('data-first') !== "true" && timer !== true) {
      addIcon($(this));
      showHide($(this));
      winning();
    }
  }
  function addIcon(x){
    if (x.attr('data-icon') !== 'true'){
      x.attr('data-icon', true);
      x.children().addClass(bucketPicker);
    }
  }

  var firstCard = '';
  var bucket = ['glyphicon-plus','glyphicon-pencil','glyphicon-cloud','glyphicon-envelope',
  'glyphicon-glass', 'glyphicon-music', 'glyphicon-search', 'glyphicon-heart', 'glyphicon-star-empty',
  'glyphicon-user', 'glyphicon-film','glyphicon-th-list', 'glyphicon-ok', 'glyphicon-off',
  'glyphicon-signal', 'glyphicon-home', 'glyphicon-road', 'glyphicon-qrcode', 'glyphicon-plus',
  'glyphicon-pencil','glyphicon-cloud','glyphicon-envelope',
  'glyphicon-glass', 'glyphicon-music', 'glyphicon-search', 'glyphicon-heart', 'glyphicon-star-empty',
  'glyphicon-user', 'glyphicon-film','glyphicon-th-list', 'glyphicon-ok', 'glyphicon-off',
  'glyphicon-signal', 'glyphicon-home', 'glyphicon-road', 'glyphicon-qrcode'];
  var newBucket = $.merge([], bucket)

  function bucketPicker(){
    var num = Math.floor(Math.random()*newBucket.length);
    var item = newBucket[num];
    newBucket.splice(num,1)
    return item;
  }

  var timer = false;
  var counter = 0;

  function showHide(x){
    x.attr('data-showing', true)
    if (firstCard === ''){
      x.attr('data-first', true);
      firstCard = x;
      return;
    }
    else {
      if(firstCard.find('span').attr('class') === x.find('span').attr('class')){
        firstCard.attr('data-showing',"match");
        x.attr('data-showing',"match");
        firstCard = '';
        counter++;
        return;
      }
      else{
        timer = true;
        setTimeout(function() {
          firstCard.removeAttr('data-showing').removeAttr('data-first');
          x.removeAttr('data-showing').removeAttr('data-first');
          firstCard = '';
          timer = false;
        }, 700);

      }
    }
  }

  function winning(){
    if (counter === 18){
      timer = true;
      $('.mydiv').append('<div class="win">Winner!!!</div><button type="button" class="btn btn-success">Play Again!!</button>');
      $('.btn').on('click', replay);
    }
  }

  function replay(){
    newBucket = $.merge([], bucket);
    timer = false;
    counter = 0;
    $('.mydiv').parent().nextAll().remove();
    $('.btn').remove();
    $('.win').remove();
    init();
  }
})()
