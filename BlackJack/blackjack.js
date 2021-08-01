



// function setUp(){
//   $('#cards-el').hide();
//   $('#sum-el').hide();
//   $('#card-btn').hide();
// }

// function refresh(){
//   cardsEl.textContent = `Cards: ` ;
//   sumEl.textContent = `Sum: `     ;
//   messageEl.textContent = `Want to play a round?`  ;
//   $('#cards-el').hide();
//   $('#sum-el').hide();
//   $('#card-btn').hide();
//   $('#srt-btn').show();
//   cardsArr = [] ;
//   total = ' ';
  
  
// }
 
// function startGame(){
//   $('#cards-el').show();
//   $('#sum-el').show();
//   $('#card-btn').show();
//   $('#srt-btn').hide() ;
//   draw2();
//   // renderGame();
// }

// function draw2(){
//   //execute a random number between 1 - 14 use with deck array
  
//   firstNum = Math.floor(Math.random() * 14) + 1 ;
//   secNum = Math.floor(Math.random() * 14) + 1 ;
  
//   // handle if the random numbers equal 1 or 14 which represents Ace and allowing user to choose whether the Ace will be a 1 or an 11. 
  
//   if (deck[firstNum] == 'A'){
//      handleAces(firstNum);
//   };
  
//    if (deck[secNum] == 'A'){
//      handleAces(secNum);
//    };
 
    
//   // uses the random number against the deckValue array to get the face value of the card along with the proper value - etc -- K = 10 , J = 10, Q = 10;
  
//   firstCard = getFaceCardValue(firstNum) ;
//   secCard = getFaceCardValue(secNum) ;
  
  
//   //takes face card value and adds it to thre card array to display it in card element showing player what cards they have been dealt
  
//   cardsArr.push(firstCard) ;
//   cardsArr.push(secCard)  ;
  
//   // other functions being called 
//   displayCards();
//   // computeTotal();
  

  
//   // cardsArr.push(firstNum)
// //   cardsArr.push(secNum)
// //   displayCards();
// //   displayTotal();
// //   displayMess();
// }

// //*****

let firstNum = ' ' ; 
let secNum = ' '   ;
let firstCardFaceValue = ' ' ;
let secCardFaceValue = ' ' ;
let actualValue = ' ';
let firstCardActualValue = ' ';
let secCardActualValue = ' ';
let deck = {"1": "A", "2": "2","3": "3","4": "4","5": "5","6": "6","7": "7","8": "8","9": "9","10": "10","11": "J","12": "Q","13": "K","14": "A"} ;
let deckValue = {"2" : 2, "3" : 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 10,"Q": 10, "K": 10 } ;
let leftInDeck = {"2": 4, "3": 4, "5": 4, "6": 4, "7": 4, "8": 4, "9": 4, "10": 4, "J": 4, "Q": 4, "K": 4, "A": 4 } ;
let cardsArr = [];
let totalArr = [];
let total = ' ';
let isAlive = false ;
let hasBlackJack = false ;

function setUp(){
  $('#cards-el').hide()   ;
  $('#sum-el').hide()     ;
  $('#card-btn').hide()   ;
  $('#clear-btn').hide()   ;

}

function startGame(){
   $('#cards-el').show()   ;
   $('#sum-el').show()     ;
   $('#card-btn').show()   ;
   $('#srt-btn').hide()    ;
   $('#clear-btn').show()  ;
   isAlive = true ;


    firstNum = getRandomNumber();
    secNum = getRandomNumber();
    firstCardFaceValue = findFaceCard(firstNum);
    secCardFaceValue = findFaceCard(secNum);
    firstCardActualValue = getActualCardValue(firstCardFaceValue);
    secCardActualValue = getActualCardValue(secCardFaceValue);

    
    if(firstCardFaceValue == 'A'){
      alert(`Your SECOND card is a ${secCardFaceValue}`);       
      firstCardActualValue = handleAces();
    } 
    if(secCardFaceValue == 'A'){
      alert( `Your FIRST card is a ${firstCardFaceValue}`);
      secCardActualValue = handleAces();
    }

    handleCardsDisplay(firstCardFaceValue);
    handleCardsDisplay(secCardFaceValue);
    handleTotalDisplay(firstCardActualValue);
    handleTotalDisplay(secCardActualValue);
    displayTotal();
    handleMessage();
}

function getRandomNumber(){
  return Math.floor(Math.random() * 13) + 1   ;
}

function findFaceCard(card) {
  let faceCard = deck[card]
  return faceCard ;
}

function getActualCardValue(faceCard){
  let cardValue = deckValue[faceCard]
  console.log('is this working')
  leftInDeck[cardValue] = leftInDeck[cardValue] - 1 ;
  console.log(leftInDeck)

  return cardValue ;
}

function handleAces(){
  let choice = confirm(`Choose the value of your Ace. Press Cancel for 1 and press Ok for 11`);
  if (choice == false){
    actualValue = 1;
    deckValue['A'] = actualValue ;
   console.log(leftInDeck)
    leftInDeck['A'] = leftInDeck['A'] - 1 ;
   console.log(leftInDeck)

    return deckValue['A'] ;
  }else if(choice == true){
    actualValue = 11; 
    deckValue['A'] = actualValue ;
   console.log(leftInDeck)
    leftInDeck['A'] = leftInDeck['A'] - 1 ;
   console.log(leftInDeck)

    return deckValue['A'] ;
  }
}

function handleCardsDisplay(faceCardValue){
  cardsArr.push(faceCardValue);
  $('#cards-el').text(`Cards Dealt: ${cardsArr}`)       
}

function handleTotalDisplay(actualValue){
  totalArr.push(actualValue);
  delete deckValue['A'];
}

function displayTotal(){
  total = totalArr.reduce(function(x, y){
    return x + y ;
  })
$('#sum-el').text(`Total:  ${total}`)
}  

function handleMessage(){
  if(total < 21){
    $('#message-el').text('Do you want to draw another card?') ;
  } else if (total > 21){
    $('#message-el').text( 'You Bust!! You Lose!!') ;
  } else {
    $('#message-el').text('You Got BlackJack!! You Win!!') ;
  }
} 

function refresh(){
  totalArr = [] ;
  cardsArr = [] ;
  $('#cards-el').hide()   ;
  $('#sum-el').hide()     ;
  $('#card-btn').hide()   ;
  $('#clear-btn').hide()   ;
  $('#srt-btn').show() ;
  $('#message-el').text('Want to play a round?')
}

function newCard(){
   let hitCard = getRandomNumber();
   let hitCardFaceValue = findFaceCard(hitCard);
   let hitCardActualValue = getActualCardValue(hitCardFaceValue);

   if(hitCardFaceValue == 'A'){      
      hitCardActualValue = handleAces();
  } 

    handleCardsDisplay(hitCardFaceValue);
    handleTotalDisplay(hitCardActualValue);

    displayTotal();
    handleMessage();
}

console.log('this is working')