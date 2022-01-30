import React from "react";
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';


const Spinner = (props) => {
    
    return (
        <Outter>
            <CircularProgress size={150} style={{color: "white"}} />
        </Outter>
    );

}

const Outter = styled.div`
    background-color: #e9b4e9;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Spinner;