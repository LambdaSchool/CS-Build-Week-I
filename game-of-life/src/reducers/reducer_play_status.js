  
const initialState = {
    timerId: null,
    isRunning: false
  };
  
  export default (state = initialState, action) => {
    switch(action.type){
      case 'PLAY':
        return {
          timerId: action.timerId,
          isRunning: true
        };
      case 'STOP':
        return {
          timerId: null,
          isRunning: false
        };
      default:
        return state;
    }
  };