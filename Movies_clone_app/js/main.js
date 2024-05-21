'use strict';
const searchEL=document.getElementById('Search');
const formEL=document.getElementById('form');
const MoviesContainer=document.querySelector('.movies-details');
const TvContainer=document.querySelector('.Tv-details');
const paginationEL=document.querySelectorAll('.paginations ul li');

//api key : 28e38f65a5d0c15eccb1de94e31190e5

//https://image.tmdb.org/t/p/w1280

const MoviesAPI='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=28e38f65a5d0c15eccb1de94e31190e5&page=';
const imagepath='https://image.tmdb.org/t/p/w1280';
const searchUrl='https://api.themoviedb.org/3/search/movie?api_key=28e38f65a5d0c15eccb1de94e31190e5&query="';
const TvShowsAPI='https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=28e38f65a5d0c15eccb1de94e31190e5&page=';
const searchTvShows='https://api.themoviedb.org/3/search/tv?api_key=28e38f65a5d0c15eccb1de94e31190e5&query="';


getMovies(MoviesAPI);


//get movies function
async function getMovies(url){
    try{
        const result=await fetch(url);
        const data=await result.json();
        showMovies(data.results)
    }
    catch(error){}
}

//showing the movies
function showMovies(movies){
    MoviesContainer.innerHTML='';
    movies.forEach((movie) => {
        const {title,poster_path,vote_average,release_date
        }=movie;
        const MoviesDisplay=document.createElement('div');
        MoviesDisplay.classList.add('movies');
        MoviesDisplay.innerHTML=`<img src="${imagepath+poster_path}" alt="" />
        <p class="movie-title">${title}</p>
        <div class="short-desc">
          <p class="year">Date : ${release_date}</p>
          <p class="rating">Rating : ${vote_average}</p>
        </div>`;
        MoviesContainer.appendChild(MoviesDisplay);
    });
}
//search element
formEL.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm=searchEL.value;
    if(searchTerm && searchTerm !=''){
        getMovies(searchUrl+searchTerm);
        getTvShows(searchTvShows+searchTerm);
        searchEL.value='';
    }
    else{
        window.Location.reload();
    }
})


//tv shows
getTvShows(TvShowsAPI);
async function getTvShows(url){
    try{
        const result=await fetch(url);
        const data=await result.json();
        showTvShows(data.results)
        
    }
    catch(error){}
}


function showTvShows(tvShows){
    TvContainer.innerHTML='';
    tvShows.forEach((tvShow)=>{
        const {name,poster_path,vote_average,first_air_date}=tvShow;
        const tvShowDisplay=document.createElement('div')
        tvShowDisplay.classList.add('tvShows');
        tvShowDisplay.innerHTML=` <img src="${imagepath+poster_path}" alt="" />
        <p class="movie-title">${name}</p>
        <div class="short-desc">
          <p class="year">Date : ${first_air_date}</p>
          <p class="rating">Rating : ${vote_average}</p>
        </div>`;
        TvContainer.appendChild(tvShowDisplay);
    })
}


// pagination
paginationEL.forEach((pages,index)=>{
    pages.addEventListener('click',()=>{
        if(getMovies){
            getMovies(MoviesAPI+index);
        }
        getTvShows(TvShowsAPI+index);
    });
});