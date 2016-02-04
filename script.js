var guesses = []
var winCounter = 0
var scoreKeeper = 0
var timeKeeper = 60
var cleanBoard
var timeStart
var colorBottles = ['assets/soda_yellow.jpg', 'assets/soda_green.jpg', 'assets/soda_brown.jpg',
'assets/soda_blue.jpg', 'assets/soda_orange.jpg', 'assets/soda_grey.jpg',
'assets/soda_red.jpg', 'assets/soda_purple.jpg', 'assets/soda_yellow.jpg', 'assets/soda_green.jpg',
'assets/soda_brown.jpg','assets/soda_blue.jpg','assets/soda_orange.jpg','assets/soda_grey.jpg','assets/soda_red.jpg','assets/soda_purple.jpg']
var soda = $('.soda_board')
var bottom = $('footer')

soda.hide()
bottom.hide()

$('#new_game').on('click', function(){
  setInterval('decrementTimer()', 1000)
  soda.show()
  bottom.show()
  shuffleBottles()
})

var imageContainer = $('.soda_board img')
function shuffleBottles() {
  for (var i=0; i < imageContainer.length; i += 1){ // use a for loop to go through each img inside the soda_board
    var temp = Math.floor(Math.random()*colorBottles.length) // random index
    $(imageContainer[i]).attr('src', colorBottles[temp]).attr('data-color', colorBottles[temp])
    colorBottles.splice(temp,1)
  }
  colorBottles = ['assets/soda_yellow.jpg', 'assets/soda_green.jpg', 'assets/soda_brown.jpg',
  'assets/soda_blue.jpg', 'assets/soda_orange.jpg', 'assets/soda_grey.jpg',
  'assets/soda_red.jpg', 'assets/soda_purple.jpg', 'assets/soda_yellow.jpg', 'assets/soda_green.jpg',
  'assets/soda_brown.jpg', 'assets/soda_blue.jpg', 'assets/soda_orange.jpg', 'assets/soda_grey.jpg',
  'assets/soda_red.jpg', 'assets/soda_purple.jpg']
}

function decrementTimer() {
  if (timeKeeper > 0 && timeKeeper < 61) {
    timeKeeper -= 1
    $('.timer').text(timeKeeper)
    //console.log(timeKeeper)
  } else {
    alert("Time's up! Better luck next time.")
    location.reload()
    }
}

$('.bottle').click(function(){
  $(this).removeClass('secret')

    guesses.push(this)
    //console.log(guesses)
    console.log($(guesses[0]).data('color'))
    console.log($(guesses[1]).data('color'))

    if(guesses.length === 2) {
      if(($(guesses[0]).data('color') == $(guesses[1]).data('color')) && ($('.timer')!= 0)){
        console.log("they match")
        $(guesses[0]).off('click')
        $(guesses[1]).off('click')
        guesses = []

        scoreKeeper += 100
        console.log(scoreKeeper)
        $('.score').text(scoreKeeper)

        winCounter += 1
        if (winCounter == 8) {
          alert('Congratulations!!! You win!')
          location.reload()
        }
    } else {
        console.log("they don't match")
        $(guesses[0]).delay(300).queue(function(){
          $(this).addClass('secret')
          console.log(this)
        })
          $(guesses[1]).delay(300).queue(function(){
            $(this).addClass('secret')
            console.log(this)
            guesses = []
        })
    }
  }
})
//
// function reset() {
//   guesses = []
//   $('.score').text(0)
//   $('.timer').text(60)
//   scoreKeeper = 0
//   //clearInterval(timeStart)
//   timeKeeper = 60
//   cleanBoard = ($('.bottle').addClass('secret'))
//   winCounter = 0
// }
