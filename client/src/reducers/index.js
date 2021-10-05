import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

const login = createReducer(
    {loginStatus: '',
     permissions: ''},
    {
        SET_LOGIN: (state, action) => {
            state.loginStatus = action.payload[0]
            state.permissions = action.payload[1]            
        }
    }
)

const projectEdit = createReducer({project: ''},{
    SET_PROJECT: (state, action) => {
        state.project = action.payload
    }
})

const ticketEdit = createReducer({ticket: {}}, {
    EDIT_TICKET: (state, action) => {
        console.log(action.payload)
        state.ticket = action.payload
    }
})


export default combineReducers ({
    login: login,
    projectEdit: projectEdit,
    ticketEdit: ticketEdit
})