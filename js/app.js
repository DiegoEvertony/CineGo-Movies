// Animação do menu é abertura

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

const urlPictures = "https://image.tmdb.org/t/p/original"

// URL LOGO PT-BR EXEMPLO: https://api.themoviedb.org/3/movie/1022789/images?include_image_language=pt&language=pt-BR

//Função filmes populares   
//lembre-se: so deixe a função assincrona quando por consumir API, caso contrario não precisa.
//função assincrona ela da um tempo pra ela carregar, se não carregar ela retorna um erro.
async function iniciandoAPIPopular(){
    try{
        //url filmes populares   
        const url = "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1";    
        const response = await fetch(url, optionsGET);
        
        if(!response.ok){
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        // console.log(data);
        let movies = data.results
        // console.log(movies.length);
        

        let numRandom = Math.round(Math.random() * (movies.length - 1) + 0);
        // let numRandom = 14;

        let verifLogo = await movieLogoCartaz(movies[numRandom]);
        // console.log(movies[numRandom].title);

        // console.log("lenght logo => " + verifLogo.logos);

        //aqui ta verificando se tem logo em cada movie, se não tivar não vai  aparecer no "containerInicial"
        if(!verifLogo.logos.length == 0){
            containerInicial(movies[numRandom]);
        }else{
            containerInicial(movies[0 || 1]);
        }

        // containerRecomendacao(movies[0]);

        // //aqui ta puxando todos "movies" por exemplo: movies[0]...movies[20];
        // movies.map((post) =>{
        //     containerLancamentos(post);
        // })

        //aqui ta puxando todos "movies" por exemplo: movies[0]...movies[20];


        //aqui ta verificando se o filme tem posters, se não tiver não vai aparecer.


        for(let cont = 0; cont < movies.length; cont++){
            const cartaz = await movieLogoCartaz(movies[cont]);
            if(cartaz.posters.length > 0){
                containerPopular(movies[cont]);
            }
        }

        let datas = new Date();
        containerRecomendacao(movies[datas.getDay()])
        //lembre-se de deixa cada parte separada para não aver conflito.
        // setTimeout(() => {
            

    }catch (error){
        console.error('Erro em iniciandoAPIPopular:', error);
    }
}

async function iniciandoAPILancamento(){
    try{
        //url filmes Lançamentos   
        const url = "https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1&region=pt";    
        const response = await fetch(url, optionsGET);
        
        if(!response.ok){
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        // console.log(data);
        let movies = data.results
        console.log(movies);


        for(let cont = 0; cont < movies.length; cont++){
            const cartaz = await movieLogoCartaz(movies[cont]);
            if(cartaz.posters.length > 0 && movies[cont].vote_average > 0){
                containerLancamentos(movies[cont]);
            }
        }

        // cardSlider();

    }catch (error){
        console.error('Erro em iniciandoAPILancamento:', error);
    }
}

async function iniciandoAPITopRanking(){
    try{
        //url filmes Lançamentos   
        const url = "https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1&region=pt";    
        const response = await fetch(url, optionsGET);
        
        if(!response.ok){
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        // console.log(data);
        let movies = data.results
        // console.log(movies.length);


        let num = 1;

        for(let cont = 0; cont <= 10; cont++){ 
            const cartaz = await movieLogoCartaz(movies[cont]);
            if(cartaz.posters.length > 0){
                containerTopRanking(movies[cont], num++);
            }
        }


    }catch (error){
        console.error('Erro em iniciandoAPITopRanking:', error);
    }
}

async function iniciandoAPITopSeries(){
    try{
        //url filmes Lançamentos   
        const url = "https://api.themoviedb.org/3/tv/top_rated?language=pt-BR&page=1";    
        const response = await fetch(url, optionsGET);
        
        if(!response.ok){
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        // console.log(data);
        let series = data.results      


        for(let cont = 0; cont < series.length; cont++){
            const cartaz = await movieLogoCartaz(series[cont], "tv");
            if(cartaz.posters.length > 0){
                containerSeriesPopular(series[cont]);
            }
        }



    }catch (error){
        console.error('Erro em iniciandoAPITopSeries:', error);
    }
}

// ==> mandar essa função para o post.js <==
//Função para detalhes do filme
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

//função para background
async function movieImages(movies, type = "movie"){
    try{   
        //url imagens/logos/cartaz do filme
        //UMA URL SEM LINGUAGEM (null)
        const urlImages = `https://api.themoviedb.org/3/${type}/${movies.id}/images?include_image_language=null&language=pt-BR`    
        const response = await fetch(urlImages, optionsGET);
        
        if(!response.ok){
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const image = await response.json();
        // let numRandom = Math.round(Math.random() * (movies.length - 0) + 0);


        // console.log("imagem background => " + image.backdrops[0].file_path);
        // console.log(image);

        // let movies = data.results
        // console.log(movies);

        // containerBackground(image);

        return image;

    }catch (error){
        console.error('Erro em movieImages:', error);
    }
}

//função para Logos e Cartaz
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

async function iniciandoAPImovieVideos(movies, language, type = "movie"){
    try{   
        //url logos/cartaz do filme
        const urlImages = `https://api.themoviedb.org/3/movie/${movies}/videos?language=${language}`    
        const response = await fetch(urlImages, optionsGET);
        
        if(!response.ok){
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();

        const video = data.results;

        return video;

    }catch (error){
        console.error('Erro em iniciandoAPImovieVideos:', error);
    }
}


//função arrumada
async function containerInicial(movie){
    const detalhe = await movieDetalhe(movie.id);
    const image = await movieImages(movie);
    const logoCartaz = await movieLogoCartaz(movie);
    let movieVideos = await iniciandoAPImovieVideos(movie.id, "pt-BR");


    if (movieVideos.length === 0 || !movieVideos[0].key) {
        movieVideos = await iniciandoAPImovieVideos(movie.id, "en-US");
    }

    // await movieImages(detalhe);
    // await movieLogoCartaz(detalhe);
    containerDescricao(detalhe, movieVideos);
    containerBackground(image);
    containerLogo(logoCartaz, detalhe);
}



//aqui ta recebendo o movie[0];
async function containerLancamentos(movies){
    //aqui puxei as propriedades do cartaz
    const Cartaz = await movieLogoCartaz(movies);
    const detalhe = await movieDetalhe(movies.id);

    let moviesLancamentos = document.querySelector(".moviesLancamentos");
    let blockPost = document.createElement("div");
    let post = document.createElement("div");
    let divInfo = document.createElement("div");


    post.classList.add("movieCartaz");
    blockPost.classList.add("swiper-slide");
    
    post.style.backgroundImage = `url(${urlPictures}${Cartaz.posters[0].file_path})`

    blockPost.appendChild(post);
    moviesLancamentos.appendChild(blockPost);
  
    movieHover(blockPost, detalhe);

}

async function containerPopular(movies){
    //aqui puxei as propriedades do cartaz
    const Cartaz = await movieLogoCartaz(movies);
    const detalhe = await movieDetalhe(movies.id);

    let moviesPopular = document.querySelector(".moviesPopular");
    let blockPost = document.createElement("div");
    let post = document.createElement("div");
    let divInfo = document.createElement("div");


    post.classList.add("movieCartaz");
    blockPost.classList.add("swiper-slide");
    
    post.style.backgroundImage = `url(${urlPictures}${Cartaz.posters[0].file_path})`

    blockPost.appendChild(post);
    moviesPopular.appendChild(blockPost);

    
    movieHover(blockPost, detalhe);
}

async function containerTopRanking(movies, num){
    //aqui puxei as propriedades do cartaz
    const Cartaz = await movieLogoCartaz(movies);
    const detalhe = await movieDetalhe(movies.id);

    let moviesRanking = document.querySelector(".moviesRanking");
    let blockPost = document.createElement("div");
    let post = document.createElement("div");
    let divInfo = document.createElement("div");
    let number = document.createElement("h1");


    number.innerHTML = num;
    post.classList.add("movieCartazTop");
    blockPost.classList.add("swiper-slide");
    blockPost.classList.add("blockPost-slide");

    
    post.style.backgroundImage = `url(${urlPictures}${Cartaz.posters[0].file_path})`

    blockPost.appendChild(number);
    blockPost.appendChild(post);
    moviesRanking.appendChild(blockPost);


    movieInfoTop(blockPost, detalhe);

    blockPost.addEventListener("click", function() {
        paginaIndividual(detalhe);
    });

    function paginaIndividual(detalhe){
        window.location.href = `/filme.html?id=${detalhe.id}`;
    }
}

async function containerRecomendacao(movie){
    const detalhe = await movieDetalhe(movie.id);
    const image = await movieImages(movie);
    const logoCartaz = await movieLogoCartaz(movie);
    let movieVideos = await iniciandoAPImovieVideos(movie.id, "pt-BR");

    if (movieVideos.length === 0 || !movieVideos[0].key) {
        movieVideos = await iniciandoAPImovieVideos(movie.id, "en-US");
    }

    await movieImages(detalhe);
    await movieLogoCartaz(detalhe);
    containerDescricaoRecomendacao(detalhe, movieVideos);
    containerBackgroundRecomendacao(image);
    containerLogoRecomendacao(logoCartaz, detalhe);
}

async function containerSeriesPopular(movies){
    //aqui puxei as propriedades do cartaz
    const Cartaz = await movieLogoCartaz(movies, "tv");
    const detalhe = await movieDetalhe(movies.id, "tv");

    let seriesPopular = document.querySelector(".seriesPopular");
    let blockPost = document.createElement("div");
    let post = document.createElement("div");
    let divInfo = document.createElement("div");


    post.classList.add("movieCartaz");
    blockPost.classList.add("swiper-slide");
    
    post.style.backgroundImage = `url(${urlPictures}${Cartaz.posters[0].file_path})`

    blockPost.appendChild(post);
    seriesPopular.appendChild(blockPost);

    
    serieHover(blockPost, detalhe);

    blockPost.addEventListener("click", function() {
        paginaIndividual(detalhe);
    });

    function paginaIndividual(detalhe){
        window.location.href = `/serie.html?id=${detalhe.id}`;
    }
}

function serieHover(moviePost, detalhe){
    let divInfo = document.createElement("div");
    let divAvaliacao = document.createElement("div");
    let divNota = document.createElement("div");

    let h3 = document.createElement("h3");
    let star = document.createElement("img");
    let nota = document.createElement("span");
    let genero = document.createElement("span");

    h3.innerHTML = `${detalhe.name}`;
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

    // divInfo.addEventListener("click", )


}

function movieInfoTop(moviePost, detalhe){
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

    divInfo.classList.add("infoMovieTop");
    divNota.classList.add("infoNotaTop");
    genero.classList.add("infoGenTop");
    h3.classList.add("infoTitleTop");
    divAvaliacao.classList.add("infoAvaliacaoTop");


    divNota.appendChild(star);
    divNota.appendChild(nota);

    divNota.appendChild(genero);
    
    divAvaliacao.appendChild(h3);
    divAvaliacao.appendChild(divNota);

    divInfo.appendChild(divAvaliacao);

    moviePost.appendChild(divInfo); 
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

function containerBackground(movies){
    let container01 = document.querySelector(".container01");
    const num = movies.backdrops;

    function getRandomNum(arr) {
        let numRandom;
        do {
            numRandom = Math.floor(Math.random() * arr.length); // Gera um número aleatório entre 0 e 3
        } while (!arr[numRandom] || arr[numRandom].width < 1920); // Verifica se o índice existe no array
        
        return numRandom;
        
    }

    let numRandom = getRandomNum(num);

    container01.style.backgroundImage = `url(${urlPictures}${movies.backdrops[numRandom].file_path})`;
}

function containerBackgroundRecomendacao(movies) {
    let container06 = document.querySelector(".container06");
    const num = movies.backdrops;

    function getRandomNum(arr) {
        let numRandom;
        do {
            numRandom = Math.floor(Math.random() * arr.length); // Gera um número aleatório entre 0 e 3
        } while (!arr[numRandom] || arr[numRandom].width < 1920); // Verifica se o índice existe no array
        
        return numRandom;
        
    }

    // function getRandomNum(arr) {
    //     let numRandom;
    //     do {
    //         numRandom = Math.floor(Math.random() * 4); // Gera um número aleatório entre 0 e 3
    //     } while (!arr[numRandom]); // Verifica se o índice existe no array
    //     return numRandom;
    // }

    let numRandom = getRandomNum(num);

    container06.style.backgroundImage = `url(${urlPictures}${movies.backdrops[numRandom].file_path})`;
}

// function containerLogo(imageLogo){
//     let img = document.querySelector(".blockTitle img");
//     img.setAttribute("src", `${urlPictures}/${imageLogo.logos[0].file_path}`)
// }

function containerLogo(imageLogo, detalhe){
    let img = document.querySelector(".blockTitle img");
    let nameTitle = document.querySelector(".blockTitle .nameTitle");

    // console.log("jhdddjdjdjdj " + imageLogo.logos.length);

    if(imageLogo.logos.length > 0){  
        img.setAttribute("src", `${urlPictures}/${imageLogo.logos[0].file_path}`);
    }else{
        nameTitle.innerHTML = `${detalhe.title}`;
    }
}

function containerLogoRecomendacao(imageLogo, detalhe){
    let img = document.querySelector(".blockTitleRec img");
    let nameTitle = document.querySelector(".blockTitleRec .nameTitle");

    if(imageLogo.logos.length > 0){
        img.setAttribute("src", `${urlPictures}/${imageLogo.logos[0].file_path}`)
    }else{
        nameTitle.innerHTML = `${detalhe.title}`;
    }
}


function containerDescricao(movies, movieVideos){
    let durationTitle = document.querySelector("#durationTitle")
    let genresTitle = document.querySelector("#genresTitle")
    let p = document.querySelector("p#descTitle");
    let a = document.querySelector(".container01 #viewDetalhe");
    let buttonVideo = document.querySelector("#viewTrailer");
    let conteinerTrailer = document.querySelector(".viewTrailer");
    let buttonClose = document.querySelector(".conteinerVideo .button");

    p.innerHTML = movies.overview;
    durationTitle.innerHTML = coversorDeMinutosHoras(movies.runtime);
    genresTitle.innerHTML = `• ${movies.genres[0].name} • ${movies.genres[1].name}`
    paginaIndividualButton(a, movies);

    buttonVideo.addEventListener("click", (e) =>{
        e.preventDefault();
        videoTrailer(movieVideos);
    })

    buttonClose.addEventListener("click", (e) =>{
        let iframe = document.querySelector("#iframeYoutube");
        conteinerTrailer.style.display = "none";
        iframe.setAttribute("src", "");
    })

    function videoTrailer(movieVideos){
        let viewTrailer = document.querySelector(".viewTrailer");
        let iframe = document.querySelector("#iframeYoutube");
        viewTrailer.style.display = "block";
        console.log("---------------")
        console.log(movieVideos[0].key);
        iframe.setAttribute("src", `https://www.youtube.com/embed/${movieVideos[0].key}`)
    }
}

function containerDescricaoRecomendacao(movies, movieVideos){
    let durationTitle = document.querySelector("#durationTitleRec")
    let genresTitle = document.querySelector("#genresTitleRec")
    let p = document.querySelector("p#descTitleRec");
    let a = document.querySelector(".container06 #viewDetalhe");
    let buttonVideo = document.querySelector(".blockTitleRec #viewTrailer");
    let conteinerTrailer = document.querySelector(".viewTrailer");
    let buttonClose = document.querySelector(".conteinerVideo .button");

    p.innerHTML = movies.overview;
    durationTitle.innerHTML = coversorDeMinutosHoras(movies.runtime);
    genresTitle.innerHTML = `• ${movies.genres[0].name} • ${movies.genres[1].name}`;
    paginaIndividualButton(a, movies);

    buttonVideo.addEventListener("click", (e) =>{
        e.preventDefault();
        videoTrailer(movieVideos);
    })

    buttonClose.addEventListener("click", (e) =>{
        let iframe = document.querySelector("#iframeYoutube");
        conteinerTrailer.style.display = "none";
        iframe.setAttribute("src", "");
    })

    function videoTrailer(movieVideos){
        let viewTrailer = document.querySelector(".viewTrailer");
        let iframe = document.querySelector("#iframeYoutube");
        viewTrailer.style.display = "block";
        // console.log("---------------")
        // console.log(movieVideos[0].key);
        iframe.setAttribute("src", `https://www.youtube.com/embed/${movieVideos[0].key}`)
    }
}

function paginaIndividualButton(link, movie){
    link.setAttribute("href", `/filme.html?id=${movie.id}`);
}

//calcular hora
function coversorDeMinutosHoras(min) {
    const horas = Math.floor(min / 60);
    const newMin = min % 60;
    return `${horas}h${newMin}min`;
}


async function carregarFuncoes() {
    // Inicia ambas as funções de API e aguarda que ambas sejam resolvidas
    await Promise.all([
        iniciandoAPIPopular(), 
        iniciandoAPILancamento(),
        iniciandoAPITopRanking(),
        iniciandoAPITopSeries(),
    ]);

    
    // Chama a função mostrarFuncao() após ambas as funções de API serem resolvidas
    mostrarFuncao();
}

async function mostrarFuncao() {
    console.log('Todas as funções de API foram carregadas.');
    // Aqui você pode adicionar qualquer código que precisa ser executado após as funções de API
}

// Chama a função carregarFuncoes para iniciar o processo
carregarFuncoes();

// window.addEventListener("scroll", (e) =>{
//     let navBarDesfoque = document.querySelector(".navBarDesfoque");
//     if(window.scrollY > 75){
//         navBarDesfoque.style.backdropFilter = `blur(10px)`;
//     }else{
//         navBarDesfoque.style.backdropFilter = `blur(0px)`;
//     }
// })

window.addEventListener("scroll", (e) => {
    let navBarDesfoque = document.querySelector(".navBarDesfoque");
    let scrollY = window.scrollY;

    // Defina o valor máximo de scroll para alcançar o blur máximo de 10px
    let maxScroll = 200;

    // Calcula o blur em função do scrollY, garantindo que não passe de 10px
    let blurValue = Math.min((scrollY / maxScroll) * 10, 10);

    navBarDesfoque.style.backdropFilter = `blur(${blurValue}px)`;

    
});


// let container01 = document.querySelector(".container01");
// let containerHeight = container01.clientHeight;

// // console.log(containerHeight);

// let lastScrollTop = containerHeight; // Guarda a última posição do scroll

// window.addEventListener("scroll", myFunction);

// function myFunction() {
//     let currentScrollTop = document.documentElement.scrollTop;
//     let navBarDesfoque = document.querySelector(".navBarDesfoque");

    
//     if (currentScrollTop < lastScrollTop) {
//         // Rolando para baixo
//         navBarDesfoque.style.display = "flex";
//     }else{
//         navBarDesfoque.style.display = "none";

//     }
    
//     lastScrollTop = currentScrollTop; // Atualiza a última posição do scroll
// }

