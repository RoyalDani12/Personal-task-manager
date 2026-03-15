import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser,faCheckCircle, faClock,faTasks,faEnvelope,faSave, faTimes,faCamera,faSignOutAlt,faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import updateProfile from '../api/update.profile.API';

const ProfilePage = () => {

  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image , setImage ]= useState(null)

const [user, setUser] = useState({
    name: "",
    phone: "",
    bio: "",
    avatar:""
  });

useEffect(() => {
  const userDataString = localStorage.getItem('user');
  if (userDataString) {

    const parsedObject = JSON.parse(userDataString); 
    const actualData = parsedObject.data; 
    
    if (actualData) {
      setUser(actualData);
    }
  }
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImage(file)
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("name", user.name);
      formData.append("bio", user.bio);
      formData.append("phone", user.phone);

      if (image) {
        formData.append("avatar", image);
      }

      const response = await updateProfile(user._id, formData);

      setUser(response.data.data);

      localStorage.setItem(
        "user",
        JSON.stringify({ data: response.data.data })
      );

      setIsEditing(false);

    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout=()=>{
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center gap-10">
              
              <div className="relative group">
                <div className="w-40 h-40 bg-slate-800 border-4 border-indigo-500/30 rounded-full flex items-center justify-center overflow-hidden shadow-2xl shadow-indigo-500/20">
                {selectedImage ? (
                  <img src={selectedImage} alt="Profile" className="w-full h-full object-cover" />
                ) : user.avatar ? (
                  <img
                    src={user.avatar.startsWith("/uploads") ? `http://localhost:5000${user.avatar}` : user.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} className="text-6xl text-indigo-400" />
                )}
                  
                  {isEditing && (
                    <label className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <FontAwesomeIcon icon={faCamera} className="text-white text-2xl mb-2" />
                      <span className="text-[10px] uppercase font-bold tracking-widest text-white">Change Photo</span>
                      <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex-1 w-full space-y-4">
                {isEditing ? (
                  <div className="space-y-4 animate-in fade-in duration-500">

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                      <input 
                        name="name"
                        value={user?.name} 
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition mt-1"
                      />
                    </div>

                    {/* PHONE FIELD ADDED */}
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</label>
                      <input 
                        name="phone"
                        value={user?.phone} 
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bio</label>
                      <textarea 
                        name="bio"
                        value={user?.bio} 
                        onChange={handleChange}
                        rows="3"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition mt-1 text-sm text-slate-300 italic"
                      />
                    </div>

                  </div>
                ) : (
                  <div className="text-center md:text-left space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight">{user.name}</h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-400 py-1">
                      <span className="flex items-center gap-2 text-sm">
                        <FontAwesomeIcon icon={faEnvelope} className="text-indigo-500" />
                        {user.email}
                      </span>
                      <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center">
                        Pro User
                      </span>
                    </div>
                    <p className="text-lg text-slate-300 italic leading-relaxed pt-2">
                      "{user.bio}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center md:justify-end gap-4 border-t border-slate-800 pt-8">
              {isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition font-bold text-sm"
                  >
                    <FontAwesomeIcon icon={faTimes} /> Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition font-bold text-sm shadow-xl shadow-indigo-600/30"
                  >
                    <FontAwesomeIcon icon={faSave} /> {loading ? "Saving..." : "Save Changes"}
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-10 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all shadow-xl shadow-indigo-600/20"
                  >
                    Edit Profile
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 text-slate-400 hover:text-white transition text-sm">
                    <FontAwesomeIcon icon={faShieldAlt} /> Security
                  </button>
                  <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 cursor-pointer text-red-400 hover:text-red-300 transition text-sm">
                    <FontAwesomeIcon icon={faSignOutAlt}  /> Logout
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard icon={faTasks} label="Total Tasks" count="24" color="indigo" />
            <StatCard icon={faCheckCircle} label="Completed" count="18" color="green" />
            <StatCard icon={faClock} label="In Progress" count="06" color="red" />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

const StatCard = ({ icon, label, count, color }) => {
  const themes = {
    indigo: "text-indigo-400 border-indigo-500/20 shadow-indigo-500/5",
    green: "text-green-400 border-green-500/20 shadow-green-500/5",
    red: "text-red-400 border-red-500/20 shadow-red-500/5"
  };

  return (
    <div className={`bg-slate-900 border p-6 rounded-3xl shadow-xl transition-transform hover:scale-[1.02] ${themes[color]}`}>
      <div className="text-slate-500 mb-3 flex items-center gap-2 uppercase text-[10px] font-black tracking-[0.2em]">
        <FontAwesomeIcon icon={icon} />
        {label}
      </div>
      <div className="text-4xl font-black text-white">{count}</div>
    </div>
  );
};

export default ProfilePage;