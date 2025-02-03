import {create} from 'zustand'
const userstore = create((set)=>({
    user:null,
    islogin:false,
    setuser:(user)=>set({user:user,islogin:true}),
    setlogin:()=>set((state)=>({islogin:!state.islogin})),

}))
export default userstore