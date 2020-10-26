var width = 30;
var height = 30;
var canvasArr = [];
var speed = 150;
var running = false;
var count = 0
var gen = document.getElementById('counter')

function handleCellClick(e){
    if (!running){
        var pos = e.target.id.split('r')
        pos = pos[1].split('c')
        pos[0] = parseInt(pos[0])
        pos[1] = parseInt(pos[1])
        if(canvasArr[pos[0]][pos[1]] === 0){
            canvasArr[pos[0]][pos[1]] = 1
        }else{
            canvasArr[pos[0]][pos[1]] = 0
        }

        var cell = e.target
        cell.classList.toggle('on')
    }
}
var canvas = document.getElementById('canvas')
function initialize(){
    for(i = 0; i < height; i++){
        canvasArr.push([])
        var row = document.createElement('tr');
        for(j = 0; j < width; j++){
            canvasArr[i].push(0)
            var cell = document.createElement('td')
            cell.id = `r${i}c${j}`
            cell.addEventListener('click', handleCellClick)
            row.appendChild(cell)
        }
        canvas.appendChild(row)
    }
}
initialize()

function reinitialize(){
    while(canvas.firstChild){
        canvas.removeChild(canvas.firstChild)
    }
    initialize()
}
function checkAlive(x,y,arr){
    var count = 0
    if(x > 0 && y > 0 && canvasArr[y-1][x-1] === 1){
        count++
    }
    if(y > 0&& canvasArr[y-1][x] === 1){
        count++
    }
    if(y > 0 && x < width-1 !== null && canvasArr[y-1][x+1] === 1){
        count++
    }
    if(x > 0 && canvasArr[y][x-1] === 1){
        count++
    }
    if(x < width-1 && canvasArr[y][x+1] === 1){
        count++
    }
    if(y< height-1 && x > 0 !== null && canvasArr[y+1][x-1] === 1){
        count++
    }
    if(y < height-1 && arr[y+1][x] === 1){
        count++
    }
    if(y < height-1 && x < width-1 && canvasArr[y+1][x+1] === 1){
        count++
    }
    if(count < 2 || count > 3){
        if(arr[y][x] === 1){
            arr[y][x] = 0
        } 
        return {alive:false, data: arr}
    }else{ 
        if(canvasArr[y][x] < 1 && count == 3){
            arr[y][x] = 1
            return {alive: true, data: arr, counter: count}
        }else if(canvasArr[y][x] == 0 && count !== 3){
            return {alive: false, data: arr, counter: count}
        }else{
            return {alive: true, data: arr, counter: count}
        }

    }

}
function sim(){
    if(running){
        count++
        gen.innerHTML = `Generation: ${count}`
        var newArr = JSON.parse(JSON.stringify(canvasArr))
        for(y = 0; y < height; y++){
            for(x = 0; x < width; x++){
                let item = document.getElementById(`r${y}c${x}`)
                let res = checkAlive(x,y,newArr)
                newArr = res.data
                if(res.alive){
                    item.classList.add('on')
                }else{
                    item.classList.remove('on')  
                }
            }
        }
        canvasArr = newArr
    }

}