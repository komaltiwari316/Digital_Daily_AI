import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MainBody.css'; // For animation CSS

function MainBody() {
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  const handleClick = (path) => {
    setShowAnimation(true);

    // Wait for animation (2s) then navigate
    setTimeout(() => {
      navigate(path);
    }, 1000);
  };

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661284825506-a684dccd5f3d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      backgroundSize: 'cover',
    }}>

      {showAnimation ? (
        <div className="cartoon-animation" style={{fontSize:"50px"}}>
           🎉 Yay! Welcome! 🎈 
        </div>
      ) : (
        <>
          <p style={{
            padding: "20px",
            fontSize: "25px",
            fontFamily: "'Georgia', serif",
            maxWidth: "800px",
            lineHeight: "1.6",
            color: "#0e0c0cff",
            marginLeft:"30px"
          }}>
            “In the noise of the world — the messages, the expectations, the endless scroll — 
            I often forget to pause and listen to myself. This digital diary is not just an app or a page;
            it is my quiet space, untouched by judgment or comparison."
          </p>

          <div style={{
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px"
          }}>
            <button 
              onClick={() => handleClick('/signup')}
              style={{
                backgroundColor: "black",
                color: "white",
                width: "150px",
                height: "50px",
                fontSize: "16px",
                borderRadius: "1rem",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#444"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "black"}
            >
              Sign up
            </button>

            <span style={{ fontSize: "16px", color: "#0b0b0bff" }}>Or</span>

            <button 
              onClick={() => handleClick('/login')}
              style={{
                backgroundColor: "black",
                color: "white",
                width: "150px",
                height: "50px",
                fontSize: "16px",
                borderRadius: "1rem",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#444"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "black"}
            >
              Log in
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default MainBody;
