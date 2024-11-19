
const url = "https://www.omdbapi.com/?";
const key = "apikey=3695b132";

let MovieInfo = [];
let inputt = "";

// -------------------- DOM Elements ---------------
const imputtInput = document.getElementById("inputt");
const imghtml = document.getElementById("img_list");
const load = document.getElementById("load");



// Displaing Images
function getIMG(){
    try {
        
    
    let htmlString = MovieInfo
  .map((data) => {
    if(data.Poster === "N/A"){
        return `
         
            <div class="col-md-3">
                <div class="boxShadowClass"> 
                    <div class="img-block"> 
                    <a class="title" onclick='Preview("${data.imdbID}")'>
                        <img title="${data.Title}" src="http://203.193.173.125/buildriseshine/api/javascript/movie-search/assets/img/notFound.jpg" alt="" class="zoom">
                     
                        </a>
                    </div>
                </div> <span>${data.Title}</span>
            </div>
      `;
        
    }
    
          return `
         
            <div class="col-md-3">
                <div class="boxShadowClass"> 
                    <div class="img-block"> 
                    <a class="title" onclick='Preview("${data.imdbID}")'>
                        <img title="${data.Title}" src="${data.Poster}" alt="${data.Poster}" class="zoom">
                     
                        </a>
                    </div>
                </div> <span>${data.Title}</span>
            </div>
      `;
      })
      .join('');
      load.classList.add("d-none"); // Hiding loading animation
      
      imghtml.innerHTML = (htmlString);

      // incase results not found
      if(htmlString === "" ){
        document.getElementById("err").innerText = "No results Found for " + inputt;
        document.getElementById("input").focus();
      }

    }catch(err){
        imghtml.innerHTML = "";
        load.classList.add("d-none");
        document.getElementById("err").innerText = "No results Found for " + inputt;
        document.getElementById("input").focus();
    }
      
}
// Clear Card 
function Card(){
    document.getElementById("card").classList.add("d-none");
}

//Displaying Movie Details
function MovieInfoDisplay(movieInfo){
    try{

    
    console.log(movieInfo)
    if(movieInfo.Poster === "N/A"){
        document.getElementById('img').setAttribute('src', 'http://203.193.173.125/buildriseshine/api/javascript/movie-search/assets/img/notFound.jpg');
    }
    else{
        document.getElementById('img').setAttribute('src', movieInfo.Poster);
    }

   document.getElementById('title').innerText = movieInfo.Title;
   
   document.getElementById('Genre').innerText = movieInfo.Genre
   document.getElementById('Release').innerText = movieInfo.Release;
   document.getElementById('Director').innerText = movieInfo.Director;
   document.getElementById('Writer').innerText = movieInfo.Writer;
   document.getElementById('Actor').innerText = movieInfo.Actor;
   document.getElementById('Plot').innerText = movieInfo.Plot;
   document.getElementById('Rate').innerText = movieInfo.imdbRating;



document.getElementById("card").classList.remove("d-none");
}catch(er){
    console.log(er)
}
}

// Display Card
function Preview(id) {
try{


    fetch(`${url}i=${id}&${key}`)
    .then(res => res.json())
    .then(movieInfo => {

        MovieInfoDisplay(movieInfo);
        console.log(movieInfo.Response)
       
    }); 
}catch(er){
    console.log(er)
}
    
    
}






// Getting Movie Images
function getImgs(){
    try{
inputt = inputt.trim();
   // incase input null
    if(inputt === ""){
        document.getElementById("err").innerText = "please Enter a valid input";
        document.getElementById("input").focus();
    }else{
        document.getElementById("err").innerText = "";

    load.classList.remove("d-none"); // starting loading animation
    console.log(inputt)

    //https://www.omdbapi.com/?s=lion&apikey=3695b132

    fetch(`${url}s=${inputt}&${key}`)
    .then(res => res.json())
    .then(movieData => {
        if(movieData.Response){
            MovieInfo = movieData.Search;
            getIMG();
        }else{
            imghtml.innerHTML = "";
            load.classList.add("d-none");
            document.getElementById("err").innerText = "No results Found for " + inputt;
        }
       
        console.log(movieData.Response)
       
     

    }); 
}


}catch(er){
    console.log(er);
   
}
   
}

document.getElementById("input").addEventListener('keyup', (e) => {
    inputt = e.target.value;
    if(e.key === "Enter"){
       getImgs();
    }
});


function setTheme(theme) {
    document.documentElement.style.setProperty('--primary-color', theme);
    localStorage.setItem('cc-theme', theme);
}

setTheme(localStorage.getItem('cc-theme') || '#1A4B84');