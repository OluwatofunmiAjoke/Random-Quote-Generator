const displayQuote = document.querySelector('.quoteDisplay');
const displayAuthor = document.querySelector('.authorDisplay');
const genre = document.querySelector('.genre');
const quoteDetails = document.querySelector('.quoteDetails');
const randomBtn = document.querySelector('.randBtn')

//event listener for button and author/genre div when clicked
randomBtn.addEventListener('click', generateNewQuote)
quoteDetails.addEventListener('click', showDetails)

const url = "https://quote-garden.herokuapp.com/api/v3/quotes?limit=10000";

// function called when button is clicked
function generateNewQuote(){
    fetch(url)
    .then(res => res.json())
    .then(function(data){
        let newData = data.data;
        //get random number
        let randomNum = Math.floor(Math.random() * newData.length);
        
        let randQuote = newData[randomNum];

        displayQuote.innerHTML = randQuote.quoteText;
        displayAuthor.innerHTML = `-${randQuote.quoteAuthor}`;
        genre.innerHTML = randQuote.quoteGenre;
        })

    .catch(function(err){
        console.log(err)
    })
}


//function when author is clicked to see a list of quotes from them
function showDetails(){
    
    
}

//addtional feature for when genre is clicked to see a list of quotes in that genre