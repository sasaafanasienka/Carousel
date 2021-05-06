function animatedMove(startPoint, endPoint, mode) {

    const framesNum = 15 //config the number of animation frames
    let currentFrame = 0

    function animationStep(currentframe, framesNum, startPoint, endPoint) {
        const moveDistance = endPoint - startPoint
        let animationFunction
        if (!mode || mode !== 'fastSwipe') {
            animationFunction = (Math.sin((Math.PI / 2) * -1 + Math.PI * currentframe / (framesNum - 1)) + 1) / 2 //sine function from 0 to 1
            // animationFunction = (Math.sin((Math.PI / 2) * -1 + Math.PI * currentframe / (framesNum - 1)) + 1) / 2 //sine function from 0 to 1
        } else {
            animationFunction = Math.sin(Math.PI / 2 * currentframe / (framesNum - 1))
        }
        document.querySelector('.CarouselContent').style.left = `${startPoint + moveDistance * animationFunction}px`
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