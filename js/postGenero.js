const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
let navBarMobile = document.querySelector(".navBarMobile");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    nav.classList.toggle("navBarMobile");
    nav.classList.add("navBarDesfoque");
});

//chave de acesso 1º;
const apiKey = "1ecdb02654773876b7536698951ef2fc";

//chave de acesso 2º;
const tokenKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZWNkYjAyNjU0NzczODc2Yjc1MzY2OTg5NTFlZjJmYyIsIm5iZiI6MTcyMTEzNDE1Ny42NDc3NzcsInN1YiI6IjY2OTY2NTQ0N2MyYzlmY2E0NzdiOGQzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P-scjeF0_5VqZX15mcmn02OPLShq0db_YTiVAI6-WVg";

//https://api.themoviedb.org/3/movie/1022789/images?include_image_language=pt

const optionsGET = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${tokenKey}`  
    }
};  

const urlSearchParams = new URLSearchParams(window.location.search);
const postIdGenero = urlSearchParams.get("id");

console.log(postIdGenero);

const urlPictures = "https://image.tmdb.org/t/p/original"

// URL LOGO PT-BR EXEMPLO: https://api.themoviedb.org/3/movie/1022789/images?include_image_language=pt&language=pt-BR

//Função filmes populares   
//lembre-se: so deixe a função assincrona quando por consumir API, caso contrario não precisa.
//função assincrona ela da um tempo pra ela carregar, se não carregar ela retorna um erro.
async function iniciandoAPIGeneroMovies(num){
    try{
        //url filmes populares   
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=pt-BR&page=${num}&sort_by=popularity.desc&with_genres=${postIdGenero}`;    
        const response = await fetch(url, optionsGET);
        
        if(!response.ok){
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        // console.log(data);
        let movies = data.results
        // console.log(movies.length);
 
        console.log(movies);

        for(let cont = 0; cont < movies.length; cont++){
            const cartaz = await movieLogoCartaz(movies[cont]);
            if(cartaz.posters.length > 0){
                containerMovieGenero(movies[cont]);
            }
        }
            

    }catch (error){
        console.error('Erro em iniciandoAPIGeneroMovies:', error);
    }
}

async function movieLogoCartaz(movies, type = "movie"){
    try{   
        //url logos/cartaz do filme
        const urlImages = `https://api.themoviedb.org/3/${type}/${movies.id}/images?include_image_language=pt&language=pt-BR`    
        const response = await fetch(urlImages, optionsGET);
        
        if(!response.ok){
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const imageLogoCartaz = await response.json();

        // console.log("imagem logo => " + imageLogoCartaz.logos[0].file_path);
        // console.log("imagem cartaz => " + imageLogoCartaz.posters[0].file_path);
        // console.log("----------");

        // console.log(imageLogoCartaz);

        // let movies = data.results
        // console.log(movies)
        // containerLogoeCartaz(imageLogoCartaz);

        return imageLogoCartaz;

    }catch (error){
        console.error('Erro em movieImages:', error);
    }
}

async function movieDetalhe(movies, type = "movie"){
    try{   
        //url detalhe do filme
        const urlDetalhe = `https://api.themoviedb.org/3/${type}/${movies}?language=pt-BR`    
        const response = await fetch(urlDetalhe, optionsGET);
        
        if(!response.ok){
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const detalhe = await response.json();
        // console.log("titulo => " + detalhe.title);
        // console.log(detalhe);

        return detalhe;

        // let movies = data.results
        // console.log(movies);

        //tirar essas funções daqui e colocar na função containerInicial.


    }catch (error){
        console.error('Erro em movieDetalhe:', error);
    }
}

async function containerMovieGenero(movies){
    //aqui puxei as propriedades do cartaz
    const Cartaz = await movieLogoCartaz(movies);
    const detalhe = await movieDetalhe(movies.id);

    let moviesGenero = document.querySelector(".moviesGenero");
    let blockPost = document.createElement("div");
    let post = document.createElement("div");
    let divInfo = document.createElement("div");


    post.classList.add("movieCartaz");
    blockPost.classList.add("swiper-slide");
    
    post.style.backgroundImage = `url(${urlPictures}${Cartaz.posters[0].file_path})`

    blockPost.appendChild(post);
    moviesGenero.appendChild(blockPost);

    
    movieHover(blockPost, detalhe);
}

function movieHover(moviePost, detalhe){
    let divInfo = document.createElement("div");
    let divAvaliacao = document.createElement("div");
    let divNota = document.createElement("div");

    let h3 = document.createElement("h3");
    let star = document.createElement("img");
    let nota = document.createElement("span");
    let genero = document.createElement("span");

    h3.innerHTML = `${detalhe.title}`;
    star.setAttribute("src", "../assets/images/icon-star.svg");
    nota.innerHTML = `${detalhe.vote_average.toFixed(1)} |`
    genero.innerHTML = `${detalhe.genres[0].name}`

    divInfo.classList.add("infoMovie");
    divNota.classList.add("infoNota");
    genero.classList.add("infoGen");
    h3.classList.add("infoTitle");
    divAvaliacao.classList.add("infoAvaliacao");


    divNota.appendChild(star);
    divNota.appendChild(nota);

    divNota.appendChild(genero);
    
    divAvaliacao.appendChild(h3);
    divAvaliacao.appendChild(divNota);

    divInfo.appendChild(divAvaliacao);

    moviePost.appendChild(divInfo); 

    divInfo.addEventListener("click", function() {
        paginaIndividual(detalhe);
    });

    function paginaIndividual(detalhe){
        window.location.href = `/filme.html?id=${detalhe.id}`;
    }
}

for(let cont = 1; cont <= 10; cont++){
    iniciandoAPIGeneroMovies(cont);
}


window.addEventListener("scroll", (e) => {
    let navBarDesfoque = document.querySelector(".navBarDesfoque");
    let scrollY = window.scrollY;

    // Defina o valor máximo de scroll para alcançar o blur máximo de 10px
    let maxScroll = 200;

    // Calcula o blur em função do scrollY, garantindo que não passe de 10px
    let blurValue = Math.min((scrollY / maxScroll) * 10, 10);

    navBarDesfoque.style.backdropFilter = `blur(${blurValue}px)`;

});

function nomeGenero(postIdGenero){
    let h2 = document.querySelector(".container04 h2");

    switch (postIdGenero) {
        case "28":
            h2.innerHTML = "Gênero: Ação";
            break;
        case "12":
            h2.innerHTML = "Gênero: Aventura";
            break;   
        case "35":
            h2.innerHTML = "Gênero: Comédia";
            break;  
        case "16":
            h2.innerHTML = "Gênero: Animação";
            break;          
        case "10749":
            h2.innerHTML = "Gênero: Romance";
            break; 
        case "10751":
            h2.innerHTML = "Gênero: Família";
            break; 
        case "10749":
            h2.innerHTML = "Gênero: Romance";
            break;                             
        case "878":
            h2.innerHTML = "Gênero: Sci-fi";
            break;
        case "27":
            h2.innerHTML = "Gênero: Terror";
            break;
        case "53":
            h2.innerHTML = "Gênero: Suspense";
            break;    
        case "10752":
            h2.innerHTML = "Gênero: Guerra";
            break;                          
        case "80":
            h2.innerHTML = "Gênero: Crime";
            break;              
        default:
            // h2.innerHTML = "Gênero: Ficção Científica";
            break;
    }
}

nomeGenero(postIdGenero);