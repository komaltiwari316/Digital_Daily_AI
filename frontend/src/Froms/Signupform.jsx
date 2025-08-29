import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signupform() {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate();

  const HandleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://digital-daily-ai.onrender.com/person/sign_up', {
        name,
        email,
        password
      })

      // if (res.data.success) {
      //   toast.success("Signup successfully!");
      //   setTimeout(() => navigate('/login'), 1500);

      // }

      toast.success("Signup successfully!", {
        onClose: () => navigate('/login')
      });

    } catch (error) {
      console.log("Error in sign up", error);
    }
  }

  return (
    <>
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('https://img.freepik.com/free-photo/top-view-keyboard-desk-with-notebook-copy-space_23-2148415052.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>

        <form style={{
          display: "flex", flexDirection: "column", gap: "25px", padding: "30px", borderRadius: "8px", width: "70vh", backgroundColor: "lightyellow", marginLeft: "400px", height: "70vh", boxShadow: "0px 8px 20px rgba(0,0,0,0.3)"
        }} onSubmit={HandleSignup}>
          <label htmlFor="name">Enter Your Full Name:</label>
          <input type="text" name="name" id="name" required style={{ padding: "8px", borderRadius: "4px" }}
            value={name}
            onChange={(e) => setname(e.target.value)} />

          <label htmlFor="email">Enter Your Email:</label>
          <input type="email" name="email" id="email" required style={{ padding: "8px", borderRadius: "4px" }}
            value={email}
            onChange={(e) => setemail(e.target.value)} />

          <label htmlFor="password">Enter Your Password:</label>
          <input type="password" name="password" id="password" required style={{ padding: "8px", borderRadius: "4px" }}
            value={password}
            onChange={(e) => setpassword(e.target.value)} />

          <button
            type="submit"
            style={{
              padding: "12px 20px",
              backgroundColor: "green",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "1rem",
              border: "none",
              alignSelf: "center",
              transition: "all 0.3s ease"
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = "#006400"}
            onMouseOut={e => e.currentTarget.style.backgroundColor = "green"}
          >
            Submit
          </button>
          <div style={{ textAlign: "center", marginTop: "-40px" }}>
            <hr style={{ margin: "20px 0", border: "0", borderTop: "1px solid #858181ff" }} />
            <Link
              to="/login"
              style={{ marginLeft: "10px", color: "blue", textDecoration: "underline" }}
            >
              Already have an account?
            </Link>
          </div>

        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}



