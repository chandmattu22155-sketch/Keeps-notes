import { createContext, useEffect, useState } from "react";
import { db, auth } from '../firebase/firebase.js'; 
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null); 

  const notesCollection = collection(db, "notes");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        getNotes(currentUser.uid); 
      } else {
        setNotes([]); 
      }
    });
    return () => unsubscribe();
  }, []);

  const getNotes = async (uid) => {
    if (!uid) return;
    try {
      
      const q = query(notesCollection, where("userId", "==", uid));
      const data = await getDocs(q);
      const filtered = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setNotes(filtered);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const saveNote = async (note) => {
    if (!user) return; 


    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = note.content;
    if (!tempDiv.textContent.trim() && !note.title.trim()) return;

    try {
      const newNoteData = { 
        ...note, 
        userId: user.uid, 
        createdAt: new Date() 
      };

   
      const docRef = await addDoc(notesCollection, newNoteData);
      
     
      setNotes(prev => [
        ...prev,
        { ...newNoteData, id: docRef.id }
      ]);

    } catch (error) {
      console.error("Error saving note: ", error);
    }
  }; 

  const deleteNote = async (id) => {
    try {
      const noteDoc = doc(db, "notes", id);
      await deleteDoc(noteDoc);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const updateNote = async (id, updatedData) => {
    try {
      const noteDoc = doc(db, "notes", id);
      await updateDoc(noteDoc, updatedData);
      
      setNotes(prev => prev.map(note => note.id === id ? { ...note, ...updatedData } : note));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        showSidebar,
        toggleSidebar,
        notes,
        saveNote,
        deleteNote,
        updateNote,
        user 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
