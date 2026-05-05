import React, { useState } from 'react';
import { MailMinus, Lock, Eye, EyeOff } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase";



const Auth = ({ onLogin }) => {

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

  
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
       
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        console.log("Logged in:", userCredential.user);
        onLogin(userCredential.user);
      } else {
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Registered:", userCredential.user);
        onLogin(userCredential.user);
      }


    } catch (err) {
      console.error("Auth Error:", err.message);
     
      switch (err.code) {
        case 'auth/invalid-email':
          setError("Invalid email address");
          break;
        case 'auth/user-not-found':
          setError("No account found with this email");
          break;
        case 'auth/wrong-password':
          setError("Incorrect password");
          break;
        case 'auth/email-already-in-use':
          setError("Email already in use");
          break;
        case 'auth/weak-password':
          setError("Password should be at least 6 characters");
          break;
        default:
          setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      console.log("Google login:", result.user);
      onLogin(result.user);

    } catch (err) {
      console.error("Google Auth Error:", err.message);
      setError("Google login failed. Please try again.");
    }
     finally {
      setLoading(false);
    }
  };



  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-[#f8f9fa] to-[#e9ecef] font-['Inter',system-ui,-apple-system,sans-serif]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none ">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-[#fbbc04]/20 to-[#f1b000]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-br from-[#1a73e8]/20 to-[#1557b0]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-110">
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-[2rem] shadow-2xl border border-white/30 transition-all duration-300 hover:shadow-3xl">
          
          <div className="mb-8 text-center">
            <div className="inline-flex mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-[#fbbc04] to-[#f1b000] rounded-full blur-md opacity-60" />
                <div className="relative bg-white p-3 rounded-full shadow-md border border-gray-100">
                  <span className="text-2xl">📝</span>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-[#3c4043] to-[#5f6368] bg-clip-text text-transparent">
              {isLogin ? "Login to Keep Notes" : "Create Account"}
            </h1>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="group">
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 focus-within:border-[#fbbc04] focus-within:ring-2 focus-within:ring-[#fbbc04]/20">
                <MailMinus size={20} className="text-gray-400" />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none outline-none w-full ml-3 text-gray-700 placeholder-gray-400 text-base"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="group">
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 focus-within:border-[#fbbc04] focus-within:ring-2 focus-within:ring-[#fbbc04]/20">
                <Lock size={20} className="text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border-none outline-none w-full ml-3 text-gray-700 placeholder-gray-400 text-base"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="group animate-fadeIn">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 focus-within:border-[#fbbc04] focus-within:ring-2 focus-within:ring-[#fbbc04]/20">
                  <Lock size={20} className="text-gray-400" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Confirm Password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-transparent border-none outline-none w-full ml-3 text-gray-700 placeholder-gray-400 text-base"
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="relative w-full py-3.5 bg-linear-to-r from-[#fbbc04] to-[#f1b000] hover:from-[#f1b000] hover:to-[#e5a800] text-[#3c4043] font-semibold rounded-xl shadow-md transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : (isLogin ? "Login" : "Register")}
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200" />
            <span className="px-4 text-gray-400 text-sm font-medium">OR</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <div className="space-y-3">
            <button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="relative w-full py-3.5 border border-gray-200 rounded-xl flex items-center justify-center gap-3 bg-white hover:bg-gray-50 transition-all duration-200 text-gray-700 font-medium shadow-sm disabled:opacity-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>{isLogin ? "Login with Google" : "Register with Google"}</span>
            </button>
            
          
          </div>

          <p className="mt-8 text-gray-500 text-sm text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            <button 
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setPassword("");
                setConfirmPassword("");
              }} 
              className="text-[#fbbc04] font-bold ml-2 hover:underline transition-all duration-200 hover:text-[#e5a800]"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;


