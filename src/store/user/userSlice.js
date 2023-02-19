import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  name: null,
  last_name: null,
  state: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logUser: (state, action) => {
      let res = action.payload
      state.name = res.name
      state.last_name = res.last_name
      state.id = res.id
      state.state = true
    },
    signOut: (state) => {
      state.id = null
      state.name = null
      state.last_name = null
      state.state = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { logUser, signOut } = userSlice.actions

export default userSlice.reducer