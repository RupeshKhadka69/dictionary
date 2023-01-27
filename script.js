const  input =  document.querySelector('#input')
async function fetchApi(word){
    
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const updating = document.querySelector('.updating')
    updating.innerHTML = `<h4 class ="update" >updating please wait...</h4>`
    const wordTitle = document.querySelector('.word-title')
    const wordMeaning = document.querySelector('.word-meaning')
    const meaningContainer = document.querySelector('.meaning-container')
    const audio = document.querySelector('.audio')
    meaningContainer.style.display = 'none'
    try{
    const result = await fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err))
    .then((data) => {
        wordTitle.innerHTML = data[0].word
        wordMeaning.innerHTML = data[0].meanings[0].definitions[0].definition
        audio.setAttribute('src', data[0].phonetics[0].audio)
        // audio.src = data[0].phonetics[0].audio

    })
    .finally(()=> {
        updating.innerHTML = 'Type a word and press Enter'
        meaningContainer.style.display = 'block'
    })

    }
    catch(err){
        console.log(err);
        alert("please Write valid Word");
        input.value = ''

    }
    
}
input.addEventListener('keyup', (e)=> {
    e.preventDefault()
    
    if(e.target.value &&  e.key === 'Enter'){


        fetchApi(e.target.value)
    }
  
})

