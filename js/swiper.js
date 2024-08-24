// var swiper2 = new Swiper(".mySwiper2", {
//   slidesPerView: "auto",
//   // autoHeight: true,
//   spaceBetween: 20,
//   loop: true,
//   mousewheel: true,
//   simulateTouch: true,
//   touchEventsTarget: "container",
  
//   keyboard: {
//     enabled: false,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   //   dynamicBullets: true,
//   },
//   scrollbar: {
//       el: ".swiper-scrollbar",
//       hide: true,
//     },
//   // navigation: {
//   //   nextEl: ".swiper-button-next",
//   //   prevEl: ".swiper-button-prev",
//   // },
// });


function sliderSwiper2(){
  var swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: "auto",
    // autoHeight: true,
    spaceBetween: 20,
    loop: true,
    mousewheel: true,
    simulateTouch: true,
    touchEventsTarget: "container",
    
    keyboard: {
      enabled: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    //   dynamicBullets: true,
    },
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
  });
}


function sliderSwiper(conteinerMovie){
  const slides2 = document.querySelectorAll(`.${conteinerMovie} .swiper-slide`).length;
  const loopMode2 = slides2 > 4;

  var swiper = new Swiper(".mySwiper", {
      slidesPerView: "auto",
      // autoHeight: true,
      spaceBetween: 20,
      loop: loopMode2,
      mousewheel: true,
      grabCursor: true,
      // centeredSlides: true,
      simulateTouch: true,
      touchEventsTarget: "container",
      // autoplay: {
      //   delay: 3500,
      //   disableOnInteraction: false,
      // },
      keyboard: {
        enabled: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      //   dynamicBullets: true,
      },
      scrollbar: {
          el: ".swiper-scrollbar",
          hide: true,
        },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
  });
}

sliderSwiper("moviesLancamentos");
sliderSwiper("moviesPopular");
sliderSwiper("moviesSemelhante");
sliderSwiper2();
