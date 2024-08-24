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

const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("id");

console.log(postId);

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

async function movieImages(movies, type = "movie"){
    try{   
        //url imagens/logos/cartaz do filme
        //UMA URL SEM LINGUAGEM (null)
        const urlImages = `https://api.themoviedb.org/3/${type}/${movies}/images?include_image_language=null&language=pt-BR`    
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

async function iniciandoAPICreditos(movies, type = "movie"){
    try{
        //url filmes Lançamentos   
        const url = `https://api.themoviedb.org/3/${type}/${movies}/credits?language=pt-BR`;    
        const response = await fetch(url, optionsGET);
        
        if(!response.ok){
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        // console.log(data);
        let credito = data;

        // console.log(credito);

        return credito;


    }catch (error){
        console.error('Erro em iniciandoAPICreditos:', error);
    }
}

//função para Logos e Cartaz
async function movieLogoCartaz(movies, type = "movie"){
    try{   
        //url logos/cartaz do filme
        const urlImages = `https://api.themoviedb.org/3/movie/${movies}/images?include_image_language=pt&language=pt-BR`    
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


async function iniciandoAPIMoviesSemelhante(postId, type = "movie"){
    try{
        //url filmes populares   
        const url = `https://api.themoviedb.org/3/movie/${postId}/similar?language=en-US&page=1`;    
        const response = await fetch(url, optionsGET);
        
        if(!response.ok){
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        // console.log(data);
        let movies = data.results
        // console.log(movies.length);
    
        for(let cont = 0; cont < movies.length; cont++){
            const cartaz = await movieLogoCartaz(movies[cont].id);
            if(cartaz.posters.length > 0){
                // console.log(movies);
                containerSemelhantes(movies[cont]);
            }
        }


    }catch (error){
        console.error('Erro em iniciandoAPIMoviesSemelhante:', error);
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


async function containerSemelhantes(movies){
    //aqui puxei as propriedades do cartaz
    const Cartaz = await movieLogoCartaz(movies.id);
    const detalhe = await movieDetalhe(movies.id);
    let conteiner = document.querySelector(".container04");

    conteiner.style.display = "block";

    let moviesSemelhante = document.querySelector(".moviesSemelhante");
    let blockPost = document.createElement("div");
    let post = document.createElement("div");
    let divInfo = document.createElement("div");


    post.classList.add("movieCartaz");
    blockPost.classList.add("swiper-slide");
    
    post.style.backgroundImage = `url(${urlPictures}${Cartaz.posters[0].file_path})`

    blockPost.appendChild(post);
    moviesSemelhante.appendChild(blockPost);

    
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


async function documentTitle(postId){
    let detalhe = await movieDetalhe(postId);
    const titles = document.getElementsByTagName("title");
    titles[0].innerHTML = `${detalhe.title} - CineGo!`;
}

async function containerInicial(postId){
    const detalhe = await movieDetalhe(postId);
    const image = await movieImages(postId);
    const logoCartaz = await movieLogoCartaz(postId);

    let movieVideos = await iniciandoAPImovieVideos(postId, "pt-BR");

    // Se a lista de vídeos estiver vazia ou não houver uma chave válida, tente com "en-US"
    if (movieVideos.length === 0 || !movieVideos[0].key) {
        movieVideos = await iniciandoAPImovieVideos(postId, "en-US");
    }

    console.log("chaveeeeeee  " + movieVideos[0]?.key);

    containerDescricao(detalhe, movieVideos);
    containerBackground(image);
    containerLogo(logoCartaz, detalhe);
    containerSinopse(detalhe);
}

containerElenco(postId)

async function containerElenco(movies){
    //aqui puxei as propriedades do cartaz
    const credito = await iniciandoAPICreditos(movies);



    console.log(credito.cast.length)

    for(let cont = 0; cont < credito.cast.length; cont++){

        let elencoPrincipal = document.querySelector(".elencoPrincipal");
        let blockPost = document.createElement("div");
        let post = document.createElement("div");
        let divInfo = document.createElement("div");
    
        // console.log("heeloowwww");
        post.classList.add("movieCartaz");
        blockPost.classList.add("swiper-slide");
        blockPost.classList.add("blockPost-slide");

        // se tiver img no perfil for true ele adiciona senão ele adiciona uma default    
        if (credito.cast[cont] && credito.cast[cont].profile_path) {
            post.style.backgroundImage = `url(${urlPictures}${credito.cast[cont].profile_path})`;
        } else {
            post.style.backgroundImage = "url(../assets/images/img-profile.svg)";
        }
    
        blockPost.appendChild(post);
        elencoPrincipal.appendChild(blockPost);
    
        movieInfoTop(blockPost, credito, cont);
        
    }

}

function movieInfoTop(moviePost, credito, cont){
    let divInfo = document.createElement("div");
    let divAvaliacao = document.createElement("div");

    let h3 = document.createElement("h3");
    let span = document.createElement("span");


    h3.innerHTML = `${credito.cast[cont].name}`;
    span.innerHTML = `${credito.cast[cont].character}`;

    h3.classList.add("infoTitleTop");
    span.classList.add("infoSpanTop");

    divAvaliacao.classList.add("infoAvaliacaoTop");


    
    divAvaliacao.appendChild(h3);
    divAvaliacao.appendChild(span);

    divInfo.appendChild(divAvaliacao);

    moviePost.appendChild(divInfo); 
}



function containerDescricao(movies, movieVideos){
    let durationTitle = document.querySelector("#durationTitle");
    let genresDiv = document.querySelector(".genres");
    let yearTitle = document.querySelector("#yearTitle");
    // let p = document.querySelector("p#descTitle");
    let notaTitle = document.querySelector("#notaTitle");
    let buttonVideo = document.querySelector("#viewTrailer");
    let conteinerTrailer = document.querySelector(".viewTrailer");
    let buttonClose = document.querySelector(".conteinerVideo .button");
    

    let ano = movies.release_date.split("-");

    // let a = document.querySelector(".container01 #viewDetalhe");
    notaTitle.innerHTML = `${movies.vote_average.toFixed(1)}`;
    // p.innerHTML = movies.overview;
    durationTitle.innerHTML = coversorDeMinutosHoras(movies.runtime);
    yearTitle.innerHTML = `${ano[0]}`;

    // console.log("chaveeeeeee  " + movieVideos[0].key)

    buttonVideo.addEventListener("click", (e) =>{
        e.preventDefault();
        videoTrailer(movieVideos);
    })

    buttonClose.addEventListener("click", (e) =>{
        let iframe = document.querySelector("#iframeYoutube");
        conteinerTrailer.style.display = "none";
        iframe.setAttribute("src", "");
    })

    console.log(movies.genres.length);

    for(let cont = 0; cont < movies.genres.length; cont++){
        let genresTitle = document.createElement("span");

        genresTitle.innerHTML = `${movies.genres[cont].name}`;
        genresDiv.appendChild(genresTitle);
        genresTitle.classList.add("genresTitlePost");
    }


    function videoTrailer(movieVideos){
        let viewTrailer = document.querySelector(".viewTrailer");
        let iframe = document.querySelector("#iframeYoutube");
        viewTrailer.style.display = "block";
        console.log("---------------")
        console.log(movieVideos[0].key);
        iframe.setAttribute("src", `https://www.youtube.com/embed/${movieVideos[0].key}`)
    }
}

function containerSinopse(movies){
    let sinopse = document.querySelector(".container02");
    let p = document.querySelector("p#descTitle");

    if(movies.overview != ""){
        sinopse.style.display = "block";
        p.innerHTML = movies.overview;
    }
}

function containerBackground(movies){
    let container01 = document.querySelector(".container01");
    let body = document.querySelector("body");

    const num = movies.backdrops;
    

    function getRandomNum(arr) {
        let numRandom;
        do {
            numRandom = Math.floor(Math.random() * arr.length); // Gera um número aleatório entre 0 e 3
        } while (!arr[numRandom] || arr[numRandom].width < 1920); // Verifica se o índice existe no array
        
        return numRandom;
        
    }

    let numRandom = getRandomNum(num);

    console.log("tamahanho " + movies.backdrops[numRandom].width);


    container01.style.backgroundImage = `url(${urlPictures}${movies.backdrops[numRandom].file_path})`;
    // body.style.backgroundImage = `url(${urlPictures}${movies.backdrops[numRandom].file_path})`;
}

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

function coversorDeMinutosHoras(min) {
    const horas = Math.floor(min / 60);
    const newMin = min % 60;
    return `${horas}h${newMin}min`;
}


async function carregarFuncoes(postId) {
    // Inicia ambas as funções de API e aguarda que ambas sejam resolvidas
    const [title, inicial, creditos, semelhante] = await Promise.all([
        documentTitle(postId),
        containerInicial(postId),
        iniciandoAPICreditos(postId),
        iniciandoAPIMoviesSemelhante(postId),
    ]);

    
    // Chama a função mostrarFuncao() após ambas as funções de API serem resolvidas
    mostrarFuncao();

    return {title, inicial, creditos, semelhante};
}

async function mostrarFuncao() {
    console.log('Todas as funções de API foram carregadas.');
    // Aqui você pode adicionar qualquer código que precisa ser executado após as funções de API
}

// Chama a função carregarFuncoes para iniciar o processo
carregarFuncoes(postId);


// documentTitle(postId);

// containerInicial(postId);

// iniciandoAPICreditos(postId);

// iniciandoAPIMoviesSemelhante(postId);

window.addEventListener("scroll", (e) => {
    let navBarDesfoque = document.querySelector(".navBarDesfoque");
    let scrollY = window.scrollY;

    // Defina o valor máximo de scroll para alcançar o blur máximo de 10px
    let maxScroll = 200;

    // Calcula o blur em função do scrollY, garantindo que não passe de 10px
    let blurValue = Math.min((scrollY / maxScroll) * 10, 10);

    if(navBarDesfoque != null){
        navBarDesfoque.style.backdropFilter = `blur(${blurValue}px)`;
    }
});


// document.addEventListener('DOMContentLoaded', function () {
//     const hamburger = document.querySelector('.hamburger');
//     const nav = document.querySelector('.nav');
//     const mobileMenu = document.querySelector('.mobile-menu');

//     hamburger.addEventListener('click', function () {
//         nav.classList.toggle('active');
//         mobileMenu.classList.toggle('hidden');
//     });
// });
