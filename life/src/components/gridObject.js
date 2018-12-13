import React , { Component } from 'react'
import styled from 'styled-components'
import Cube from './cube'

export default class GridObject extends Component {
    constructor(props){
        super(props)
        this.state = {
            width: 15,
            time: 2000, 
            length: this.width*this.width,
            preset: null,
            presets: [
                {0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false,20:false,21:false,22: true,23:false,24:false,25:false,26:false,27:false,28:false,29:false,30:false,31:false,32:false,33:false,34:false,35:false,36:false,37: true,38:false,39:false,40:false,41:false,42:false,43:false,44:false,45:false,46:false,47:false,48:false,49:false,50:false,51:false,52: true,53:false,54:false,55:false,56:false,57:false,58:false,59:false,60:false,61:false,62:false,63:false,64:false,65:false,66:false,67: true,68:false,69:false,70:false,71:false,72:false,73:false,74:false,75:false,76:false,77:false,78:false,79:false,80:false,81:false,82: true,83:false,84:false,85:false,86:false,87:false,88:false,89:false,90:false,91:false,92:false,93:false,94:false,95:false,96:false,97: true,98:false,99:false,100:false,101:false,102:false,103:false,104:false,105:false,106:false,107:false,108:false,109:false,110:false,111:false,112: true,113:false,114:false,115:false,116:false,117:false,118:false,119:false,120:false,121:false,122:false,123:false,124:false,125:false,126:false,127: true,128:false,129:false,130:false,131:false,132:false,133:false,134:false,135:false,136:false,137:false,138:false,139:false,140:false,141:false,142: true,143:false,144:false,145:false,146:false,147:false,148:false,149:false,150:false,151:false,152:false,153:false,154:false,155:false,156:false,157: true,158:false,159:false,160:false,161:false,162:false,163:false,164:false,165:false,166:false,167:false,168:false,169:false,170:false,171:false,172: true,173:false,174:false,175:false,176:false,177:false,178:false,179:false,180:false,181:false,182:false,183:false,184:false,185:false,186:false,187: true,188:false,189:false,190:false,191:false,192:false,193:false,194:false,195:false,196:false,197:false,198:false,199:false,200:false,201:false,202: true,203:false,204:false,205:false,206:false,207:false,208:false,209:false,210:false,211:false,212:false,213:false,214:false,215:false,216:false,217:false,218:false,219:false,220:false,221:false,222:false,223:false,224:false}, 
                {0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:true,20:false,21:false,22:false,23:false,24:false,25:true,26:false,27:false,28:false,29:false,30:false,31:false,32:false,33:false,34:true,35:false,36:false,37:false,38:false,39:false,40:true,41:false,42:false,43:false,44:false,45:false,46:false,47:false,48:false,49:true,50:false,51:false,52:false,53:false,54:false,55:true,56:false,57:false,58:false,59:false,60:false,61:false,62:false,63:false,64:true,65:false,66:false,67:false,68:false,69:false,70:true,71:false,72:false,73:false,74:false,75:false,76:false,77:false,78:false,79:true,80:false,81:false,82:false,83:false,84:false,85:true,86:false,87:false,88:false,89:false,90:false,91:false,92:false,93:false,94:true,95:false,96:false,97:false,98:false,99:false,100:true,101:false,102:false,103:false,104:false,105:false,106:false,107:false,108:false,109:true,110:false,111:false,112:false,113:false,114:false,115:true,116:false,117:false,118:false,119:false,120:false,121:false,122:false,123:false,124:true,125:false,126:false,127:false,128:false,129:false,130:true,131:false,132:false,133:false,134:false,135:false,136:false,137:false,138:false,139:true,140:false,141:false,142:false,143:false,144:false,145:true,146:false,147:false,148:false,149:false,150:false,151:false,152:false,153:false,154:true,155:false,156:false,157:false,158:false,159:false,160:true,161:false,162:false,163:false,164:false,165:false,166:false,167:false,168:false,169:true,170:false,171:false,172:false,173:false,174:false,175:true,176:false,177:false,178:false,179:false,180:false,181:false,182:false,183:false,184:true,185:false,186:false,187:false,188:false,189:false,190:true,191:false,192:false,193:false,194:false,195:false,196:false,197:false,198:false,199:true,200:false,201:false,202:false,203:false,204:false,205:true,206:false,207:false,208:false,209:false,210:false,211:false,212:false,213:false,214:false,215:false,216:false,217:false,218:false,219:false,220:false,221:false,222:false,223:false,224:false}, 
                {0:false,1:false,2: false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:true,20:false,21:false,22:true,23:false,24:false,25:true,26:false,27:false,28:false,29:false,30:false,31:false,32:false,33:false,34:true,35:false,36:false,37:true,38:false,39:false,40:true,41:false,42:false,43:false,44:false,45:false,46:false,47:false,48:false,49:true,50:false,51:false,52:true,53:false,54:false,55:true,56:false,57:false,58:false,59:false,60:false,61:false,62:false,63:false,64:true,65:false,66:false,67:true,68:false,69:false,70:true,71:false,72:false,73:false,74:false,75:false,76:false,77:false,78:false,79:true,80:false,81:false,82:true,83:false,84:false,85:true,86:false,87:false,88:false,89:false,90:false,91:false,92:false,93:false,94:true,95:false,96:false,97:true,98:false,99:false,100:true,101:false,102:false,103:false,104:false,105:false,106:false,107:false,108:false,109:true,110:false,111:false,112:true,113:false,114:false,115:true,116:false,117:false,118:false,119:false,120:false,121:false,122:false,123:false,124:true,125:false,126:false,127:true,128:false,129:false,130:true,131:false,132:false,133:false,134:false,135:false,136:false,137:false,138:false,139:true,140:false,141:false,142:true,143:false,144:false,145:true,146:false,147:false,148:false,149:false,150:false,151:false,152:false,153:false,154:true,155:false,156:false,157:true,158:false,159:false,160:true,161:false,162:false,163:false,164:false,165:false,166:false,167:false,168:false,169:true,170:false,171:false,172:true,173:false,174:false,175:true,176:false,177:false,178:false,179:false,180:false,181:false,182:false,183:false,184:true,185:false,186:false,187:true,188:false,189:false,190:true,191:false,192:false,193:false,194:false,195:false,196:false,197:false,198:false,199:true,200:false,201:false,202:true,203:false,204:false,205:true,206:false,207:false,208:false,209:false,210:false,211:false,212:false,213:false,214:false,215:false,216:false,217:false,218:false,219:false,220:false,221:false,222:false,223:false,224:false},
                {0:false,1:false,2:false,3: false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:true,20:false,21:false,22:true,23:false,24:false,25:false,26:false,27:false,28:true,29:false,30:false,31:false,32:false,33:false,34:true,35:false,36:false,37:true,38:false,39:false,40:false,41:false,42:false,43:true,44:false,45:false,46:false,47:false,48:false,49:true,50:false,51:false,52:true,53:false,54:false,55:false,56:false,57:false,58:true,59:false,60:false,61:false,62:false,63:false,64:true,65:false,66:false,67:true,68:false,69:false,70:false,71:false,72:false,73:true,74:false,75:false,76:false,77:false,78:false,79:true,80:false,81:false,82:true,83:false,84:false,85:false,86:false,87:false,88:true,89:false,90:false,91:false,92:false,93:false,94:true,95:false,96:false,97:true,98:false,99:false,100:false,101:false,102:false,103:true,104:false,105:false,106:false,107:false,108:false,109:true,110:false,111:false,112:false,113:true,114:false,115:false,116:false,117:true,118:false,119:false,120:false,121:false,122:false,123:false,124:true,125:false,126:false,127:false,128:true,129:false,130:false,131:false,132:true,133:false,134:false,135:false,136:false,137:false,138:false,139:true,140:false,141:false,142:false,143:true,144:false,145:false,146:false,147:true,148:false,149:false,150:false,151:false,152:false,153:false,154:true,155:false,156:false,157:false,158:false,159:true,160:false,161:true,162:false,163:false,164:false,165:false,166:false,167:false,168:false,169:true,170:false,171:false,172:false,173:false,174:true,175:false,176:true,177:false,178:false,179:false,180:false,181:false,182:false,183:false,184:true,185:false,186:false,187:false,188:false,189:true,190:false,191:true,192:false,193:false,194:false,195:false,196:false,197:false,198:false,199:true,200:false,201:false,202:false,203:false,204:false,205:true,206:false,207:false,208:false,209:false,210:false,211:false,212:false,213:false,214:false,215:false,216:false,217:false,218:false,219:false,220:false,221:false,222:false,223:false,224:false}],
        }
    }

