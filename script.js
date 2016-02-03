var guesses = []
var winCounter = 0
var scoreKeeper = 0
var timeKeeper = 60

//game Initialize

var timeStart = window.setInterval(decrementTimer, 1000)

function decrementTimer() {
  if (timeKeeper > 0 && timeKeeper < 61) {
    timeKeeper -= 1
    $('.timer').text(timeKeeper)
    console.log(timeKeeper)
  } else {
      clearInterval(timeStart)
    }
}
//$('#new_game').click(decrementTimer())
//setInterval(decrementTimer, 1000)

//start guessing the bottles
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

        //add score
        scoreKeeper += 100
        console.log(scoreKeeper)
        $('.score').text(scoreKeeper)

        //increment the winCounter by 1 until wholeboard is matched
        winCounter += 1
          if (winCounter === 8) {
            alert('Congratulations!!! You win!')
            winCounter === 0
            clearInterval(timeStart)
          }

        } else {
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
