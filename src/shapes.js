var startx = 0
var starty = 0


function beacon(){
    var arr =  [[1,1,0,0],
                [1,1,0,0],
                [0,0,1,1],
                [0,0,1,1]]
    for(y = 0, i = starty; y < arr.length; y++, i++){
        for(x = 0, j=startx; x < arr[y].length; x++, j++){
            if(arr[y][x] === 1){
                canvasArr[i][j] = 1
                let cell = document.getElementById(`r${i}c${j}`)
                cell.classList.add('on')
            }
        }
    }
    if(startx < canvasArr[0].length - 5){
        startx += 5
        starty += 0
    }else if(starty < canvasArr[0].length - 5){
        startx = 0
        starty += 5
    }else{
        startx = 0
        starty = 0
    }   
}

function blinker(){
    var arr = 
    [[0,1,0],
    [1,1,1],
    [0,1,0]]
    for(y = 0, i = starty; y < arr.length; y++, i++){
        for(x = 0, j=startx; x < arr[y].length; x++, j++){
            if(arr[y][x] === 1){
                canvasArr[i][j] = 1
                let cell = document.getElementById(`r${i}c${j}`)
                cell.classList.add('on')
            }
        }
    }
    if(startx < canvasArr[0].length - 5){
        startx += 4
        starty += 0
    }else if(starty < canvasArr[0].length - 5){
        startx = 0
        starty += 4
    }else{
        startx = 0
        starty = 0
    }  
}

function hammerHead(){

    var arr =
    [[1,1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0],
    [1,0,0,0,0,1,0,0,0,0,0,1,1,0,1,1,1,0],
    [1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0],
    [0,1,0,0,0,0,0,1,1,0,1,1,0,0,1,1,0,0],
    [0,0,0,1,1,0,0,0,0,1,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,1,0,0,1,0,0,0,0,0],
    [0,1,0,0,0,0,0,1,1,0,1,1,0,0,1,1,0,0],
    [1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0],
    [1,0,0,0,0,1,0,0,0,0,0,1,1,0,1,1,1,0],
    [1,1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0],] 
    for(y = 0, i = starty; y < arr.length; y++, i++){
        for(x = 0, j=startx; x < arr[y].length; x++, j++){
            if(arr[y][x] === 1){
                canvasArr[i][j] = 1
                let cell = document.getElementById(`r${i}c${j}`)
                cell.classList.add('on')
            }
        }
    }
    if(startx < canvasArr[0].length - startx - 15){
        startx += 15
        starty += 0
    }else if(starty < canvasArr[0].length - starty - 19){
        startx = 0
        starty += 19
    }else{
        startx = 0
        starty = 0
    }

}