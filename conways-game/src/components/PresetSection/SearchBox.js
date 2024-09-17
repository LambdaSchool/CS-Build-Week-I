import React from "react";
import styled from "styled-components";
import { colors } from "../../utils/variables";
import searchIcon from "./assets/search.svg";
const SearchWrapper = styled.div`
    position: relative;
    height: 3.6rem;
    width: 50%;
`;
const SearchBox = styled.input`
    height: 100%;
    width: 100%;
    border-radius: 1rem;
    font-size: 1.6rem;
    padding: 0 1rem;
    border: none;
    outline-color: ${ colors.orange };
`;
const SearchIcon = styled.img`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
`;

const SearchBar = () => {
    return (
        <SearchWrapper>
            <SearchBox type = "search" />
            <SearchIcon src = {searchIcon}/>
        </SearchWrapper>
    );
}
 
export default SearchBar;