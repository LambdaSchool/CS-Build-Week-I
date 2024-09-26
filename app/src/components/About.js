import React from "react"
import styled from "styled-components"

export default function About() {
    return (
        <div>
            <AboutWrapper>
                <main>
                    <h2>
                        A Little Brief on the Conway Game of Life
                    </h2>
                    <div>
                        <h2>Rules</h2>
                        <ul>
                            <li>Any live cell with two or three live neighbours survives.</li>
                            <li>
                                Any dead cell with three live neighbours becomes a live cell.
                            </li>
                            <li>
                                All other live cells die in the next generation. Similarly, all
                                other dead cells stay dead.
                            </li>
                        </ul>
                        <p>
                            According to Wiki, The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.[1] It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.
                        </p>
                    </div>

                </main>
            </AboutWrapper>
        </div>
    )
}

const AboutWrapper = styled.div`

`