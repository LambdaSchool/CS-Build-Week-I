(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{194:function(e,t,a){e.exports=a(351)},199:function(e,t,a){},349:function(e,t,a){},351:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(17),o=a.n(r),s=(a(199),a(18)),l=a(19),c=a(21),d=a(20),m=a(22),u=a(14),h=a(45),p=a.n(h),g=a(5),v=a(116),f=a.n(v),b=a(115),y=a.n(b),E=a(117),S=a.n(E),C=a(114),G=a.n(C),x=a(118),k=a.n(x),A=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(d.a)(t).call(this))).toggleGrid=function(){var t=e.state.curGrid;e.state.nextGrid;"Grid"===t?t="NextGrid":t="Grid",e.setState({curGrid:t})},e.createGrid=function(){var t=e.props.componentWidth,a=e.props.componentHeight;t=Math.round(Math.floor(t/e.state.gridSize)),a=Math.round(Math.floor(a/e.state.gridSize));for(var n=[],i=0,r=0,o=0;o<t;o++){0!==o&&(i+=e.state.gridSize);for(var s=[],l=0;l<a;l++)0===l?r=0:r+=e.state.gridSize,s.push({x:i,y:r,isAlive:!1,coordX:o,coordY:l});n.push(s)}var c=[];i=0,r=0;for(var d=0;d<t;d++){0!==d&&(i+=e.state.gridSize);for(var m=[],u=0;u<a;u++)0===u?r=0:r+=e.state.gridSize,m.push({x:i,y:r,isAlive:!1,coordX:d,coordY:u});c.push(m)}e.setState({Grid:n,NextGrid:c,TotalNodesX:t,TotalNodesY:a}),requestAnimationFrame(function(){return e.canvasApp()})},e.canvasApp=function(){var t=document.getElementById("myCanvas");if(t){var a=t.getContext("2d"),n=e.state.gridSize*e.state.TotalNodesX,i=e.state.gridSize*e.state.TotalNodesY;t.width=n,t.height=i;!function(){e.state.gridSize,e.state.gridSize;var n=0,i=0,r=t.width,o=t.height;for(a.lineWidth=1,a.moveTo(n,i),a.lineTo(r,i),a.strokeStyle="grey",a.stroke();i<o;)i+=e.state.gridSize,a.moveTo(n,i),a.lineTo(r,i),a.strokeStyle="grey",a.stroke();for(i=0,a.moveTo(n,i),a.lineTo(n,o),a.stroke();n<r;)n+=e.state.gridSize,a.moveTo(n,i),a.lineTo(n,o),a.stroke();e.state.isRunning&&e.incrementGameLoop(),e.state[e.state.curGrid].forEach(function(t,n){t.forEach(function(t,n){t.isAlive?(a.beginPath(),a.rect(t.x,t.y,e.state.gridSize,e.state.gridSize),a.fillStyle="black",a.fill()):(a.beginPath(),a.rect(t.x+1,t.y+1,e.state.gridSize-2,e.state.gridSize-2),a.fillStyle="white",a.fill())})})}(),e.state.isRunning&&(e.timer=setTimeout(function(){requestAnimationFrame(function(){return e.canvasApp()})},100-e.state.gameSpeed))}},e.incrementGameLoop=function(){var t=[];e.state[e.state.curGrid].forEach(function(e,a){var n=[];e.forEach(function(e,t){n.push(Object.assign({},e))}),t.push(n)}),t=e.lifeAlgorithm(t);var a=e.state[e.state.curGrid];e.setState({Grid:t,NextGrid:a,generation:e.state.generation+1})},e.lifeAlgorithm=function(t){var a=e.state.Grid;return e.state.Grid.forEach(function(n,i){n.forEach(function(n,r){var o=e.getNeighbors(a,i,r),s=0,l=[];Object.keys(o).forEach(function(e){var t=o[e];t.isAlive?s+=1:l.push({num:e,curNodeX:t.coordX,curNodeY:t.coordY})});t[i][r];t[i][r].isAlive&&s<2?t[i][r].isAlive=!1:t[i][r].isAlive||3!==s?s>3&&t[i][r].isAlive?t[i][r].isAlive=!1:t[i][r].isAlive&&s>=2&&s<=3&&(t[i][r].isAlive=!0):t[i][r].isAlive=!0})}),t},e.getNeighbors=function(e,t,a){for(var n={},i=(e[t][a],1);i<9;){var r=t,o=a;switch(i){case 1:o--,e[r][o]||(o=e[r].length-1);break;case 2:e[++r]||(r=0),o--,e[r][o]||(o=e[r].length-1);break;case 3:e[++r]||(r=0);break;case 4:e[++r]||(r=0),o++,e[r][o]||(o=0);break;case 5:o++,e[r][o]||(o=0);break;case 6:e[--r]||(r=e.length-1),o++,e[r][o]||(o=0);break;case 7:e[--r]||(r=e.length-1);break;case 8:e[--r]||(r=e.length-1),o--,e[r][o]||(o=e[r].length-1)}n[i]=Object.assign({},e[r][o]),i++}return n},e.handleGridClick=function(t){if(!e.state.isRunning){var a=document.getElementById("myCanvas").getBoundingClientRect(),n=t.clientX-a.left,i=t.clientY-a.top,r=Math.floor(n/e.state.gridSize),o=Math.floor(i/e.state.gridSize),s=e.state.Grid;s[r]&&s[r][o]&&(s[r][o].isAlive=!s[r][o].isAlive,console.log("clicked: x:".concat(s[r][o].coordX,", y: ").concat(s[r][o].coordY))),e.setState({Grid:s}),e.canvasApp()}},e.handleWheel=function(e){e.deltaY>0?console.log("wheelDown"):console.log("wheelup")},e.startStopGame=function(){var t=!e.state.isRunning;e.setState({isRunning:!e.state.isRunning}),t?e.timer=setTimeout(function(){requestAnimationFrame(function(){return e.canvasApp()})},100-e.state.gameSpeed):clearTimeout(e.timer)},e.resetGame=function(){e.setState({isRunning:!1});var t=e.state.Grid;t.forEach(function(e,t){e.forEach(function(e,t){e.isAlive=!1})}),e.setState({Grids:t}),e.canvasApp(),e.setState({generation:0,preset:""})},e.randomizeGame=function(){e.setState({isRunning:!1,generation:0});var t=e.state.Grid;t.forEach(function(e,t){e.forEach(function(e,t){e.isAlive=!1,Math.round(10*Math.random())>8&&(e.isAlive=!0)})}),e.setState({Grid:t}),e.canvasApp()},e.makeAcorn=function(){e.resetGame();var t=Math.round(e.state.TotalNodesX/2-e.state.TotalNodesX/4),a=Math.round(e.state.TotalNodesY/2);e.setState({x:t,y:a});var n=e.state.Grid;n[t][a].isAlive=!0,n[++t][a].isAlive=!0,a-=2,n[t][a].isAlive=!0,a++,n[t+=2][a].isAlive=!0,a++,n[++t][a].isAlive=!0,n[++t][a].isAlive=!0,n[++t][a].isAlive=!0,e.canvasApp()},e.stepThroughGame=function(){e.incrementGameLoop(),e.canvasApp()},e.handlePresetChange=function(t){"Acorn"===t.target.value?e.makeAcorn():"Random"===t.target.value&&e.randomizeGame(),e.setState({preset:t.target.value})},e.handleGridSizeChange=function(t){var a;e.resetGame(),console.log(t.target.value),"Largest"===t.target.value?a=25:"Large"===t.target.value?a=20:"Medium"===t.target.value?a=15:"Small"===t.target.value?a=10:"Smallest"===t.target.value&&(a=5),console.log(a),e.setState({gridSize:a,gridSizeString:t.target.value}),e.createGrid()},e.handleSlider=function(t,a){e.setState({gameSpeed:a})},e.state={TotalNodesX:0,TotalNodesY:0,curGrid:"Grid",nextGrid:"NextGrid",Grid:[],NextGrid:[],isRunning:!1,gridSize:13,generation:0,preset:"",gameSpeed:500,gridSizeString:""},e.container=i.a.createRef(),e.timer=null,e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.createGrid()}},{key:"render",value:function(){var e=this.props.classes;return this.state.isRunning||(this.timer=null),i.a.createElement("div",{className:e.gameContainer,ref:this.container},i.a.createElement("canvas",{id:"myCanvas",width:"0",height:"0",onClick:this.handleGridClick,onWheel:this.handleWheel}),i.a.createElement("hr",{style:{width:"100%",marginTop:"20px"}}),i.a.createElement("div",{className:e.sliderGridSizeContainer},i.a.createElement("div",{className:e.gameSpeedContainer},i.a.createElement(g.k,{id:"label"},"Game Speed"),i.a.createElement(G.a,{classes:{container:e.slider},value:this.state.gameSpeed,"aria-labelledby":"label",onChange:this.handleSlider}))),i.a.createElement("div",{className:e.gameControls},i.a.createElement(p.a,{readOnly:!0,id:"outlined-uncontrolled",label:"Generation",className:e.generationField,margin:"normal",variant:"outlined",value:this.state.generation}),this.state.isRunning?i.a.createElement("div",{className:e.buttonContainer},i.a.createElement(g.e,{onClick:this.startStopGame,color:"primary",className:e.iconButton},i.a.createElement(y.a,null)),i.a.createElement(g.k,{variant:"caption",gutterBottom:!0,align:"center"},"Pause")):i.a.createElement("div",{className:e.buttonContainer},i.a.createElement(g.e,{onClick:this.startStopGame,color:"primary",className:e.iconButton},i.a.createElement(f.a,null)),i.a.createElement(g.k,{variant:"caption",gutterBottom:!0,align:"center"},"Play")),i.a.createElement("div",{className:e.buttonContainer},i.a.createElement(g.e,{onClick:this.stepThroughGame,color:"secondary"},i.a.createElement(S.a,null)),i.a.createElement(g.k,{variant:"caption",gutterBottom:!0,align:"center"},"Step")),i.a.createElement("div",{className:e.buttonContainer},i.a.createElement(g.e,{onClick:this.resetGame},i.a.createElement(k.a,null)),i.a.createElement(g.k,{variant:"caption",gutterBottom:!0,align:"center"},"Reset")),i.a.createElement(g.b,{id:"presets",className:this.props.classes.formControl,color:"inherit"},i.a.createElement(g.g,{htmlFor:"preset-helper"},"Presets"),i.a.createElement(g.j,{value:this.state.preset,onChange:this.handlePresetChange,input:i.a.createElement(g.f,{name:"preset",id:"preset-helper"}),className:this.props.classes.select},i.a.createElement(g.h,{value:"Random"},"Random"),i.a.createElement(g.h,{value:"Acorn"},"Acorn")),i.a.createElement(g.c,{className:this.props.classes.select},"Select a layout"))))}}]),t}(n.Component),w=Object(u.withStyles)(function(e){return{gameContainer:{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",width:"100%",generation:0},gameControls:{display:"flex",width:"100%",justifyContent:"space-between"},generationField:{width:"175px"},formControl:{width:"120px"},buttonContainer:{marginTop:"5px"},iconButton:{marginBottom:"0px",paddingBotton:"0px"},sliderGridSizeContainer:{display:"flex",justifyContent:"center",width:"100%"},slider:{padding:"22px 0px",width:"100%"},gameSpeedContainer:{width:"45%"},gridSizeContainer:{width:"45%"},select:{}}})(A),j=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){this.props.classes;return i.a.createElement("div",null,i.a.createElement(g.a,null,i.a.createElement(g.k,{variant:"h5"}," Rules  "),i.a.createElement(g.k,{variant:"body1"}," 1. Any live cell with fewer than two live neighbors dies, as if by underpopulation. "),i.a.createElement(g.k,{variant:"body1"}," 2. Any live cell with two or three live neighbors lives on to the next generation. "),i.a.createElement(g.k,{variant:"body1"}," 3. Any live cell with more than three live neighbors dies, as if by overpopulation. "),i.a.createElement(g.k,{variant:"body1"}," 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction. ")))}}]),t}(n.Component),N=Object(u.withStyles)({homeContainer:{margin:"10px",display:"flex",justifyContent:"center"},gridCard:{padding:"20px",paddingTop:"25px"},gameGridItem:{minWidth:"540px",maxWidth:"630px"}})(j),O=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){this.props.classes;return i.a.createElement("div",null,i.a.createElement(g.a,null,i.a.createElement(g.k,{variant:"h5"}," About  "),i.a.createElement(g.k,{variant:"body1"}," 1. Any live cell with fewer than two live neighbors dies, as if by underpopulation. ")))}}]),t}(n.Component),T=Object(u.withStyles)({homeContainer:{margin:"10px",display:"flex",justifyContent:"center"},gridCard:{padding:"20px",paddingTop:"25px"},gameGridItem:{minWidth:"540px",maxWidth:"630px"}})(O),z=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.classes;return i.a.createElement(g.d,{className:e.homeContainer,container:!0},i.a.createElement(g.k,{variant:"h4"}," Conway's Game of Life "),i.a.createElement(g.d,{item:!0,xs:12,id:"toprow"},i.a.createElement(g.d,{container:!0,spacing:8,justify:"center"},i.a.createElement(g.d,{item:!0,xs:7,className:e.gameGridItem},i.a.createElement(g.i,{className:e.topCard},i.a.createElement(w,{componentWidth:500,componentHeight:500,gridHeight:e.topCard.height,gridWidth:e.topCard.width}))),i.a.createElement(g.d,{item:!0,xs:10,sm:9,md:4},i.a.createElement(g.i,{className:e.bottomCard},i.a.createElement(N,null)),i.a.createElement(g.i,{className:e.bottomCard},i.a.createElement(T,null))))))}}]),t}(n.Component),R=Object(u.withStyles)({homeContainer:{margin:"10px",display:"flex",justifyContent:"center"},topCard:{padding:"20px",paddingTop:"25px"},bottomCard:{marginTop:"5px"},gameGridItem:{minWidth:"540px",maxWidth:"630px"}})(z),W=(a(349),function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement(R,null))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var B=Object(u.createMuiTheme)({palette:{primary:{light:"#58a4f2",main:"#0076bf",dark:"#004b8e",contrastText:"white"},secondary:{light:"#ff7961",main:"#f44336",dark:"#ba000d",contrastText:"#000"}},typography:{useNextVariants:!0}});o.a.render(i.a.createElement(u.MuiThemeProvider,{theme:B},i.a.createElement(W,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[194,2,1]]]);
//# sourceMappingURL=main.a90cb3d2.chunk.js.map