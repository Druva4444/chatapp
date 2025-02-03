import React, { useEffect, useState } from 'react';
import { MessageCircle, Search, Settings, LogOut, Send, Smile, Paperclip, User, Phone, Video } from 'lucide-react';
import axios from '../lib/axios.js'
import {useNavigate} from'react-router-dom'
import userstore from '../store/userStore.js';
import usemessegestore from '../store/messegestore.js'
const Home = () => {
  const setname = userstore((state)=>state.setuser)
  const stlogin =userstore((state)=>state.setlogin)
  const [contacts,setcontacts] = useState([])
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const selecteduser = usemessegestore((state)=>state.selecteduser)
  const setselecteduser = usemessegestore((state)=>state.setselecteduser)
  const navigate = useNavigate()
  // Mock data for contacts and messages
 async function handleContactClick(contact){
    setselecteduser(contact._id)
    try {
      const response = await axios.get(`/api/chat/chat/${contact._id}`)
    if(response.status===200){
      console.log('x')
      setMessages(response.data.messeges)
    }
    } catch (error) {
      if(error.response && error.response.data){
        console.log(error.response.data)
      }
      else{
        console.log('server error')
    }
    
  }
}
useEffect(()=>{
  async function getusers(){
    try {
      const response = await axios.get('/api/chat/getusers')
      if(response.status==200){
        console.log(response.data)
       setcontacts(response.data.users)
      }
    } catch (error) {
      if(error.response && error.response.data){
        console.log(error.response.data)
      }
      else{
        console.log('server error')
    }
  }
  
}
getusers()},[])
 

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };
 async function logout(){
    try {
        const response = await axios.get('/api/auth/logout')
        if(response.status==200){
            navigate('/login')
            setname(null)
            stlogin()
        }
    } catch (error) {
        if(error.response && error.response.data){
            console.log(error.response.data)
        }
        else{
            console.log('server error')
        }
    }
 }
  return (
    <div className="flex w-screen h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* User Profile Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">Your Name</h2>
                <p className="text-sm text-gray-600">Available</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full" onClick={logout}>
                <LogOut className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search contacts"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={()=>handleContactClick(contact)}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{contact.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
     { selecteduser&& <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Sarah Wilson</h2>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Phone className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Video className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md ${msg.isSent ? 'bg-indigo-600 text-white' : 'bg-white text-black'} rounded-lg px-4 py-2 shadow`}>
                <p>{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.isSent ? 'text-indigo-200' : 'text-gray-500'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="h-20 border-t border-gray-200 bg-white px-6 py-3">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
            <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
              <Paperclip className="h-5 w-5 text-gray-600" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent "
              style={{color:'black'}}
            />
            <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
              <Smile className="h-5 w-5 text-gray-600" />
            </button>
            <button
              type="submit"
              className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>}
    </div>
  );
};

export default Home;