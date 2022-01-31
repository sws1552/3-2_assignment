
import React from 'react';
import styled from 'styled-components';
import {Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {loadWordFB} from './redux/modules/word';
import {db} from './firebase';
import { collection, getDocs } from 'firebase/firestore';



import backimg from './images/배경.jpg';
import List from './List';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddCard from './AddCard';
import UpdateCard from './UpdateCard';
import Spinner from './Spinner';




function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(location);
  const is_loaded = useSelector((state) => state.word.is_loaded);
  // console.log(is_loaded);
 

  React.useEffect(async() => {
    
    dispatch(loadWordFB());

  }, [])

  return (
    <AppWrap className="App">
      <Header><Title onClick={() => {
        navigate('/');
      }}>나만의 단어장</Title></Header>
      
      <Wrap>

        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/add" element={<AddCard />} />
          <Route path="/update/:id" element={<UpdateCard />} />
          
        </Routes>
        

        <Fab aria-label="add" style={{position:"fixed", bottom:"30px", right:"30px"}}
        onClick={() => {
          navigate('/add');
        }}>
          <AddIcon />
        </Fab>
        
        {is_loaded ? null : <Spinner/>}

      </Wrap>

    </AppWrap>
  );
}

const AppWrap = styled.div`
  font-style: oblique;
  background-image: url(${backimg});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  background-attachment: fixed;
`;

const Wrap = styled.div`
  padding: 100px 50px;
`;

const Header = styled.div`
  background-color: #e9b4e9;
  width: 100vw;
  height: 60px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 5px solid white;
  z-index: 10;
`;

const Title = styled.span`
  color: white;
  font-size: 2em;
  font-weight: 700;
  cursor: pointer;
`;


export default App;
