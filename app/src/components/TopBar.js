import React from 'react'

export default function TopBar(props){
    return(
        <div>
            <p>
                Generation: {props.currentGeneration}
            </p>
        </div>
    )
}