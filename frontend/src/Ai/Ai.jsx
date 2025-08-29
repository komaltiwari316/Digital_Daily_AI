import React, { useState, useRef, useEffect } from "react";

const Ai = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function HandleNotes() {
    if (!text.trim()) return alert("Please type something first!");


    setMessages((prev) => [...prev, { sender: "user", content: text }]);
    setText("");

    try {
      const res = await fetch("http://localhost:3000/ai/ai_assisant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      const reply = data.newdata || "No response from AI";

      // Add AI response to chat
      setMessages((prev) => [...prev, { sender: "ai", content: reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", content: "Error fetching AI response" },
      ]);
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#0d1117",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        color: "#fff",
      }}
    >
      {/* Chat Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                msg.sender === "user" ? "#238636" : "#1e1e1e",
              color: "#fff",
              padding: "12px 18px",
              borderRadius: "15px",
              maxWidth: "70%",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              whiteSpace: "pre-wrap",
              fontSize: "1rem",
            }}
          >
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "10px",
          backgroundColor: "#161b22",
          borderRadius: "10px",
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            backgroundColor: "#0d1117",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "1rem",
            resize: "none",
            outline: "none",
          }}
          rows={1}
        />
        <button
          onClick={HandleNotes}
          style={{
            backgroundColor: "#238636",
            border: "none",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            transition: "0.2s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#2ea043")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "#238636")
          }
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Ai;

