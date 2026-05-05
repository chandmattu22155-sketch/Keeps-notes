import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (

    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="p-6 bg-white shadow rounded">
        <h2 className="text-xl mb-4">Register</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-500 text-white px-4 py-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
}


