import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/person/login_up', { email, password });
       console.log("Login Response =>", res.data);

      if (res.data.user) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("User stored in localStorage =>", localStorage.getItem("user")); // DEBUG

      window.dispatchEvent(new Event("storage"));
      toast.success("Login successfully!");
      setTimeout(() => navigate('/DDPage'), 2000);
    } else {
      toast.error("Login failed: no user object received!");
    }
    } catch (error) {
      console.log("Error in login", error);
      toast.error("Login failed!");
    }
  }

  return (
    <>
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundImage: "url('https://img.freepik.com/free-photo/view-school-supplies-composition_23-2148565137.jpg?semt=ais_hybrid&w=740&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        {/* Overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 1
        }}></div>

        <form onSubmit={HandleLogin} style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "30px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "400px",
          backgroundColor: "aliceblue",
          position: "relative",
          zIndex: 2,
          boxShadow: "0px 8px 20px rgba(0,0,0,0.3)"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Login</h2>

          <label>Email:</label>
          <input type="email" required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password:</label>
          <input type="password" required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" style={{
            padding: "12px",
            backgroundColor: "lightgreen",
            color: "#000",
            fontWeight: "bold",
            borderRadius: "1rem",
            border: "none",
            cursor: "pointer",
            alignSelf: "center",
            transition: "all 0.3s ease"
          }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = "#32CD32"} // darker green on hover
            onMouseOut={e => e.currentTarget.style.backgroundColor = "lightgreen"}
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default LoginForm;
