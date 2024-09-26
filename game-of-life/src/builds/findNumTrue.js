const trueNeighbors = (arr, x, y) => {
    const find = (val) => {
      if (val < 0) {
        return (arr.length - 1)
      }
      else if (val > arr.length - 1){
        return 0
      }
      else {
        return val
      }
    }
    const neighbors = [
      arr[find((x-1))][find((y-1))],
      arr[find((x-1))][y],
      arr[find((x-1))][find((y+1))],
      arr[find(x)][find((y-1))],
      arr[find(x)][find((y+1))],
      arr[find((x+1))][find((y-1))],
      arr[find((x+1))][y],
      arr[find((x+1))][find((y+1))]
    ]
    
      let counter = 0
      neighbors.forEach(n=>{
        if (n.status) {
          counter ++
        }
      })

    return counter
  }

export default trueNeighbors