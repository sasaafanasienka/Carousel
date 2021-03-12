import React, { Component, useState } from "react";
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

    const[state, setState] = useState({
        content: getRandom(3,10),
        gap: getRandom(0,4) * 5,
        itemsOnScreen: getRandom(3,5),
        loop: getRandom(0,1) === 0 ? true : false
    })

    return (
        <div className='App'>
            <h1 className='text'>Number of items: {state.content}</h1>
            <h1 className='text'>Gap: {state.gap}px</h1>
            <h1 className='text'>Items per view: {state.itemsOnScreen}</h1>
            <h1 className='text'>Loop: {state.loop.toString()}</h1>
            <Carousel
                content={makeContentArr(state.content)}
                gap={state.gap}
                itemsOnScreen={state.itemsOnScreen}
                loop={state.loop}
            />
        </div>
    );
}

export default App;