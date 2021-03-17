import React from "react";

function makeContentDOM(content, itemsPerView, loop) {
    if (!loop || content.length <= itemsPerView) {
        return Array(content.length).fill('').reduce((editedContent, currentEl, i) => {
            editedContent.push(
                <div key={i}>{content[i]}</div>
            )
            return editedContent
        }, [])
    } else {
        let infiniteContent = []
        const firstPart = content.reduce((contentArr, currentEl, i) => {
            if (i >= content.length - itemsPerView) {
                contentArr.push(<div key={i - content.length}>{content[i]}</div>)
            }
            return contentArr
        }, [])
        const centralPart = content.reduce((contentArr, currentEl, i) => {
            contentArr.push(<div key={i}>{content[i]}</div>)
            return contentArr
        }, [])
        const lastPart = content.reduce((contentArr, currentEl, i) => {
            if (i < itemsPerView) {
                contentArr.push(<div key={i + content.length}>{content[i]}</div>)
            }
            return contentArr
        }, [])
        return infiniteContent = firstPart.concat(centralPart, lastPart)
    }
}

export default makeContentDOM