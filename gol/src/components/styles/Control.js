import styled from 'styled-components';

const Control = styled.div`
  margin: 1rem auto;
  padding: 20px;
  width: 40%;
  margin-bottom: 0;
  padding-bottom: 10px;
`;

const ControlButton = styled.button`
  cursor: pointer;
  border: 1px solid grey;
  padding: 10px;
  width: 15%;
  background-color: white;
  margin-right: ${props => (props.last ? '0' : '1rem')};
  &:focus {
    outline: none;
  }
`;

export { Control, ControlButton };
