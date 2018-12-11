import React , { Component } from 'react'
import styled from 'styled-components'
import Cube from './cube'

export default class GridObject extends Component {
    constructor(props){
        super(props)
        this.state = {
            nextObject: {},
            generations: 0,
            width: 15,
            length: this.width*this.width,
            array: []
        }
    }

    componentDidMount(){
        this.clear();
    }

    clear(){
        let width = this.state.width;
        let nextObj = {}
        let i;
        let nextArray = [];
        for (i = 0; i < width*width; i++){
            nextObj[i] = false;
            nextArray[i] = i;
        }
        // console.log(nextObj)
        this.setState({
            curObj: nextObj,
            length: i,
            array: nextArray,
            nexObj: nextObj,
            allFalse: nextObj,
            generations: 0,
        })
    }

    // initNextObj(){
    //     let width = this.state.width;
    //     let nextObj = {}
    //     let i;
    //     for (i = 0; i < width*width; i++){
    //         nextObj[i] = false;
    //     }
    //     this.setState({
    //         nextObj: nextObj,
    //     })
    // }

    toggle = (cubeNum) => {
        let nextObj = this.state.curObj
        nextObj[cubeNum] = true;
        this.setState({
            curObj: nextObj
        })
    }

    buildNext(){
        // this.initNextObj()
        let selected = this.getSelected();
        console.log(selected, "selected");
        let questionables = this.getQuestionables(selected);
        // console.log(questionables, "questionables");
        questionables.forEach(num => {
            this.cubeNextTick(num);
        })
// console.log(this.state.nexObj, 'nexobj in buildnext')
        this.setState({
            curObj: this.state.nexObj,
            nexObj: this.state.allFalse,
            generations: this.state.generations+1,
        })
    }

    cubeNextTick(num){
        let activeNeighbors = this.countNeighbors(num);
        // console.log(num, this.state.nexObj, activeNeighbors, "inside cubeNextTick")
        if(this.state.curObj[num] === true){//is alive
            if(activeNeighbors === 2 || activeNeighbors ===3){
                this.state.nexObj[num] = true;
            } else {
                this.state.nexObj[num] = false;
            }
        } else {//is dead

            if(activeNeighbors === 3){
                this.state.nexObj[num] = true;
            } else {
                //do nothing
            }
        }
    }

    countNeighbors(num){
        let surrounding = [];
        surrounding.push(this.state.curObj[num-this.state.width-1]);
        surrounding.push(this.state.curObj[num-this.state.width]);
        surrounding.push(this.state.curObj[num-this.state.width+1]);
        surrounding.push(this.state.curObj[num-1]);
        surrounding.push(this.state.curObj[num+1]);
        surrounding.push(this.state.curObj[num+this.state.width-1]);
        surrounding.push(this.state.curObj[num+this.state.width]);
        surrounding.push(this.state.curObj[num+this.state.width+1]);
        let count = 0;
        surrounding.forEach(bool => {
            if(bool == true){
                count = count +1;
            }

        })
        return count;
    }

    getSelected(){
        let curr = [];
        this.state.array.forEach(num => {
            if(this.state.curObj[num] === true){
                curr.push(num)
            }
        })
        return curr
    }

    getQuestionables(selected){
        let questionables = selected;
        selected.forEach(selectedNum => {
            this.checkDuplicates(questionables, selectedNum+1)
            this.checkDuplicates(questionables, selectedNum-1)
            this.checkDuplicates(questionables, selectedNum-this.state.width)
            this.checkDuplicates(questionables, selectedNum-this.state.width-1)
            this.checkDuplicates(questionables, selectedNum-this.state.width+1)
            this.checkDuplicates(questionables, selectedNum+this.state.width)
            this.checkDuplicates(questionables, selectedNum+this.state.width-1)
            this.checkDuplicates(questionables, selectedNum+this.state.width+1)
        })
        console.log("questionables at end of loop", questionables)
        return questionables;
    }

    checkDuplicates(qArray, num){
        if(qArray.includes(num)){
            //do nothing
        } else {
            if(num < 0){
                //do nothing 
            } else {
                qArray.push(num)
            }
        }
    }

    clickHandler = (e) => {
        e.preventDefault();
        switch(e.target.name){
            case "start":
                console.log("start");
                break;
            case "stop":
                console.log("stop");
                break;
            case "next":
                console.log("next");
                this.buildNext();
                break;
            case "clear":
                console.log("clear");
                this.clear();
                break;
            default: 
                // console.log("default");
                console.log("toggle", e.target.name);
                this.toggle(e.target.name);
        }
    }

    render(){
        console.log(this.state)
        return(
            <GridDiv> 
                Generation: {this.state.generations}
                <div className="buttons">
                    <button name="start" onClick={this.clickHandler}>start</button>
                    <button name="stop" onClick={this.clickHandler}>stop</button>
                    <button name="next" onClick={this.clickHandler}>next</button>
                    <button name="clear" onClick={this.clickHandler}>clear</button>
                </div>
                <div className="cubesBin">
                    {this.state.curObj ? this.state.array.map(num => {
                        return <Cube key={num} clickHandler={this.clickHandler} name={num} active={this.state.curObj[num]} />
                    }): null}
                </div>
            </GridDiv>
        )
    }
}

const GridDiv = styled.div`
    .cubesBin{
        border: 1px solid blue;
        box-sizing: border-box;
        width: 392px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
`