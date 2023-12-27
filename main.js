const totalCards = 14;
const letras = ['A', 'K', 'Q', 'J']; 
let cards = [];
let selectorCards = [];
let valueUsed = [];
let currentMove = 0;
let currentAttempts = 0;

let cardsTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>'

function activate(e){
    if(currentMove < 2){
        if((!selectorCards [0] || selectorCards [0] !== e.target ) && !e.target.classList.contains('active')){
            e.target.classList.add('active');
            selectorCards.push(e.target);
            if(++currentMove == 2){
                currentAttempts++;
                document.querySelector('.start').innerHTML= 'Llevas '+ currentAttempts + ' Intentos Jherson';
                if(selectorCards[0].querySelectorAll('.face')[0].innerHTML == selectorCards[1].querySelectorAll('.face')[0].innerHTML){
                    selectorCards = [];
                    currentMove = 0;
                }
                else{
                    setTimeout(() =>{
                        selectorCards[0].classList.remove('active');
                        selectorCards[1].classList.remove('active');
                        selectorCards = [];
                        currentMove = 0;
                    }, 600)                    
                }
            }
        }
    }
}

function randomValue (){
    let rnd = Math.floor(Math.random() * totalCards * 0.5);
    let valuese = valueUsed.filter(value => value === rnd);
    if(valuese.length < 2){
        valueUsed.push(rnd);
    }
    else{
        randomValue();
    }
}

function getFacevalue (value) {
    let rtn = value;
    if(value < letras.length) {
        rtn = letras[value];
    }
    return rtn;
}

for(let i=0; i < totalCards; i++){
    let div = document.createElement('div');
    div.innerHTML = cardsTemplate;
    cards.push(div);
    document.querySelector('.game').append(cards[i]);
    randomValue();
    cards[i].querySelectorAll('.face')[0].innerHTML = getFacevalue(valueUsed[i]);
    cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}