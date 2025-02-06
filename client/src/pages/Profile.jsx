import React, { useState } from 'react';
import { User, Camera, Save } from 'lucide-react';
import axios from '../lib/axios';
import {useNavigate} from 'react-router-dom'
const Profile = () => {
  const [name, setName] = useState('John Doe');
  const [profilePic, setProfilePic] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate()
  const handleNameChange = (e) => {
    setName(e.target.value);
  };


  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
   try {
    const response = await axios.post('/api/auth/updateprofile',{image:profilePic,name})
    if(response.status===200){
      navigate('/home')
    }
   } catch (error) {
    console.log(error)
   }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50 py-8">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

          <div className="relative px-6 pb-6">
            <div className="relative -mt-16 mb-6 flex justify-center">
              <div className="relative inline-block">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="h-32 w-32 rounded-full border-4 border-white object-cover"
                />
                <label className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 cursor-pointer hover:bg-indigo-700 transition-colors">
                  <Camera className="h-5 w-5 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    className="pl-10 block w-full rounded-lg border border-gray-300 py-2 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
