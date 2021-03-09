function animatedMove(startPoint, endPoint) {
    
    function animationStep(frameNum, startPoint, endPoint) {
        const animationFunction = (Math.sin((Math.PI / 2)* -1 + Math.PI * frameNum / 25) + 1) / 2
        const moveDistance = endPoint - startPoint
        document.querySelector('.Carousel__content').style.left = `${startPoint + moveDistance * animationFunction}px`
        console.log(document.querySelector('.Carousel__content').style.left)
    }

    let frameNum = 0

    let animation = setInterval(() => {
        frameNum = frameNum + 1
        if (frameNum >= 25) {
            clearInterval(animation)
        }
        animationStep(frameNum, startPoint, endPoint)
    }, 8);
}

export default animatedMove