import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import store from 'store2'

export interface IAdminState {
    loginState: boolean
    username: string
    token: string
    level: number
}

const initialState: IAdminState = {
    loginState: store.get('user') ? store.get('user')['loginState'] : false,
    username: store.get('user') ? store.get('user')['username'] : '',
    token: store.get('user') ? store.get('user')['token'] : '',
    level: store.get('user') ? store.get('user')['level'] : 1,
}

const adminSlice = createSlice({
    name: 'admins',
    initialState,
    reducers: {
        changeLoginState(state, action: PayloadAction<boolean>) {
            state.loginState = action.payload
        },
        changeUsername(state, action: PayloadAction<string>) {
            state.username = action.payload
        },
        changeToken(state, action: PayloadAction<string>) {
            state.token = action.payload
        },
        changeLevel(state, action: PayloadAction<number>) {
            state.level = action.payload
        },
    }
})

export const {
    changeLoginState,

    changeUsername,

    changeToken,

    changeLevel

} = adminSlice.actions

export default adminSlice.reducer