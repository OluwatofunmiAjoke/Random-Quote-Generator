const displayQuote = document.querySelector('.quoteDisplay');
const displayAuthor = document.querySelector('.authorDisplay');
const genre = document.querySelector('.genre');
// const quoteDetails = document.querySelector('.quoteDetails');
const randomBtn = document.querySelector('.randBtn');
const container = document.querySelector('.container');
const onlyAuthor = document.querySelector('.onlyAuthor');
const authorDiv = document.querySelector('.authorDiv');
const quotesDiv = document.querySelector('.quotesDiv');



//event listener for button and author/genre div when clicked
randomBtn.addEventListener('click', generateNewQuote)
displayAuthor.addEventListener('click', AuthorQuotes)

const url = "https://quote-garden.herokuapp.com/api/v3/quotes?limit=10";

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
        displayAuthor.innerHTML = randQuote.quoteAuthor;
        genre.innerHTML = randQuote.quoteGenre;
        })

    .catch(function(err){
        console.log(err)
    })

    if(displayQuote.classList.contains('hide')){
        displayAuthor.classList.remove('hide');
        displayQuote.classList.remove('hide');
        genre.classList.remove('hide');
        displayQuote.textContent = '';
        // onlyAuthor.textContent = '';
    }
    
    if(!onlyAuthor.classList.contains('hide')){
        onlyAuthor.classList.add('hide')
    }
}


//function when author is clicked to see a list of quotes from them
function AuthorQuotes(){
    let authorName = displayAuthor.textContent;
    
    if(onlyAuthor.classList.contains('hide')){
        onlyAuthor.classList.remove('hide');
        displayQuote.textContent = '';
        // onlyAuthor.textContent = '';
    }
    
    displayAuthor.classList.add('hide');
    displayQuote.classList.add('hide');
    genre.classList.add('hide');
  
    fetch(url)
    .then(res => res.json())
    .then(function(data){
        let newData = data.data;
        let quotesBy = newData.filter(dataNew => dataNew.quoteAuthor === authorName);

        // quotesBy returns an arra similar to this = [
        //     {quoteText, quoteAuthor, quoteGenre}, 
        //     {quoteText, quoteAuthor, quoteGenre},
        //     {quoteText, quoteAuthor, quoteGenre}
        // ]

        if (quotesBy.length > 0){
            authorDiv.textContent = authorName;
            onlyAuthor.appendChild(authorDiv);

            quotesBy.forEach(function (quotedeets) {
                let quoteDiv = document.createElement('div');
                quoteDiv.classList.add('quoteDiv');
                quoteDiv.textContent = `${quotedeets.quoteText}`;
                onlyAuthor.appendChild(quoteDiv);
            });

            }

        })
        // clear page text, display quote author, then display quotes with break in line

    .catch(function(err){
        console.log(err)
    })
}

//addtional feature for when genre is clicked to see a list of quotes in that genre