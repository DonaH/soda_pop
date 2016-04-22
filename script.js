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
  setInterval(decrementTimer, 1000) //onclick, start the game
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
  if(timeKeeper > 0 && timeKeeper < 61) {
    timeKeeper -= 1
    $('.timer').text(timeKeeper)

    if(($('.soda_board img').not('.secret').length == 16) && (scoreKeeper1 == scoreKeeper2)) { //check for tie
        alert("It's a tie!")
        location.reload()
      } else {
        if (($('.soda_board img').not('.secret').length == 16) && (scoreKeeper1 >scoreKeeper2)) { //check winner1
          alert('Congratulations Player 1!!! You win!')
          location.reload()
        } else {
          if (($('.soda_board img').not('.secret').length == 16) && (scoreKeeper2 >scoreKeeper1)) { //check winner2
            alert('Congratulations Player 2!!! You win!')
            location.reload()
          }
        }
      }

  } else {
    if (scoreKeeper1 == scoreKeeper2) {
      alert("It's a tie!") //check for tie when time's up
      location.reload()
    } else {
      if (scoreKeeper1 > scoreKeeper2) {
        alert('Congratulations Player 1!!! You win!') //check for winner1 when time's up
        location.reload()
      } else {
        alert('Congratulations Player 2!!! You win!') //check for winner2 when time's up
        location.reload()
        }
      }
    }
}

$('.bottle').click(function() {
  $(this).removeClass('secret') //unveil the bottles

  guesses.push(this) //push each click selection into array

    if(guesses.length >= 2) { // minimum value of 2 arrays
      //console.log($(guesses[0]).data('color'))
      //console.log($(guesses[1]).data('color'))

      var guess1 = $(guesses[0])
      var guess2 = $(guesses[1])

      if($(guesses[0]).data('color') === $(guesses[1]).data('color')){ //check if the bottle colors match
        playerTurn += 1 //keep track of players

        //console.log("they match")
        $(guesses[0]).off('click')  //turn off the click after it matches
        $(guesses[1]).off('click')
        guesses = [] //reset the guesses array

        if (playerTurn % 2 === 0) { //decide which player to score
          scoreKeeper2 += 100
          console.log(scoreKeeper2)
          $('.score2').text(scoreKeeper2)

        } else {
          scoreKeeper1 += 100
          console.log(scoreKeeper1)
          $('.score1').text(scoreKeeper1)
        }

      } else {
          //console.log("they don't match")
          // ref: <span><img class="bottle secret" data-color="soda_yellow-1" src="assets/soda_yellow.jpg" /></span>

          guess1.delay(400).queue(function(){ //hide the bottles when there's no match
            guess1.addClass('secret')
            guess1.addClass('secret').dequeue()

            console.log(guess1)
          })
          guess2.delay(400).queue(function(){
            guess2.addClass('secret')
            guess2.addClass('secret').dequeue()
            console.log(guess2)
          })
          guesses = [] //reset the array
        }
    }
})
