window.onload = function () {

    function dosome(){
        document.getElementById('#stam').style.backgroundColor='red';
    }
    document.querySelector("#blackjack-hit-button").addEventListener('click', blackjackHit)
    document.querySelector("#blackjack-stand-button").addEventListener('click', DealerTurn)
    let blackjackGame = {
        'you': { 'scorspan': '#your-blackjack-resualt', 'div': '#your-box #cards', 'score': 0 },
        'dealer': { 'scorspan': '#dealer-blackjack-resualt', 'div': '#dealer-box', 'score': 0 },
        'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'j', 'q', 'k'],
        'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'k': 10, 'j': 10, 'q': 10, 'A': [1, 11] },
        'wins': 0,
        'losses': 0,    
        'draws': 0,
        'isStand': false,
        'turnOver': false,
        'MyTurn': false,
    };

    const YOU = blackjackGame['you'];
    const DEALER = blackjackGame['dealer'];

    const HitSound = new Audio('assets/swish.m4a');
    const ChasSound = new Audio('assets/cash.mp3');
    const awwSound = new Audio('assets/aww.mp3');//assets\.mp3

    document.querySelector("#blackjack-deal-button").addEventListener('click', blackjackDeal);
    function blackjackHit() {

        if (blackjackGame['isStand'] === false) {
            let Card = RandomCard();
            
            dispalycards(Card, YOU)
            updatescore(Card, YOU);
            showscore(YOU);
            blackjackGame['MyTurn'] = true;
        } else {
            blackjackGame['MyTurn'] = true;
        }
    }

    function dispalycards(Card, activPlayer) {
        if (activPlayer['score'] <= 21) {
            let cardimage = document.createElement('img');
            cardimage.src = `img/${Card}.png`;
            document.querySelector(activPlayer['div']).appendChild(cardimage);
            HitSound.play();

        } else {
            CahsSound.play();

        }

    }


    function blackjackDeal() {

        if (blackjackGame['turnOver'] === true) {

            blackjackGame['isStand'] = false;

            let Myimgags = document.querySelector("#your-box #cards").querySelectorAll('img');
            let Dealerimgags = document.querySelector("#dealer-box").querySelectorAll('img');

            for (var i = 0; i < Myimgags.length; i++) {
                Myimgags[i].remove();
            }


            for (var i = 0; i < Dealerimgags.length; i++) {
                Dealerimgags[i].remove();
            }
            YOU['score'] = 0;
            DEALER['score'] = 0;

            document.querySelector('#your-blackjack-resualt').textContent = 0;
            document.querySelector('#dealer-blackjack-resualt').textContent = 0;

            document.querySelector('#your-blackjack-resualt').style.color = '#ffff';
            document.querySelector('#dealer-blackjack-resualt').style.color = '#ffff';

            document.querySelector('#blackjack-resault').textContent = "Let's Play";
            document.querySelector('#blackjack-resault').style.color = 'black';

            blackjackGame['turnOver'] = false;
        }
    }


    function RandomCard() {
        let randomindex = Math.floor(Math.random() * 13)//0

        return blackjackGame['cards'][randomindex];
    }


    function updatescore(card, activPlayer) {

        if (card === 'A') {
            if (activPlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
                activPlayer['score'] += blackjackGame['cardsMap'][card][1];

            } else {
                activPlayer['score'] += blackjackGame['cardsMap'][card][0];
            }
        } else {
            activPlayer['score'] += blackjackGame['cardsMap'][card];
        }   

    }
    function showscore(activPlayer) {
        if (activPlayer['score'] > 21) {
            document.querySelector(activPlayer['scorspan']).textContent = 'BUST!!!';
            
            document.querySelector(activPlayer['scorspan']).style.color = 'red';
        } else {
            document.querySelector(activPlayer['scorspan']).textContent = activPlayer['score'];
        }

    }

    function sleep(ms){
        return new Promise(resolve=>setTimeout(resolve,ms))
    }


   async function DealerTurn() {
        
        if (blackjackGame['MyTurn'] != false) {
            blackjackGame['isStand'] = true;
            if (blackjackGame['isStand'] === true) {
                while (DEALER['score'] < 16) {
                    let Card = RandomCard();
                    dispalycards(Card, DEALER)
                    updatescore(Card, DEALER)
                    showscore(DEALER)

                    await sleep(1000);
                }

            }

            blackjackGame['turnOver'] = true;
            let winner = comutorwin();
            ShowResualt(winner);

        }


    }


    function comutorwin() {
        let winner;


        if (YOU['score'] <= 21 || DEALER['score'] <= 21) {

            //YOU score>dealer score
            if (YOU['score'] > DEALER['score']) {
                winner = YOU;
                blackjackGame['wins']++;
            } else if (DEALER['score'] > YOU['score']) {
                winner = DEALER;
                blackjackGame['losses']++;
            } else if (DEALER['score'] == YOU['score']) {
                blackjackGame['draws']++;
            }
            if(DEALER['score']>21){
                winner=YOU;
                blackjackGame['wins']++;
            }
            else if(YOU['score']>21){
                winner=DEALER
                blackjackGame['losses']++;
            }else if(DEALER['score']>21&&YOU['score']>21){
                blackjackGame['draws']++;
            }
            // }else  if(DEALER['score']>21&&YOU['score']<=21){
            //     blackjackGame['wins']++;
            //         winner=YOU
            // }else if(YOU['score']>21&&DEALER['score']<=21){
            //     blackjackGame['losses']++;
            //     winner=DEALER;
            // }else if(YOU['score']>21&&DEALER['score']>21){
            //     blackjackGame['draws']++;
    
            // }
           

        } 
        




        // if (YOU['score'] <= 21) {

        //     if (YOU['score'] > DEALER['score'] || DEALER['score'] > YOU['score']) {
        //         winner = YOU;
        //     } else if (YOU['score'] < DEALER['score']) {
        //         winner = DEALER;
        //     } else if (YOU['score'] < DEALER['score']) {

        //     }

        // }else if(YOU['score'] >21&& DEALER['score']<=21){
        //     winner = DEALER;
        // } else if(YOU['score'] >21&& DEALER['score']>21){
        //     winner = DEALER;
        // }
        console.log(winner)
        return winner;
    }


    function ShowResualt(winner) {

        let meessge, meessgecolor;

        if (blackjackGame['turnOver'] === true) {
            if (winner === YOU) {
                document.querySelector('#wins').textContent = blackjackGame['wins'];
                meessge = 'you won!!!';
                meessgecolor = 'green';
                ChasSound.play();
            }
            else if (winner === DEALER) {
                document.querySelector('#losses').textContent = blackjackGame['losses'];

                meessge = 'you lost!!!';
                meessgecolor = 'red';
                awwSound.play();
            }
            else {
                document.querySelector('#draws').textContent = blackjackGame['draws'];

                meessge = 'you draw!!!';
                meessgecolor = 'black';

            }

            document.querySelector('#blackjack-resault').textContent = meessge;
            document.querySelector('#blackjack-resault').style.color = meessgecolor;


        }
        //blackjackGame['turnOver']=false;
    }
   

  
}