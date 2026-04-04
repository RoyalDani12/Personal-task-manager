import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faCheckCircle, faClock, faTasks, faEnvelope, 
  faSave, faTimes, faCamera, faSignOutAlt, faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import updateProfile from '../api/update.profile.API';
import Sidebar from '../components/dashboardComponent/Sidebar';

const ProfilePage = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({
    name: "",
    phone: "",
    bio: "",
    avatar: ""
  });

  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const parsedObject = JSON.parse(userDataString); 
      const actualData = parsedObject.data; 
      if (actualData) setUser(actualData);
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
      setImage(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("bio", user.bio);
      formData.append("phone", user.phone);
      if (image) formData.append("avatar", image);

      const response = await updateProfile(user._id, formData);
      setUser(response.data.data);
      localStorage.setItem("user", JSON.stringify({ data: response.data.data }));
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-gray-900 font-sans">

      <Navbar />

      <div className="flex flex-1">

        {/* Sidebar (hidden on small screens) */}
        <aside className="hidden lg:block w-64 border-r border-gray-200 bg-white">
          <Sidebar UserName={user.name} avatar={user.avatar} />
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col">
          <main className="flex-grow px-4 md:px-10 py-10">
            <div className="w-full max-w-5xl mx-auto space-y-8">

              {/* Profile Card */}
              <div className="bg-white border border-gray-200 rounded-3xl shadow-md p-6 md:p-10">
                
                <div className="flex flex-col md:flex-row items-center gap-10">

                  {/* Image */}
                  <div className="relative group">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 border-4 border-indigo-200 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
                      
                      {selectedImage ? (
                        <img src={selectedImage} className="w-full h-full object-cover" />
                      ) : user.avatar ? (
                        <img
                          src={user.avatar.startsWith("/uploads") ? `http://localhost:5000${user.avatar}` : user.avatar}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FontAwesomeIcon icon={faUser} className="text-5xl text-gray-400" />
                      )}

                      {isEditing && (
                        <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition">
                          <FontAwesomeIcon icon={faCamera} className="text-white text-xl" />
                          <input type="file" className="hidden" onChange={handleImageChange} />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 w-full space-y-4 text-center md:text-left">
                    {isEditing ? (
                      <>
                        <input name="name" value={user.name} onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-indigo-500 outline-none" />

                        <input name="phone" value={user.phone} onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-indigo-500 outline-none" />

                        <textarea name="bio" value={user.bio} onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-indigo-500 outline-none" />
                      </>
                    ) : (
                      <>
                        <h1 className="text-3xl md:text-4xl font-bold">{user.name}</h1>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 text-sm">
                          <span className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faEnvelope} className="text-indigo-500" />
                            {user.email}
                          </span>
                          <span className="bg-indigo-100 text-indigo-600 px-2 py-1 text-xs rounded-full font-semibold">
                            Pro User
                          </span>
                        </div>

                        <p className="text-gray-600 italic">"{user.bio}"</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap justify-center md:justify-end gap-4 border-t pt-6">
                  {isEditing ? (
                    <>
                      <button onClick={() => setIsEditing(false)}
                        className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold">
                        Cancel
                      </button>

                      <button onClick={handleSave}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold">
                        {loading ? "Saving..." : "Save"}
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setIsEditing(true)}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold">
                        Edit Profile
                      </button>

                      <button className="text-gray-500 hover:text-black flex items-center gap-2">
                        <FontAwesomeIcon icon={faShieldAlt} /> Security
                      </button>

                      <button onClick={handleLogout}
                        className="text-red-500 hover:text-red-600 flex items-center gap-2">
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatCard icon={faTasks} label="Total Tasks" count="24" />
                <StatCard icon={faCheckCircle} label="Completed" count="18" />
                <StatCard icon={faClock} label="In Progress" count="06" />
              </div>

            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, count }) => (
  <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
    <div className="text-gray-500 text-xs flex items-center gap-2 uppercase font-semibold">
      <FontAwesomeIcon icon={icon} />
      {label}
    </div>
    <div className="text-3xl font-bold mt-2">{count}</div>
  </div>
);

export default ProfilePage;