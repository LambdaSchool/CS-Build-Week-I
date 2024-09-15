import React from 'react';
import * as THREE from 'three';
import ThreeDClear from './ThreeDClear';
import layer1First from './layer1First';
import layer1Second from './layer1Second';
import layer2First from './layer2First';
import layer2Second from './layer2Second';
import layer3First from './layer3First';
import layer3Second from './layer3Second';

let myReq;
let myInt;
let generationCount;

class ThreeScene extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cycle: 'A',
            array1: layer1First,
            array2: layer2First,
            array3: layer3First,
            continueAnimating : false,
            buttonTag: 'Start',
            speed: 0
        }
    }

    componentDidMount = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        // add scene
        this.scene = new THREE.Scene();

        // add camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            width/height,
            1,
            1000
        )
        this.camera.position.z = 4;

        // add renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setClearColor('#1e90ff');
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);

        // add cube
        // const geometry = new THREE.BoxGeometry(.1, .1, .1);
        // const material = new THREE.MeshBasicMaterial({color: '#ffff00'});
        // this.cube = new THREE.Mesh(geometry, material);
        // this.cube.position.set(-2, -1, 0);
        // this.scene.add(this.cube);
        
        this.addCubes(this.state.array1, 1);
        this.addCubes(this.state.array2, 2);
        this.addCubes(this.state.array3, 3);

        // this.start();
    }

    componentDidUpdate = () => {
        this.addCubes(this.state.array1, 1);
        this.addCubes(this.state.array2, 2);
        this.addCubes(this.state.array3, 3);
    }

    componentWillUnmount = () => {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    }

    stop = () => {
        cancelAnimationFrame(this.frameId);
    }

    animate = () => {
        if (this.state.cycle === 'A') {
            if (this.state.continueAnimating === true) {
                myReq = requestAnimationFrame((timestamp) => {myInt = setTimeout(() => {this.animate(timestamp)}, this.state.speed)});
                this.computeNeigborsAndChangeMatrix(layer1First, layer1Second, 1);
                this.setState({array1: layer1Second});
                this.computeNeigborsAndChangeMatrix(layer2First, layer2Second, 2);
                this.setState({array2: layer2Second});
                this.computeNeigborsAndChangeMatrix(layer3First, layer3Second, 3);
                this.setState({array3: layer3Second});
                
                this.setState({cycle: 'B'});
                generationCount++;
                // console.log("layer1First[0][0]:", layer1First[0][0]);
            } else {
                cancelAnimationFrame(myReq);
            }
        } else {
            if (this.state.continueAnimating === true) {
                myReq = requestAnimationFrame((timestamp) => {myInt = setTimeout(() => {this.animate(timestamp)}, this.state.speed)});
                this.computeNeigborsAndChangeMatrix(layer1Second, layer1First, 1);
                this.setState({array1: layer1First});
                this.computeNeigborsAndChangeMatrix(layer2Second, layer2First, 2);
                this.setState({array2: layer2First});
                this.computeNeigborsAndChangeMatrix(layer3Second, layer3First, 3);
                this.setState({array3: layer3First});
                
                this.setState({cycle: 'A'});
                generationCount++;
            } else {
                cancelAnimationFrame(myReq);
            }
        }


        this.renderScene();
        // this.frameId = window.requestAnimationFrame(this.animate);
    }

    computeNeigborsAndChangeMatrix = (firstMatrix, secondMatrix, layer) => {
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                // wrap around
                let prevRow = i - 1;
                if (prevRow === -1) {
                    prevRow = 19;
                }
                let nextRow = i + 1;
                if (nextRow === 20) {
                    nextRow = 0
                }
                let prevCol = j - 1;
                if (prevCol === -1) {
                    prevCol = 19;
                }
                let nextCol = j + 1;
                if (nextCol === 20) {
                    nextCol = 0;
                }

                let prevLayer;
                if ((layer === 1) && (this.state.cycle === "A")) {
                    prevLayer = layer3First;
                } else {
                    prevLayer = layer3Second;
                }
                if ((layer === 2) && (this.state.cycle === "A")) {
                    prevLayer = layer1First;
                } else {
                    prevLayer = layer1Second;
                }
                if ((layer === 3) && (this.state.cycle === "A")) {
                    prevLayer = layer2First;
                } else {
                    prevLayer = layer2Second;
                }

                let nextLayer;
                if ((layer === 1) && (this.state.cycle === "A")) {
                    nextLayer = layer2First;
                } else {
                    nextLayer = layer2Second;
                }
                if ((layer === 2) && (this.state.cycle === "A")) {
                    nextLayer = layer3First;
                } else {
                    nextLayer = layer3Second;
                }
                if ((layer === 3) && (this.state.cycle === "A")) {
                    nextLayer = layer1First;
                } else {
                    nextLayer = layer1Second;
                }

                // count living neighbors
                let count = 0;
                if (firstMatrix[prevRow][prevCol]) {
                    count++;
                }
                if (firstMatrix[prevRow][j]) {
                    count++;
                }
                if (firstMatrix[prevRow][nextCol]) {
                    count++;
                }
                if (firstMatrix[i][prevCol]) {
                    count++;
                }
                if (firstMatrix[i][nextCol]) {
                    count++;
                }
                if (firstMatrix[nextRow][prevCol]) {
                    count++;
                }
                if (firstMatrix[nextRow][j]) {
                    count++;
                }
                if (firstMatrix[nextRow][nextCol]) {
                    count++;
                }
                if (prevLayer[prevRow][prevCol]) {
                    count++;
                }
                if (prevLayer[prevRow][j]) {
                    count++;
                }
                if (prevLayer[prevRow][nextCol]) {
                    count++;
                }
                if (prevLayer[i][prevCol]) {
                    count++;
                }
                if (prevLayer[i][j]) {
                    count++;
                }
                if (prevLayer[i][nextCol]) {
                    count++;
                }
                if (prevLayer[nextRow][prevCol]) {
                    count++;
                }
                if (prevLayer[nextRow][j]) {
                    count++;
                }
                if (prevLayer[nextRow][nextCol]) {
                    count++;
                }
                if (nextLayer[prevRow][prevCol]) {
                    count++;
                }
                if (nextLayer[prevRow][j]) {
                    count++;
                }
                if (nextLayer[prevRow][nextCol]) {
                    count++;
                }
                if (nextLayer[i][prevCol]) {
                    count++;
                }
                if (nextLayer[i][j]) {
                    count++;
                }
                if (nextLayer[i][nextCol]) {
                    count++;
                }
                if (nextLayer[nextRow][prevCol]) {
                    count++;
                }
                if (nextLayer[nextRow][j]) {
                    count++;
                }
                if (nextLayer[nextRow][nextCol]) {
                    count++;
                }

                // toggle state based on neighbors
                if ((firstMatrix[i][j] === 1) && (count < 2)) {
                    secondMatrix[i][j] = 0;
                    console.log(firstMatrix[i][j], count);
                } else if ((firstMatrix[i][j] === 1) && (count === 2 || count === 3)) {
                    secondMatrix[i][j] = 1;
                    console.log(firstMatrix[i][j], count);
                } else if ((firstMatrix[i][j] === 1) && (count > 3)) {
                    secondMatrix[i][j] = 0;
                    console.log(firstMatrix[i][j], count);
                } else if ((firstMatrix[i][j] === 0) && (count === 5)) {
                    secondMatrix[i][j] = 1;
                    console.log(firstMatrix[i][j], count);
                } else if ((firstMatrix[i][j] === 0) && (count !== 5)) {
                    secondMatrix[i][j] = 0;
                }
            }
        }
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera);
    }

    addCubes = (matrix, layer) => {
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                let cubeName = `cube.${i}.${j}`;
                let objName = `object.${i}.${j}`;
                if (matrix[i][j] === 1) {
                    const geometry = new THREE.BoxGeometry(.2, .2, .2);
                    let material;
                    if (layer === 1) {
                        material = new THREE.MeshBasicMaterial({color: '#ffff00'});
                    } else if (layer === 2) {
                        material = new THREE.MeshBasicMaterial({color: '#000000'});
                    } else {
                        material = new THREE.MeshBasicMaterial({color: '#ffffff'});
                    }
                    window[cubeName] = new THREE.Mesh(geometry, material);
                    window[objName] = new THREE.Object3D();
                    window[cubeName].position.set(j/3-3.4, 20/(i/3+3)-4.5, (layer-1)/4);
                    this.scene.add(window[cubeName]);
                    this.scene.add(window[objName]);
                } else {
                    this.scene.remove(window[objName]);
                    this.scene.remove(window[cubeName]);
                }
            }
        }
    }

    toggleButton = () => {
        if (this.state.continueAnimating === true) {
            this.setState({continueAnimating: false});
            cancelAnimationFrame(myReq);
            this.stop();
            clearInterval(myInt);
        } else {
            this.setState({continueAnimating: true});
            this.start();
            myReq = requestAnimationFrame((timestamp) => {myInt = setTimeout(() => {this.animate(timestamp)}, this.state.speed)});
        }
        if (this.state.buttonTag === 'Start') {
            this.setState({buttonTag: 'Stop'});
        } else {
            this.setState({buttonTag: 'Start'});
        }
    }

    randomize = () => {
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                layer1First[i][j] = Math.round(Math.random());
                layer2First[i][j] = Math.round(Math.random());
                layer3First[i][j] = Math.round(Math.random());
            }
        }
        this.setState( function() {
            return {array1: layer1First, array2: layer2First, array3: layer3First}}
        );

        
    }

    clearBoard = () => {
        for (let i = 0; i < 20; i++) {
            layer1First[i] = ThreeDClear[i].slice();
            layer1Second[i] = ThreeDClear[i].slice();
            layer2First[i] = ThreeDClear[i].slice();
            layer2Second[i] = ThreeDClear[i].slice();
            layer3First[i] = ThreeDClear[i].slice();
            layer3Second[i] = ThreeDClear[i].slice();
        }
        this.setState({array1: ThreeDClear});
        this.setState({array2: ThreeDClear});
        this.setState({array3: ThreeDClear});
        this.addCubes(this.state.array1, 1);
        this.addCubes(this.state.array2, 2);
        this.addCubes(this.state.array3, 3);
    }
    

    render() {
        return(
            <div>
                <div style={{width: '1500px', height: '1000px'}} ref={(mount) => {this.mount = mount}} className="ThreeDDiv">
                    
                </div>
                <div>
                    <button onClick={this.toggleButton}>{this.state.buttonTag}</button>
                    <button onClick={() => this.randomize()}>Random</button>
                    <button onClick={this.clearBoard}>Clear</button>
                </div>
            </div>
        )
    }
}

export default ThreeScene;