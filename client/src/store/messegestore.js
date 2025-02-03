import {    create} from 'zustand'

const messagestore = create((set)=>({
    selecteduser:null,
    setselecteduser:(user)=>set({selecteduser:user}),
    messages:[],
    setmessages:(message)=>set((state)=>({messages:[...state.messages,message]})),
    clearmessages:()=>set({messages:[]}),

}))

export default messagestore