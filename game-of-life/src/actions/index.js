export function currentState(x,y) {
    return {
      type: 'TOGGLE_ALIVE',
      x,
      y
    };
  }
  
  export function makeRandomGrid() {
    return {
      type: 'MAKE_RANDOM'
    };
  }
  
  export function tick() {
    return {
      type: 'TICK'
    };
  }
  
  export function startPlaying(timerId) {
    return {
      type: 'PLAY',
      timerId
    };
  }
  
  export function stopPlaying(timerId) {
    return {
      type: 'STOP',
      timerId
    };
  }
  
  export function clear() {
    return {
      type: 'CLEAR',
    };
  }
  
  export function resizeSmall() {
    return {
      type: 'RESIZE_SMALL',
    };
  }
  
  export function resizeMedium() {
    return {
      type: 'RESIZE_MEDIUM',
    };
  }
  
  export function resizeLarge() {
    return {
      type: 'RESIZE_LARGE',
    };
  }