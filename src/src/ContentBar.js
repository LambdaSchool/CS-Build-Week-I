import React, { Component } from "react";
import StartStopButton from "./StartStopButton";
import Rules from './Rules';
import About from './About';

const ContentBar = () => {
    return ( 
        <div class="flex">
            <div class="col-md-12 top">
                <span>content</span>
                <Rules />
            </div>
            <div class="col-md-12 bottom">
                <span>content</span>
                <StartStopButton />
                <About />
            </div>
        </div>
     );
}
 
export default ContentBar;