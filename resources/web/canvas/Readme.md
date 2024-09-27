# Screen Buffers, Canvas, and RGB

## React and Animated Canvases

How do you animate a React component?

We know the component has a lifecycle and a `render()` method and it gets
created when it is rendered or the state changes.

But what if we want to update the component several times per second?

### `requestAnimationFrame()`

There's a way in Javascript to get "frame-by-frame" callbacks. That is, once per
"frame", however long that is, you'll get a callback. It'll probably be ~30
times per second. This makes it very suitable for doing animations, as the name
suggests.

For every one time you call `requestAnimationFrame()`, your given callback will
be called. It's really common for the callback to call `requestAnimationFrame()`
to get another frame as soon as possible.

```javascript
let prevTimestamp = null;

function onAnimFrame(timestamp) {

    // Request another animation frame for the future
    requestAnimationFrame(onAnimFrame);

    // If we haven't yet stored the previous time, fake it
    if (prevTimestamp === null) {
        prevTimestamp = timestamp - 30; // milliseconds
    }

    // Compute how long it took between frames
    const elapsed = timestamp - prevTimestamp

    // Remember this for next frame
    prevTimestamp = timestamp;

    console.log(`Current time: ${timestamp} ms, frame time: ${elapsed} ms`);

    // TODO: Do animation stuff to the canvas
}

// Request the first animation frame to kick things off
requestAnimationFrame(onAnimFrame);
```

We'll be using this to change the contents in the canvas within the React
component.


### Canvas in the React Component

Having a canvas in a react component is pretty easy:

```javascript
const MyComponent = (props) => {
    const canvasRef = useRef(null)

    // ...

    /**
     * Render the canvas
     */
    
    return <canvas ref={canvasRef} width={props.width} height={props.height} />
    
    // ...
}
```

What's that weird `ref="canvas"` bit?

Turns out we can use that later in JS code to get a reference to the canvas that
was rendered. This will be very useful when we actually want to draw on it.

Inside the `requestAnimationFrame()` handler, you can refer to the canvas with:

```javascript
const canvas = canvasRef.current; // refers to the ref attribute in render()

const context = canvas.getContext('2d'); // etc.
```


### Canvas in React with `requestAnimationFrame()`

How do we merge these two things together to get animation?

We need to call `requestAnimationFrame()` one time to kick off the process, and
then we need to call it from our callback if we're still showing the component.

Fortunately, in the [React component
lifecycle](https://reactjs.org/docs/react-component.html)

We may want to even use this in many spots of our application or in other
 applications. So let's create a custom hook for it.

We'll request an initial animation frame in the `useEffect()` hook,
and we'll stop animating in the `cancelAnimation()` handler.

All `useEffect()` needs to do is call `requestAnimationFrame()`. We will then
 create and pass a cancelAnimation function to the component.
`canelAnimation()` just needs to set a continueAnimation to false which will
 stop the recursion.
 
## Exercise
### Create useAnimationCustomHook 
```javascript
import React, { useEffect, useState, useRef } from "react";

// custom hook for using animation frame
export const useAnimeFrame = ( timestamp, doAnimationCallBack ) => {
  
  // set the prev time stamp
  const [ prevTimeStamp, setTimeStamp ] = useState( timestamp - 30 );
  const continueAnimation = useRef( );
  const [ started, setStarted ] = useState( false );
  
  useEffect( () => {
    
    // only start the animation frame if we haven't in the past
    if( !started ){
      setStarted( true );
      requestAnimationFrame( onFrame );
    }
  }, [ started ] );
  
  // Request the first animation frame to kick things off
  const onFrame = ( timestamp ) => {
    
    // if we want to do more ask for the next frame
    if( continueAnimation.current ){
      requestAnimationFrame( onFrame );
    }
    const elapsed = prevTimeStamp - timestamp;
    setTimeStamp( timestamp );
    console.log( `Current time: ${ timestamp } ms, frame time: ${ elapsed } ms` );
    
    //call callback and pass it the elapsed time
    doAnimationCallBack( elapsed );
    
  };
  
  // this wills stop the hook from calling the next animation frame
  const cancelAnimation = () => {
    continueAnimation.current =  false;
  };
  
  return [ cancelAnimation ];
  
};
```

## Exercises

### Implement a React Component, useAnimeFrame, and Animated Canvas

```javascript
import React, { useRef, useState } from "react";
import { useAnimeFrame } from "../customHooks/useAnimeFrame.js";
import moment from "moment";

const MyComponent = ( props ) => {
  
  const canvasRef = useRef( null );
  
  const [ stopAnimation, setStopAnimation ] = useState( false );
  
  const doAnimation = ( elapsedTime ) => {
    console.log( "elapsed time:", elapsedTime );
    console.log( canvasRef.current );
  };
  
  const [ cancelAnimationFrame ] = useAnimeFrame( moment.now(), doAnimation );
  
  /**
   * Render the canvas
   */
  return ( 
    <div>
        <canvas ref={ canvasRef } width={ props.width }
                           height={ props.height }/> 
        <button onClick={stopAnimation}>Stop</button>
    </div>
);
};

export default MyComponent;
```

### Animate a Pixel Across the Screen

Using the above code, move a pixel repeatedly across the canvas.

Using math, make it take exactly 1 second for the pixel to move across the canvas.
