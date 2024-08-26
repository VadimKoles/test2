// ИНИЦИАЛИЗАЦИЯ И ВАЖНЫЕ ПРОЦЕССЫ

// создание локального хранилища
if(!localStorage.getItem('doTransformStorage')){
    let doTransformStorage = false
    localStorage.setItem('doTransformStorage', JSON.stringify(doTransformStorage))
    // let doTransformStorage = JSON.parse(localStorage.getItem('doTransformStorage'))
}
// отслеживание прокрутки и анимация шапки
let header = document.querySelector(".nav")
let scrollTop
let doingToTop = true
window.addEventListener("scroll", function(){
    scrollTop = Math.round(window.pageYOffset)
    if ((window.innerHeight*0.27<scrollTop) && (window.innerHeight*0.3>scrollTop)) {
        transformation(true)
    } else if (scrollTop<window.innerHeight*0.21) {
        transformation(false)
    }

    if (window.innerHeight<scrollTop)  {
        if (doingToTop) {
            buttonToTop(true)
        }
    } else if (window.innerHeight*0.95>scrollTop) {
        if (!doingToTop) {
            buttonToTop(false)            
        }
    }

})

// let start, end
// let doingTranslateHeader = true
// window.addEventListener('touchstart', function(event){
//     start = event.originalEvent.touches[0].pageX
// })
// window.addEventListener('touchend', function(event){
//     end = event.originalEvent.changedTouches[0].pageX
//     if (end - start >= 100 && doingTranslateHeader){
//         translateHeader(true)
//     } else if (start - end >= 100 && !doingTranslateHeader){
//         translateHeader(false)
//     }
// })
scrollTop = Math.round(window.pageYOffset)
if (scrollTop>320) {
    let doTransformStorage = JSON.parse(localStorage.getItem('doTransformStorage'))
    if (doTransformStorage) {
        transformation(true)
    } 
}

// АНИМАЦИИ

// Плавная прокрутка
let links = document.querySelectorAll('.scroll')
links.forEach(function(element){
    element.addEventListener('click', function(event){
        event.preventDefault()
        targetID = element.getAttribute('href')
        document.querySelector(targetID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
})
// анимация закртия и открытия бургер меню
let sticks = document.querySelectorAll('.stick')
let condition = true
function forwards(){
    sticks.forEach(function(stick){
        stick.setAttribute('style', 'transform: rotate(-180deg); width: 6px; height: 6px; border-radius: 3px;') 
    })
    document.querySelector('.burger_menu_icon').style.transform = "rotate(180deg)"
    document.querySelector('.burger_menu').style.transform = "translateY(0px)"
    condition = false
}
function backwards(){
    sticks.forEach(function(stick){
        stick.setAttribute('style', 'transform: rotate(180deg); width: 35px; height: 3px; border-radius: 0px;')
    })
    document.querySelector('.burger_menu').style.transform = "translateY(-350px)"
    document.querySelector('.burger_menu_icon').style.transform = "rotate(-360deg)"
    condition = true
}
document.querySelector('.burger_menu_icon').addEventListener('click', function(){
    if(condition){
        forwards()
    }else{
        backwards()
    }
})

// анимация трансформации шапки и кнопки прокрутки
function transformation(doTransformation) {
    let doTransformStorage = JSON.parse(localStorage.getItem('doTransformStorage'))
    if (doTransformation) {
        header.setAttribute('style', 'top: 0px; position: fixed; transition: height 1s, background-color 1s; height: 50px; min-height: 50px; background-color: rgba(255, 255, 255); flex-direction: row; justify-content: space-around;')
        document.querySelector(".logo_full").src = "images/logo_main.png"
        document.querySelector(".logo_full").setAttribute('style', 'height: 40px; width: 27px; min-height: 40px;')
        document.querySelector(".naver").style.display = "none"
        document.querySelector(".logo_inscription").style.display = "block"
        document.querySelector(".burger_menu_icon").style.display = "flex"
        doTransformStorage = true
        localStorage.setItem('doTransformStorage', JSON.stringify(doTransformStorage))
    } else {
        header.setAttribute('style', 'top: 27%; position: absolute; transition: height 0.5s, min-height 0.5s, background-color 1s; height: 44%; min-height: 270px; background-color: rgba(255, 255, 255, 0.72); flex-direction: column;')
        document.querySelector(".logo_full").src = "images/logo_tsezelen_full2_gradient_sqr.png"
        document.querySelector(".logo_full").setAttribute('style', 'height: 33vh; min-height: 190px;')
        document.querySelector(".naver").style.display = "flex"
        document.querySelector(".logo_inscription").style.display = "none"
        document.querySelector(".burger_menu_icon").style.display = "none"
        doTransformStorage = false
        localStorage.setItem('doTransformStorage', JSON.stringify(doTransformStorage))
        if (!condition) {
            backwards()
        }
        // doingTranslateHeader = false
    }
}
// function translateHeader(typeOfTranslate) {
//     if (typeOfTranslate) {
//         header.style.transform = "translate(0px)"
//         doingTranslateHeader = false
//     } else {
//         header.style.transform = "translate(-100px)"
//         doingTranslateHeader = true
//     }
// }
function buttonToTop(doTransButton) {

    if (doTransButton == true) {
        document.querySelector(".scrollToTop").setAttribute('style', 'transform: translateX(0); background-color: #ffcfbdd4; box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.8);')
        document.querySelector(".imgToTop").setAttribute('style', 'transform: rotate(180deg);')
        doingToTop = false
    } else {
        document.querySelector(".scrollToTop").setAttribute('style', 'transform: translateX(14vw); background-color: #ffbba200; box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.0);')
        document.querySelector(".imgToTop").setAttribute('style', 'transform: rotate(-180deg);')
        doingToTop = true
    }
    
}

