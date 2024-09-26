import React from 'react'
import styled from 'styled-components'

export default function Footer() {
    return (
        <FooterWrapper>
            <p>
                Created By Tolu Atolagbe
            </p>
        </FooterWrapper>
    )
}

const FooterWrapper = styled.div`
background-color:grey;
display: flex;
align-items: center;
height: 33px;
text-align: center;
justify-content: center;
margin-top:1rem;
padding:0.2rem;


`