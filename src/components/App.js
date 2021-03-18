import React from "react";
import './App.css'
import '../styles/anyClassName.css'
import Carousel from "./Carousel/Carousel"

function App() {

    function makeContentArr(numberOfItems) {
        return Array(numberOfItems).fill('').reduce((content, elem, i) => {
            content.push(<div key={i} className='anyClassName'>{i + 1}</div>)
            return content
        }, [])
    }

    function getRandom(min, max) {
        return Math.floor(min + Math.random() * Math.floor(max + 1 - min));
    }

    const randomConfig = {
        content: getRandom(3,10),
        gap: getRandom(0,4) * 5,
        itemsPerView: getRandom(3,5),
        loop: getRandom(0,1) === 0 ? true : false
    }

    return (
        <div className='App'>
            <h1 className='text'>Number of items: {randomConfig.content}</h1>
            <h1 className='text'>Gap: {randomConfig.gap}px</h1>
            <h1 className='text'>Items per view: {randomConfig.itemsPerView}</h1>
            <h1 className='text'>Loop: {randomConfig.loop.toString()}</h1>
            <h1 className='text'>Current settings was generated randomly. If you need to check how it works with other settings just refresh the page</h1>
            <Carousel
                gap={randomConfig.gap}
                itemsPerView={randomConfig.itemsPerView}
                loop={randomConfig.loop}
            >
                {makeContentArr(randomConfig.content)}
            </Carousel>
        </div>
    );
}

export default App;