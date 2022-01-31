import React from "react";
import styled from "styled-components";
import {useParams, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {updateWordFB} from './redux/modules/word';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const UpdateCard = () => {

    const wordText = React.useRef();
    const explanationText = React.useRef();
    const exampleText = React.useRef();

    const navigate = useNavigate();

    const dispatch = useDispatch();
        
    const {id} = useParams();

    const word_list = useSelector((state) => state.word.list);
    
    const usually = word_list.filter((item, i) => {
        return word_list.length !== 0 && id === item.id;
    });

    if(usually.length === 0){ return false; }

    const updateBtn = () => {
        let wordVal = wordText.current.value;
        let explanationVal = explanationText.current.value;
        let exampleVal =  exampleText.current.value;

        dispatch(updateWordFB(id, wordVal, explanationVal, exampleVal));

        navigate('/');
    }

    return (

        <Container>
            <Wrap>
                <Title>단어 수정하기</Title>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <div>
                        <TextField
                        required
                        id="standard-required"
                        label="단어"
                        variant="standard"
                        defaultValue={usually.length !== 0 ? usually[0].word : ''}
                        color='warning'
                        inputRef={wordText}
                        style={{width:"90%"}}
                        />
                        <TextField
                        required
                        id="standard-required2"
                        label="설명"
                        variant="standard"
                        defaultValue={usually.length !== 0 ? usually[0].explanation : ''}
                        color='warning'
                        inputRef={explanationText}
                        style={{width:"90%"}}
                        />
                        <TextField
                        required
                        id="standard-required3"
                        label="예시"
                        variant="standard"
                        defaultValue={usually.length !== 0 ? usually[0].example : ''}
                        color='warning'
                        inputRef={exampleText}
                        style={{width:"90%"}}
                        />
                    </div>
                </Box>
                <Btn onClick={updateBtn}>수정하기</Btn>
            </Wrap>
        </Container>
    );
}

const Container = styled.div`
    height: 82vh;
`;

const Wrap = styled.div`
    width: 500px;
    height: 500px;
    margin: 0 auto;
    border: 5px solid #e9b4e9;
    border-radius: 100px;
`;

const Title = styled.h1`
    color: #e9b4e9;
    text-align: center;
`;

const Btn = styled.button`
    display: block;
    width: 90%;
    margin: 120px auto 0;
    height: 30px;
    cursor: pointer;
    border: none;
    background-color: #e9b4e9;
    color: white;
    font-weight: 700;
    font-size: 1.2em;
    border-radius: 10px;
    transition: 0.5s;
    &:hover {
        background-color: purple;
    }
`;

export default UpdateCard;