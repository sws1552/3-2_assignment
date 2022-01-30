import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {checkUpdateFB} from './redux/modules/word';


import IconButton from '@mui/material/IconButton';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

const List = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wordList = useSelector((state) => state.word.list);

    // console.log(wordList);
    const checkUpdateBtn = (id) => {
        dispatch(checkUpdateFB(id));
    }

    return (
        <Container>
            {wordList.map((item, i) => {
                
                return (
                    <Card key={i}>
                    <BtnGroup>
                        <IconButton style={{color: "#e9b4e9"}}
                        onClick={() => {checkUpdateBtn(item.id)}}><CheckOutlinedIcon/></IconButton>
                        <IconButton style={{color: "#e9b4e9"}}
                        onClick={() => {navigate('/update/'+item.id)}}><BorderColorOutlinedIcon/></IconButton>
                        <IconButton style={{color: "#e9b4e9"}}><DeleteIcon/></IconButton>
                    </BtnGroup>
                    <Word>{item.word}</Word>
                    <Explan>{item.explanation}</Explan>
                    <Example style={{color: "blue"}}>{item.example}</Example>  
                    </Card>
                )
            })}

        </Container>
    );
}

const Container = styled.div`
    display: flex;
    /* border: 5px solid violet; */
    flex-wrap: wrap;
    gap: 20px;
    padding: 10px;
    justify-content: center;
`;

const Card = styled.div`
    width: 23rem;
    height: 10em;
    border-radius: 20px;
    border: 3px solid #e9b4e9;
    padding: 10px;
    color: #e9b4e9;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const BtnGroup = styled.div`
    position: absolute;
    display: flex;
    /* background-color: orange; */
    height: 2.2em;
    width: 7.5em;
    right: 10px;
`;

const Word = styled.div`
    font-weight: 700;
    font-size: 1.5em;
`;

const Explan = styled.div`
    margin-top: 10px;
`;

const Example = styled.div`
    margin-top: 10px;
`;

export default List;
