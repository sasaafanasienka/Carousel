function animatedMove(startPoint, endPoint) {

    const framesNum = 15
    let currentFrame = 0

    function animationStep(currentframe, framesNum, startPoint, endPoint) {
        const moveDistance = endPoint - startPoint
        const animationFunction = (Math.sin((Math.PI / 2) * -1 + Math.PI * currentframe / (framesNum - 1)) + 1) / 2 //синусоида от 0 до 1
        document.querySelector('.Carousel__content').style.left = `${startPoint + moveDistance * animationFunction}px`
    }
  
    requestAnimationFrame(function animatedMove() {

        animationStep(currentFrame, framesNum, startPoint, endPoint)

        currentFrame++
        if (currentFrame < framesNum) {
            requestAnimationFrame(animatedMove);
        }
  
    });
}

export default animatedMove