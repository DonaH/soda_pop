var guesses = []
var winCounter = 0
var scoreKeeper = 0
var timeKeeper = 40
var cleanBoard
var timeStart
var colorBottles = ['assets/soda_yellow.jpg', 'assets/soda_green.jpg', 'assets/brown.jpg',
'assets/soda_blue.jpg', 'assets/soda_orange.jpg', 'assets/soda_grey.jpg',
'assets/soda_red.jpg', 'assets/soda_purple.jpg', 'assets/soda_yellow.jpg', 'assets/soda_green.jpg', 'assets/brown.jpg',
'assets/soda_blue.jpg', 'assets/soda_orange.jpg', 'assets/soda_grey.jpg',
'assets/soda_red.jpg', 'assets/soda_purple.jpg']

// $('#new_game').on('click', game())

// <div class="container">
//   <div class="soda_board">
//     <span><img class="bottle secret" data-color="soda_yellow" src="assets/soda_yellow.jpg" /></span>

$('#new_game').on('click', function(){
  setInterval('decrementTimer()', 1000)
})

function decrementTimer() {
  if (timeKeeper > 0 && timeKeeper < 41) {
    timeKeeper -= 1
    $('.timer').text(timeKeeper)
    //console.log(timeKeeper)
  } else {
      if (winCounter === 8) {
        reset()
      }
    }
}

$('.bottle').click(function(){
  $(this).removeClass('secret')

    guesses.push(this)
    console.log(guesses)
    //console.log($(guesses[0]).data('color'))
    //console.log($(guesses[1]).data('color'))

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
          reset()
          timeKeeper = 0
        }
      }
      else {
        console.log("they don't match")
        $(guesses[0]).delay(300).queue(function(){
          $(this).addClass('secret')
        })
        $(guesses[1]).delay(300).queue(function(){
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
  location.reload()
}