    componentDidMount(){
        this.init();
    }

    init(){
        let width = this.state.width;
        let initObj = {}
        let falseObj = {}
        let nexObj = {};
        let i;
        let nextArray = [];
        for (i = 0; i < width*width; i++){
            initObj[i] = false;
            falseObj[i] = false;
            nextArray[i] = i;
            nexObj[i] = false;
        }
        this.setState({
            curObj: initObj,
            length: i,
            array: nextArray,
            nexObj: nexObj,
            generations: 0,
            allFalse: falseObj
        })
    }

    toggle = (cubeNum) => {
        let monkey = {};
        monkey = this.state.curObj
        let curr = null;
        curr = this.state.curObj[cubeNum];
        monkey[cubeNum] = !curr;
        this.setState({
            curObj: monkey
        })
    }

    

    cubeNextTick(num){
        let activeNeighbors = 0;
        activeNeighbors = this.countNeighbors(num);
        if(this.state.curObj[num] === true){//is alive
            if(activeNeighbors === 2 || activeNeighbors === 3){
                let newNexObj = {};
                newNexObj = this.state.nexObj;
                newNexObj[num] = true;
                this.setState({
                    nexObj: newNexObj
                })
            } else {
                let newNexObj = {} 
                newNexObj = this.state.nexObj;
                newNexObj[num] = false;
                this.setState({
                    nexObj: newNexObj
                })
            }
        } else {//is dead
            if(activeNeighbors === 3) { 
                // console.log(num, "has 3 neighbors");
                let newNexObj = {}
                newNexObj = this.state.nexObj;
                newNexObj[num] = true;
                this.setState({
                    nexObj: newNexObj
                })
            } else {
                let newNexObj = {}
                newNexObj = this.state.nexObj;
                newNexObj[num] = false;
                this.setState({
                    nexObj: newNexObj
                })
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
            if(bool === true){
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

    buildNext = () => {
        console.log("buildNext")
        
        return new Promise(res => {
            // return setTimeout(() => res("waiting"), 1000)
            let selected = 0;
            selected = this.getSelected();
            let questionables = this.getQuestionables(selected);
            questionables.forEach(num => {
                this.cubeNextTick(num);
            })
            let allFalse = {}
            allFalse = this.state.allFalse;
            let curObj = {}
            curObj = Object.assign({}, this.state.nexObj)
            this.setState({
                curObj: curObj,
                nexObj: allFalse,
                generations: this.state.generations+1,
            })
            
            return res(selected)
        });
    }

    recursiveTimeout = async () => {
        while(recursiveCounter < 4){
            try{
                console.log("recursive timeout")
                 this.buildNext().then(res => {
                     console.log(res)
                })
                recursiveCounter+=1;
                console.log(start)
                console.log("done")
              }
              catch(error){
                console.log(error)
              }
        }
        //call recursive here?
    }
    
    clickHandler = (e) => {
        e.preventDefault();
        switch(e.target.name){
            case "start":
                // start = setInterval(() => this.buildNext(), 100)
                // start = setInterval(() => console.log("this timeer", this.state.generations+1), this.state.time)
                this.recursiveTimeout();//broken
                this.setState({
                    lock: true
                })
                break;
            case "stop":
                clearInterval(start)
                this.setState({
                    lock: false
                })
                break;
            case "next":
                this.buildNext();
                break;
            case "clear":
                this.init();
                break;
            case "+":
                this.setState({
                    time: this.state.time+1000
                })
                break;
            case "-":
                if(this.state.time !== 0){
                    this.setState({
                        time: this.state.time-1000
                    })
                }
                break;
            default: 
                if(!this.state.lock){
                    this.toggle(e.target.name);
                }
                break;
        }
    }

    selectPreset = (e) => {
        let tempObj = Object.assign({}, this.state.presets[e.target.name-1])
        this.setState({
          curObj: tempObj,
        })
    }

    render(){
        return(
            <GridDiv> 
                <h4>Generation: {this.state.generations}</h4>
                <div className="timer">
                    <span><strong>Timer increments: ~{this.state.time/1000}</strong></span>
                    <div>
                        <button name="+" onClick={this.clickHandler}>+</button>
                        <button name="-" onClick={this.clickHandler}>-</button>
                    </div>
                </div>
                <div className="buttons">
                    <button name="start" onClick={this.clickHandler} style={{border: this.state.lock?"2px solid black": null}}>start</button>
                    <button name="stop" onClick={this.clickHandler} style={{border: this.state.lock?null:"2px solid black"}}>stop</button>
                    <button name="next" onClick={this.clickHandler}>next</button>
                    <button name="clear" onClick={this.clickHandler}>clear</button>
                </div>
                <div className="cubesBin">
                    {this.state.curObj ? this.state.array.map(num => {
                        return <Cube key={num} color={this.props.color} clickHandler={this.clickHandler} name={num} active={this.state.curObj[num]} />
                    }): null}
                </div>
                <div className="buttons">
                    <button onClick={this.selectPreset} name="1">Preset 1</button>
                    <button onClick={this.selectPreset} name="2">Preset 2</button>
                    <button onClick={this.selectPreset} name="3">Preset 3</button>
                    <button onClick={this.selectPreset} name="4">Preset 4</button>
                </div>
            </GridDiv>
        )
    }
}

let start;
let ran;
let recursiveCounter = 0;

const GridDiv = styled.div`
    margin: 10px;
    h6{
        text-align: center;
    }
    .timer{
        margin: 10px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .buttons{
        display: flex;
        flex-direction: row;
        justify-items: center;
        align-content: center;
        margin: 5px 0;
        button{
            width: 100%;
        }
    }
    .cubesBin{
        border: 1px solid gray;
        box-sizing: border-box;
        width: 392px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
`