var guesses = []
var winCounter = 0
var scoreKeeper = 0
var timeKeeper = 30
var cleanBoard
var timeStart
var colorBottles = ['assets/soda_yellow.jpg', 'assets/soda_green.jpg', 'assets/soda_brown.jpg',
'assets/soda_blue.jpg', 'assets/soda_orange.jpg', 'assets/soda_grey.jpg',
'assets/soda_red.jpg', 'assets/soda_purple.jpg', 'assets/soda_yellow.jpg', 'assets/soda_green.jpg', 'assets/soda_brown.jpg',
'assets/soda_blue.jpg', 'assets/soda_orange.jpg', 'assets/soda_grey.jpg',
'assets/soda_red.jpg', 'assets/soda_purple.jpg']

// $('#new_game').on('click', game())

// <div class="container">
//   <div class="soda_board">
//     <span><img class="bottle secret" data-color="soda_yellow" src="assets/soda_yellow.jpg" /></span>
$('#new_game').on('click', function(){
  shuffleBottles()
  setInterval('decrementTimer()', 1000)
})

function decrementTimer() {
  if (timeKeeper > 0 && timeKeeper < 31) {
    timeKeeper -= 1
    $('.timer').text(timeKeeper)
    //console.log(timeKeeper)
  } else {
      if (winCounter === 8) {
        reset()
      }
    }
}
//shuffle the bottles
// var randomBottles = colorBottles[Math.floor(Math.random()*colorBottles.length)]

//   <div class="soda_board">
//     <span><img class="bottle secret" data-color="soda_yellow" src="assets/soda_yellow.jpg" /></span>

var image_container = $('.soda_board img')
function shuffleBottles() {
  for (var i=0; i < image_container.length; i += 1){ // use a for loop to go through each img inside the soda_board
    var temp = Math.floor(Math.random()*colorBottles.length) // random index
    $(image_container[i]).attr('src', colorBottles[temp]).attr('data-color', colorBottles[temp])
    colorBottles.splice(temp,1)
  }
  colorBottles = ['assets/soda_yellow.jpg', 'assets/soda_green.jpg', 'assets/soda_brown.jpg',
  'assets/soda_blue.jpg', 'assets/soda_orange.jpg', 'assets/soda_grey.jpg',
  'assets/soda_red.jpg', 'assets/soda_purple.jpg', 'assets/soda_yellow.jpg', 'assets/soda_green.jpg', 'assets/soda_brown.jpg',
  'assets/soda_blue.jpg', 'assets/soda_orange.jpg', 'assets/soda_grey.jpg',
  'assets/soda_red.jpg', 'assets/soda_purple.jpg']
}

$('.bottle').click(function(){
  $(this).removeClass('secret')

    guesses.push(this)
    console.log(guesses)
    console.log($(guesses[0]).data('color'))
    console.log($(guesses[1]).data('color'))

    if (guesses.length === 2) {
      if($(guesses[0]).data('color') === $(guesses[1]).data('color')){
        console.log("they match")
        $(guesses[0]).off('click')
        $(guesses[1]).off('click')
        guesses = []

        scoreKeeper += 100
        console.log(scoreKeeper)
        $('.score').text(scoreKeeper)

        winCounter += 1
        if (winCounter === 8) {
          alert('Congratulations!!! You win!')
          //reset()
          timeKeeper = 0
          location.reload()
        }
      }
      else {
        console.log("they don't match")
        $(guesses[0]).delay(200).queue(function(){
          $(this).addClass('secret')
        })
        $(guesses[1]).delay(200).queue(function(){
          $(this).addClass('secret')
        })
        guesses = []
    }
  }
})

function reset() {
  guesses = []
  $('.score').text(0)
  $('.timer').text(40)
  scoreKeeper = 0
  clearInterval(timeStart)
  timeKeeper = 40
  cleanBoard = ($('.bottle').addClass('secret'))
  winCounter = 0
  //$('#new_game').on('click', game())
}
