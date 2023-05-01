
const key = "351335c7-8ccf-4966-b491-8e0200a691be"
const url_key = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1"
const apiUrlSerach = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="
const apiUrlMovieDetails = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"



getMovies(url_key)
async function getMovies(url) {
    const resp = await fetch(url,{
        headers:{
            "Content-Type":"application/json",
            'X-API-KEY':key,
        }
    })
    const respData = await resp.json()
    cuycTalFilmer(respData)
    
   
}

function getClassByRate(vote) {
    if(vote >= 7){
        return "green"
    }
    else if(vote > 5){
        return "orange"
    }
    else{
        return " red"
    }
}

function cuycTalFilmer(data) {
    const moviesEL = document.querySelector(".movies")
    const div = document.createElement("div")
    document.querySelector(".movies").innerHTML = ""

   
   
    data.films.forEach((movie , el)=> {
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")
        
        movieEl.innerHTML =`
        <div class="movie-cover-inner">
        <img src="${movie.posterUrlPreview}" class="movier-cover" alt="${movie.nameRu}">
        <div class="movie_cover-darkend"></div>

    </div>
    <div class="movie-info">
        <div class="movie-title">${movie.nameRu}</div>
        <div class="movie-category">${movie.genres.map(
        (genre) => `${genre.genre}`
    )}</div>
        <div class="movie-average movie-average-${getClassByRate(movie.rating)}"><b>${movie.rating}</b></div>
    </div>
        
        `
        movieEl.addEventListener("click",()=> openModal(movie.filmId))
        moviesEL.appendChild(movieEl)
   
        console.log(movie)
        movie.value = ""
       
        
    });
   
}

const form = document.querySelector("form")
const search = document.querySelector(".header-search")

form.addEventListener("submit",(e)=>{
    e.preventDefault()

    const apiSearchUrl =  `${apiUrlSerach} ${search.value}`
    if(search.value){
        getMovies(apiSearchUrl)
    }
})

let mask = document.querySelector(".mask")
window.addEventListener("load" , ()=>{
    mask.classList.add("hide")
    setTimeout(() => {
        mask.remove()
    },1200)
})

const modalEl = document.querySelector(".modal")
async function openModal(id) {
 const resp = await fetch(apiUrlMovieDetails + id,{
        headers:{
            "Content-Type":"application/json",
            'X-API-KEY':key,
        }
    })
    const respData = await resp.json()
modalEl.classList.add("modal-show")
document.body.classList.add("stop-scrolling")
modalEl.innerHTML=`
    <div class="modal-card">
        <img class ="modal-movie-backdrop" src="${respData.posterUrl}" alt="">
        <h2>
            <span class="modal-movie-title">${respData.nameRu}</span>
            <span class="modal-movie-release-year">${respData.year}</span>
        </h2>
        <ul class="modal-movie-info">
            <li class="modal-movie-genre">Жанр - ${respData.genres.map((el) => `<span>${el.genre}</span>`)}</li>
            <li class="modal-movie-runtime">Время - ${respData.filmLength}</li>
            ${respData.filmLength  ?     `<li>Сайт:<a class="modal-movie-site" href="${respData.webUrl}">${respData.webUrl}</a></li>` : ''}
            <li class="modal-movie-preview">Описание - ${respData.description}</li>
        </ul>
        <button type="button" class="modal-button-close">Закрыть</button>
    </div>    

    `
    const buttonClose = document.querySelector(".modal-button-close")
    buttonClose.addEventListener("click",()=> closeModal())
    
   
}




function closeModal() {
    modalEl.classList.remove("modal-show")
    document.body.classList.remove("stop-scrolling")
    
}
window.addEventListener("click",(e)=>{
    if(e.target === modalEl){
        closeModal()
    }
})

window.addEventListener("keyDown",(e)=>{
    if(e.keyCode === 27){
        closeModal()
    }
})

