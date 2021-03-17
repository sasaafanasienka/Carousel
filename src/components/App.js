import React from "react";
import './App.css'
import '../styles/anyClassName.css'
import Carousel from "./Carousel/Carousel"

function App() {

    function makeContentArr(numberOfItems) {
        let contentArr = []
        for (let i = 0; i < numberOfItems; i++) {
            contentArr.push(
                <div className='anyClassName'>{i + 1}</div>
            )
        }
        return contentArr
    }

    function getRandom(min, max) {
        return Math.floor(min + Math.random() * Math.floor(max + 1 - min));
    }

    const config = {
        content: getRandom(3,10),
        gap: getRandom(0,4) * 5,
        itemsPerView: getRandom(3,5),
        loop: getRandom(0,1) === 0 ? true : false
    }

    return (
        <div className='App'>
            <h1 className='text'>Number of items: {config.content}</h1>
            <h1 className='text'>Gap: {config.gap}px</h1>
            <h1 className='text'>Items per view: {config.itemsPerView}</h1>
            <h1 className='text'>Loop: {config.loop.toString()}</h1>
            <h1 className='text'>Current settings was generated randomly. If you need to check how it works with other settings just refresh the page</h1>
            <Carousel
                gap={config.gap}
                itemsPerView={config.itemsPerView}
                loop={config.loop}
            >
                {makeContentArr(config.content)}
            </Carousel>
        </div>
    );
}

export default App;