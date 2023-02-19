import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    synchronized: false,
    taxes: {}
}

export const submissionsSlice = createSlice({
    name: 'submissions',
    initialState,
    reducers: {
        insertSubmissions: (state, action) => {
            let item = action.payload
            state.taxes[item.taxId] ? state.taxes[item.taxId].push(action.payload) : state.taxes[item.taxId] = [action.payload]
        },
        syncUpSubmissions: (state, action) => {
            let arr = action.payload
            for (let item of arr) {
                state.taxes[item.taxId] ? state.taxes[item.taxId].push(item) : state.taxes[item.taxId] = [item]
            }
            state.synchronized = true
        },
        clearUp: (state) => {
            state.synchronized = false
            state.taxes = {}
        },
        deleteOne: (state, action) => {
            let item = action.payload
            state.taxes[item.taxId] = state.taxes[item.taxId].filter(tax => tax.id !== item.id)
        },
    },
})

// Action creators are generated for each case reducer function
export const { insertSubmissions, syncUpSubmissions, clearUp, deleteOne } = submissionsSlice.actions

export default submissionsSlice.reducer