function flashMove(endPoint) {
    console.log(`${endPoint}px`)
    console.log(document.querySelector('.CarouselContent'))
    document.querySelector('.CarouselContent').style.left = `${endPoint}px`
}

export default flashMove