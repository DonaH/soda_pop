var guesses = []
var winCounter = 0
var scoreKeeper1 = 0
var scoreKeeper2 = 0
var timeKeeper = 60
var cleanBoard
var timeStart
var playerTurn = 0
var colorBottles = ['assets/soda_yellow.jpg', 'assets/soda_green.jpg', 'assets/soda_brown.jpg',
'assets/soda_blue.jpg', 'assets/soda_orange.jpg', 'assets/soda_grey.jpg',
'assets/soda_red.jpg', 'assets/soda_purple.jpg', 'assets/soda_yellow.jpg', 'assets/soda_green.jpg',
'assets/soda_brown.jpg','assets/soda_blue.jpg','assets/soda_orange.jpg','assets/soda_grey.jpg','assets/soda_red.jpg','assets/soda_purple.jpg']
var soda = $('.soda_board')
var bottom = $('footer')

soda.hide()
bottom.hide()

$('#new_game').on('click', function(){
  setInterval(decrementTimer, 1000)
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
    if(($('.soda_board img').not('.secret').length == 16) && (scoreKeeper1 == scoreKeeper2)) {
        alert("It's a tie!")
        location.reload()
      } else {
        if (($('.soda_board img').not('.secret').length == 16) && (scoreKeeper1 >scoreKeeper2)) {
          alert('Congratulations Player 1!!! You win!')
          location.reload()
        } else {
          if (($('.soda_board img').not('.secret').length == 16) && (scoreKeeper2 >scoreKeeper1)) {
            alert('Congratulations Player 2!!! You win!')
            location.reload()
          }
        }
      }

    //console.log(timeKeeper)
  } else {
    if (scoreKeeper1 == scoreKeeper2) {
      alert("It's a tie!")
      location.reload()
    } else {
      if (scoreKeeper1 > scoreKeeper2) {
        alert('Congratulations Player 1!!! You win!')
        location.reload()
      } else {
        alert('Congratulations Player 2!!! You win!')
        location.reload()
      }
    }
    }
}

$('.bottle').click(function(){
  $(this).removeClass('secret')

  guesses.push(this)
    console.log(guesses)
    console.log($(guesses[0]).data('color'))
    console.log($(guesses[1]).data('color'))

    if(guesses.length === 2) {
      playerTurn += 1
      if($(guesses[0]).data('color') === $(guesses[1]).data('color')){
        console.log("they match")
        $(guesses[0]).off('click')
        $(guesses[1]).off('click')

        guesses = []

        if (playerTurn % 2 === 0) {
          scoreKeeper2 += 100
          console.log(scoreKeeper2)
          $('.score2').text(scoreKeeper2)

        } else {
          scoreKeeper1 += 100
          console.log(scoreKeeper1)
          $('.score1').text(scoreKeeper1)
        }

      } else {
        console.log("they don't match")
        $(guesses[0]).delay(100).queue(function(){
          $(this).addClass('secret')
        })
        $(guesses[1]).delay(100).queue(function(){
          $(this).addClass('secret')

        guesses = []
        })
      }
  }
})
