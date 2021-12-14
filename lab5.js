function setBgToBody() {
    const body = document.body
    const slides = document.querySelectorAll('.slide')
    let activeSlide = 0
    body.style.backgroundImage = slides[activeSlide].style.backgroundImage
  }
module.exports = setBgToBody;