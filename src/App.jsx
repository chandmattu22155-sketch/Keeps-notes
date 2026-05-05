import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import MainPage from './components/MainPage'
import Auth from './components/Auth'


import { AppProvider, AppContext } from './context/Appcontext'
import { useContext } from 'react'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function Layout() {
  const { showSidebar } = useContext(AppContext);

  return (
    <div className='flex'>
      {showSidebar && <Sidebar />}

      <div className='flex-1'>
        <Navbar />
        <MainPage />
      </div>
    </div>
  );
}

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;

  return (
    <AppProvider>
      {user ? <Layout /> : <Auth />}
    </AppProvider>
  );
}

export default App;
