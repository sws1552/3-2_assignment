import {db} from "../../firebase";
import {collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc} from "firebase/firestore"
import Delete from "@mui/icons-material/Delete";



// Actions
const LOAD = 'word/LOAD';
const CREATE = 'word/CREATE';
const UPDATE = 'word/UPDATE';
const CHECKUPDATE = 'word/checkUPDATE';
const DELETE = 'word/DELETE';
const LOADED = 'word/LOADED';


// 초기값
const initialState = {
    is_loaded: false,
    list: [
        // {word: "aaa", explanation: "aaa", example: "aaa"},
        // {word: "bbb", explanation: "bbb", example: "bbb"},
        // {word: "ccc", explanation: "ccc", example: "ccc"},
        // {word: "ddd", explanation: "ddd", example: "ddd"},
        // {word: "eee", explanation: "eee", example: "eee"},
        // {word: "fff", explanation: "fff", example: "fff"},
    ]
}



// Action Creators
export function loadedWord(loaded) {
    return {
        type: LOADED,
        loaded
    };
}

export function loadWord(word_list) {
    return {
        type: LOAD,
        word_list
    };
}

export function addWord(word_list) {
    return {
        type: CREATE,
        word_list
    };

}

export function checkUpdateWord(word_index) {
    return {
        type: CHECKUPDATE,
        word_index
    };
}

export function updateWord(word_id, upWord, upExplanation, upExample) {
    return {
        type: UPDATE,
        word_id,
        upWord,
        upExplanation,
        upExample
    };
}

export function deleteWord(word_id) {
    return {
        type: DELETE,
        word_id
    };
}


// middlewares
// load 될때
export const loadWordFB = () => {
    return async function (dispatch) {
        const word_data = await getDocs(collection(db, "assignment"));
        // console.log(word_data);

        let word_list = [];
        word_data.forEach((doc) => {
            // console.log(doc.id, doc.data());
            word_list.push({id: doc.id, ...doc.data()});
        });

        // console.log(word_list);

        dispatch(loadWord(word_list));

    }
}

// 추가하기
export const addWordFB = (newdoc) => {
    return async function (dispatch) {
        // console.log(newdoc);
        dispatch(loadedWord(false));

        // 파이어스토어에 추가
        const docRef = await addDoc(collection(db, "assignment"), newdoc);

        // 아이디값을 넣어서 이제 리덕스에 추가하기 위한 데이터 완성
        const word = {id: docRef.id, ...newdoc}
        // console.log(word);
        dispatch(addWord(word));
    }
}

// 체크 업데이트
export const checkUpdateFB = (word_id) => {
    return async function (dispatch, getState) {
        
        const word_list = getState().word.list;
        let precompleted = false;
        word_list.forEach((item, i) => {
            if(word_id === item.id){
                precompleted = item.completed;
            }
        });
        
        const newCompleted = precompleted ? false : true;
        
        const docRef = doc(db, "assignment", word_id);
        await updateDoc(docRef, {completed: newCompleted});

        const word_index = word_list.findIndex((item) => {
            return item.id === word_id;
        });

        dispatch(checkUpdateWord(word_index));        

    }
}


// card 수정
export const updateWordFB = (word_id, wordVal, explanationVal, exampleVal) => {
    return async function (dispatch, getState){
        const docRef = doc(db, "assignment", word_id);
        // console.log(getState().word.list);
        await updateDoc(docRef, {
            word: wordVal,
            explanation: explanationVal,
            example: exampleVal
        });
        
        dispatch(updateWord(word_id, wordVal, explanationVal, exampleVal));

    }
}


// 삭제
export const deleteWordFB = (word_id) => {
    return async function (dispatch) {
        const docRef = doc(db, "assignment", word_id);
        await deleteDoc(docRef);

        dispatch(deleteWord(word_id));
    }
}


// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        
        case "word/LOADED": {
            return {...state, is_loaded: action.loaded}
        }

        case "word/LOAD": {
            return {list: action.word_list, is_loaded: true};
        }

        case "word/CREATE": {
            const new_word_list = [...state.list, action.word_list];
            return {...state, list: new_word_list, is_loaded: true};
        }

        case "word/checkUPDATE": {
            const new_word_list = state.list.map((item, i) => {
                if(i === action.word_index){
                    const preCompleted = item.completed;
                    return {...item, completed: preCompleted ? false : true};
                }else {
                    return item;
                }
            });
            return {...state, list: new_word_list};
        }

        case "word/UPDATE": {
            const new_word_list = state.list.map((item, i) => {
                if(item.id === action.word_id){
                    return {
                        ...item,
                        word: action.upWord,
                        explanation: action.upExplanation,
                        example: action.upExample
                    };
                }else {
                    return item;
                }
            });

            return {...state, list: new_word_list};
        }

        case "word/DELETE": {
            const new_word_list = state.list.filter((item, i) => {
                return item.id !== action.word_id;
            });
            
            return {...state, list: new_word_list};
        }

        default:
            return state;
    }
}
