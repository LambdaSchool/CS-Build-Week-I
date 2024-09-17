import React from 'react';
import styled from "styled-components";
import { colors } from "../../utils/variables";
import SearchBox from "./SearchBox";
const Panel = styled.div`
    height: 9rem;
    width: 100%;
    background: ${ colors.darkGrey };
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.6rem;
`;
const SectionTitle = styled.h2`
    font-size: 3.6rem;
    font-weight: 500;
`;
const HeaderPanel = () => {
    return (  
        <Panel>
            <SectionTitle>Presets</SectionTitle>
            <SearchBox></SearchBox>
        </Panel>
    );
}
 
export default HeaderPanel;