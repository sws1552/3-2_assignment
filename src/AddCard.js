import {React, useRef} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {addWordFB} from "./redux/modules/word";
import {useNavigate} from "react-router-dom";


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const AddCard = () => {

    const word = useRef();
    const explanation = useRef();
    const example = useRef();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const addWord = () => {

        dispatch(addWordFB({
            word: word.current.value,
            explanation: explanation.current.value, 
            example: example.current.value,
            completed: false
         }
         ));

        //  word.current.value = "";
        //  explanation.current.value = "";
        //  example.current.value = "";
        navigate('/');
    }

    return (
        <Container>
            <Wrap>
                <Title>단어 추가하기</Title>
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
                        style={{width:"90%"}}
                        color='warning'
                        inputRef={word}/>

                        <TextField
                        required
                        id="standard-required2"
                        label="설명"
                        variant="standard"
                        style={{width:"90%"}}
                        color='warning'
                        inputRef={explanation}/>

                        <TextField
                        required
                        id="standard-required3"
                        label="예시"
                        variant="standard"
                        style={{width:"90%"}}
                        color='warning'
                        inputRef={example}/>
                    </div>
                </Box>
                <Btn onClick={addWord}>저장하기</Btn>
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

export default AddCard;