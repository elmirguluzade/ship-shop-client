import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    isLogged: string,
    user: { name: string, email: string, role: string, createdAt: string, birthday: null | string }
}

const initialState: UserState = {
    isLogged: "",
    user: { name: "", email: "", role: "", createdAt: "", birthday: "" }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        handleLog: (state, action: PayloadAction<{ id: string }>) => {
            state.isLogged = action.payload.id
        },
        handleUser: (state, action: PayloadAction<{ name: string, email: string, role: string, createdAt: string, birthday: null | string }>) => {
            state.user.name = action.payload.name
            state.user.email = action.payload.email
            state.user.role = action.payload.role
            state.user.createdAt = action.payload.createdAt
            if(action.payload.birthday){
                state.user.birthday = action.payload.birthday
            }
        }
    },
})

export default userSlice.reducer

export const { handleLog, handleUser } = userSlice.actions
