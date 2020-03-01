import React from 'react';
import io from 'socket.io-client';

export const CTX = React.createContext();
// Context -> share global data, can avoid passing props thru elements


const initState = {
    general: [
        { from: 'matt', msg: 'hello' },
        { from: 'matt', msg: 'hello' },
        { from: 'matt', msg: 'hello' },
    ],
    topic2: [
        { from: 'matt', msg: 'hi' },
        { from: 'dage', msg: 'nihao' },
        { from: 'pedro', msg: 'hola' },
    ]
}


// How do we retain our existing state while mapping over 
// a chat that we recieve and rerendering the page
function reducer(state, action) {

    const { from, msg, topic } = action.payload;
    // eslint-disable-next-line 
    switch (action.type) {
        case 'RECIEVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    { from, msg }
                ]
            }
    }
}
// https://stackoverflow.com/questions/49725708/why-action-payload-use-in-reactjs

let socket;

function sendChatAction(value) {
    socket.emit('chat message', value);
}

export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initState);

    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', function (msg) {
            dispatch({ type: 'RECIEVE_MESSAGE', payload: msg });
        });
    }

    const user = 'User' + Math.random().toFixed(2)*100;

    return (
        <CTX.Provider value={{ allChats, sendChatAction, user }}>
            {props.children}
        </CTX.Provider>
    )
}


