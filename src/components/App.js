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

    return (
        <div className='App'>
            <Carousel
                content={makeContentArr(10)}
                gap={20}
                itemsOnScreen={3}
                loop={true}
            />
        </div>
    );
}

export default App;