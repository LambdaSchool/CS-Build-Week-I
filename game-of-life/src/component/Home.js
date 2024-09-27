import React, { Component } from 'react';
import Game from './Game';

const pizza = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, repudiandae maxime fuga nisi.';

class Home extends Component {
    render() {
        return(
            <React.Fragment>    
                <div className="wrapper-home">                
                    <header>                    
                        <h1>Conway's Game of Life</h1>
                    </header>
                    <main className="content">
                        <section className="left">
                            <h3>Generation: `{'${}'}`</h3>
                            <div className="wrapper-game">

                                <Game />

                            </div>
                            <span className="control">
                                <button>Play</button>                        
                                <button>Pause</button>                      
                                <button>Stop</button>  
                            </span>                      
                        </section>
                        <section className="middle">
                            <span className="preset">
                                <div className="img-preset">
                                    <img src={require('../img/react-logo-80x80.png')} alt="logo" />
                                </div>
                                <button>Preset 1</button>
                            </span>
                            <span className="preset">
                                <div className="img-preset">
                                    <img src={require('../img/react-logo-80x80.png')} alt="logo" />
                                </div>
                                <button>Preset 2</button>
                            </span>
                            <span className="preset">
                                <div className="img-preset">
                                    <img src={require('../img/react-logo-80x80.png')} alt="logo" />
                                </div>
                                <button>Preset 3</button>
                            </span>
                            <span className="preset">
                                <div className="img-preset">
                                    <img src={require('../img/react-logo-80x80.png')} alt="logo" />
                                </div>
                                <button>Preset 4</button>
                            </span>
                        </section>
                        <section className="right">
                            <h3> Rules: </h3>
                            <li>{pizza}</li> <li>{pizza}</li> <li>{pizza}</li> <li>{pizza}</li> <li>{pizza}</li>
                        </section>
                    </main>                     
                    <footer>
                        <h2>About this Algorithm</h2>
                        <br/>                        
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quaerat fugit, tenetur rerum sed fugiat aliquam eos! Provident error reprehenderit, quasi tenetur aut quae, consectetur perferendis nostrum repellat, praesentium odio.
                        </p>
                        <br/>   
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quaerat fugit, tenetur rerum sed fugiat aliquam eos! Provident error reprehenderit, quasi tenetur aut quae, consectetur perferendis nostrum repellat, praesentium odio.
                        </p>   
                    </footer>
                </div>      
            </React.Fragment>  
        );
    }
}
export default Home;