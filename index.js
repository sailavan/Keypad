let storeNumber='';
let storeTickets=[];
let displayElement = document.getElementById('showNumber');
let addTicketContainer = document.getElementById('ticketNumbers');


/**
 * @param Event : parameter any html or context
 * @desc SanitizeHtml helps to send valid context and prevent hacking
 * @desc hacker can't add unwanted code in the project
*/

const SanitizeHtml= input => HtmlSanitizer.SanitizeHtml(input);


/**
 * @param Event : So we can read value what endUser entered value
 * @desc Collecting added numbers and binding it into View
*/

function onClickNumberKeyPad (event){
    if(storeNumber.length<6){
        storeNumber+=event.target.textContent;
        displayElement.innerHTML = SanitizeHtml(storeNumber)
    }
}

/**
 * @desc remove each number
*/
function onRemoveNumber(){
    if(storeNumber.length!==0){
        storeNumber = storeNumber.slice(0, -1);
        displayElement.innerHTML=SanitizeHtml(storeNumber)
    }
}

/**
 * @desc Clearing All Entered Numbers
*/
function onTrashNumber(){
    storeNumber='';
    displayElement.innerHTML=SanitizeHtml(storeNumber)
}


/**
 * @desc generate tickets markup
*/

const generateTicketsMarkUp =(currenStoredTickets)=>{
    let numberViewHTML= ''
    currenStoredTickets.forEach((record,idx)=>{
        numberViewHTML+= `<div class="tickerNumSub"><div class="heading">Ticket #${idx+1}</div>`
        numberViewHTML+='<div class="eachTicket">'
        const splitedNumbers= Array.from(record);
        splitedNumbers.forEach(eachItem=>{
            const markup = `<div class="eachTicketNumber">${eachItem}</div>`;
            numberViewHTML+=markup;
            
        });
        numberViewHTML+=`<div class='delete-ticket' onclick='deleteTicket(event)' value=${record}> <span class="glyphicon glyphicon-trash"></span></div>`
        numberViewHTML+=`</div></div>`
    });
    document.getElementById('ticketNumbersContainer').innerHTML= numberViewHTML
}

/**
 * @desc Adding Ticket to display View
*/
function addTicket(){
    if(storeNumber.length>=6){
        var index = storeTickets.indexOf(storeNumber);
          if (index === -1){
            storeTickets=[...storeTickets,storeNumber];
            storeNumber='';
            displayElement.innerHTML= SanitizeHtml(storeNumber);
            generateTicketsMarkUp(storeTickets);
            document.getElementsByClassName('ticker-error')[0].classList.add('hide');
          }else{
            document.getElementsByClassName('ticker-error')[0].classList.remove('hide');
            const msg = 'dupicate ticket cannot be entered';
            document.getElementsByClassName('ticker-error')[0].innerHTML=SanitizeHtml(msg) 
          }
    }
    else if(storeNumber.length===0){
        document.getElementsByClassName('ticker-error')[0].classList.remove('hide');
        const msg = 'keypard cannot be empty';
        document.getElementsByClassName('ticker-error')[0].innerHTML= SanitizeHtml(msg) 
        
    }else{
        document.getElementsByClassName('ticker-error')[0].classList.remove('hide');
        const msg = 'numbers should be 6 digits';
        document.getElementsByClassName('ticker-error')[0].innerHTML= SanitizeHtml(msg) 
    }
    
}

/**
 * @desc deleting Ticket from display View
*/
function deleteTicket(e){
    let ticketFound = event.target.closest(`.delete-ticket`).getAttribute("value");
    var index = storeTickets.indexOf(ticketFound);
    if (index !== -1) storeTickets.splice(index, 1);
    generateTicketsMarkUp(storeTickets);
}

/**
 * @desc Generating 6 Digit Random Number
*/
function generateRandomNumber (){
    let minValue = 100000;
    let maxValue = 999999;
    let getRandomNumber = Math.floor(Math.random() * (maxValue - minValue + 1) ) + minValue;
    if(storeTickets.indexOf(getRandomNumber)===-1){
        storeNumber =String(getRandomNumber);
        displayElement.innerHTML=SanitizeHtml(storeNumber)
    } 554
}