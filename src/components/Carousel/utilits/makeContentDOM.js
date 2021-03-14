import React from "react";

function makeContentDOM(content, itemsPerView, loop) {
    if (!loop || content.length <= itemsPerView) {
        let editedContent =[]
        for( let i = 0; i < content.length; i++) {
            editedContent.push(
                <div key={i}>
                    {content[i]}
                </div>
            )
        }
        return editedContent
    } else {
        let infiniteContent = []
        for (let i = content.length - itemsPerView; i < content.length; i++) {
            infiniteContent.push(
                <div key={i - content.length}>
                    {content[i]}
                </div>
            )
        }
        for (let i = 0; i < content.length; i++) {
            infiniteContent.push(
                <div key={i}>
                    {content[i]}
                </div>
            )
        }
        for (let i = 0; i < itemsPerView; i++) {
            infiniteContent.push(
                <div key={i + content.length}>
                    {content[i]}
                </div>
            )
        }
        return infiniteContent
    }
}

export default makeContentDOM