import React, { useEffect } from 'react'
import './DD.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

function DD() {
  const [currentnotes, setcurrentnotes] = useState("")
  const [notes, setNotes] = useState([])
  const [showmodel, setshowmodel] = useState(false);
  const [noteimages, setnotesimages] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [preview, setpreview] = useState(null);
  const [user, setuser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "null" && storedUser !== "undefined") {
      try {
        return JSON.parse(storedUser);
      } catch {
        return {};
      }
    }
    return {};
  });


  const [aiSummary, setaiSummary] = useState("")
  const navigate = useNavigate();

  const HandleSave = () => {
    const content = currentnotes.trim();
    if (!content) {
      return;
    }
    const previw = content.replace(/<[^>]+>/g, '').slice(0, 15) + "...."; // remove tags for preview
    const newnotes = { title: previw, content: content };

    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData.email) {
      console.log("user not logged in!");
      return;
    }
    const noteskey = `notes_${userData.email}`;

    // setNotes((prevnotes) => {
    //   const updatednotes = [...prevnotes, newnotes];
    //   localStorage.setItem(noteskey, JSON.stringify(updatednotes));
    //   return updatednotes;
    // });

    if (editIndex !== null) {
      // ✏️ Update existing note
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = newnotes;
      setNotes(updatedNotes);
      localStorage.setItem(noteskey, JSON.stringify(updatedNotes));
      setEditIndex(null);
      toast.success("note updated successfully!");
    } else {
      // ➕ Add new note
      const updatedNotes = [...notes, noteimages];
      setNotes(updatedNotes);
      localStorage.setItem(noteskey, JSON.stringify(updatedNotes));
      toast.success("note saved successfully!");
    }

    toast.success("note saved successfully!");
    setcurrentnotes("");
    document.getElementById("Ourthoughts").innerHTML = "Start Typing.....";
  };


  const handleDelete = (index) => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    if (!userdata?.email) {
      return;
    }
    const noteskey = `notes_${userdata.email}`;

    const savedNotes = JSON.parse(localStorage.getItem(noteskey)) || [];
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    localStorage.setItem(noteskey, JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    toast.success("notes deleted successfully!");
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.email) {
      const notesKey = `notes_${userData.email}`;
      let savednotes = JSON.parse(localStorage.getItem(notesKey)) || [];
      setNotes(savednotes);
    }
  }, [])

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser || storedUser === 'null' || storedUser === 'undefined') {
        console.log("NO valid user found in localStroage");
        setuser({})
        return;
      }
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed user Object : ", parsedUser);
        setuser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data", error);
        setuser({})
      }
    }

    loadUser();
    window.addEventListener('storage', loadUser);
    return () => {
      window.removeEventListener('storage', loadUser);
    }
  }, [])

  const Handlelogout = () => {
    localStorage.removeItem('user');
    setuser({});
    window.dispatchEvent(new Event("storage"));
    navigate('/login')
    toast.success("logout successfully!");
  }
  return (
    <>
      <div style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR76qcl9lpQbx-chr6YCinrqO6mmIkuF5ewwg&s')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column"
      }}>
        <nav className="navbar  fixed-top" style={{ backgroundColor: "#acbfceff" }}>
          <div className="container-fluid">
            <a href=""></a>
            <div className="dropdown" style={{ marginLeft: "-1300px" }}>
              <button
                className="btn btn-black dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                😊 Welcome {user?.name || "GUest"}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ backgroundColor: "#afbdc8ff" }}>
                <li><a className="dropdown-item" href="#" onClick={Handlelogout}>Logout</a></li>
              </ul>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{ backgroundColor: "#acbfceff" }}>
              <div className="offcanvas-header" id="savethoughts">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Your Notes</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                {notes.map((notes, index) => (
                  <p
                    key={index}
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => {
                      // setcurrentnotes({ ...notes, index });
                      // setshowmodel(true);
                      setcurrentnotes(notes);
                      setEditIndex(index);
                      setshowmodel(true);
                    }}
                  >
                    {notes.title}
                  </p>
                ))}
                {showmodel && (
                  <div className="modal-backdrop">
                    <div className="modal-content">
                      <h2>{notes[editIndex]?.title}</h2>
                      <div dangerouslySetInnerHTML={{ __html: notes[editIndex]?.content }} />

                      {notes[editIndex]?.image && (
                        <img
                          src={notes[editIndex].image}
                          alt="Note"
                          style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }}
                        />
                      )}

                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                        {/* ✏️ Edit */}
                        <button
                          style={{ marginRight: "5px", background: "blue", color: "white" }}
                          onClick={() => {
                            const noteToEdit = notes[editIndex];
                            setcurrentnotes(noteToEdit.content); // note का content वापस editor में
                            document.getElementById("Ourthoughts").innerHTML = noteToEdit.content;
                            setshowmodel(false);
                          }}
                        >
                          ✏️ Edit
                        </button>

                        {/* 🗑 Delete */}
                        <button
                          onClick={() => {
                            handleDelete(editIndex); // index state से delete
                            setshowmodel(false);
                          }}
                          style={{ padding: "5px 10px", background: "#dc3545", color: "white", border: "none", cursor: "pointer" }}
                        >
                          🗑 Delete
                        </button>

                        {/* ✖ Close */}
                        <button
                          onClick={() => setshowmodel(false)}
                          style={{ padding: "5px 10px", background: "#6c757d", color: "white", border: "none", cursor: "pointer" }}
                        >
                          ✖ Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}


              </div>
            </div>
          </div>
        </nav>
        <div className="container" style={{ marginTop: "90px" }}>
          <div
            contentEditable="true"
            suppressContentEditableWarning={true}
            style={{
              width: "1500px",
              minHeight: "550px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginLeft: "-100px",
              overflowY: "auto",
              backgroundColor: "black",
              color: "white"
            }}
            id="Ourthoughts"
            // onInput={(e) => setcurrentnotes(e.currentTarget.innerText)}
            onInput={(e) => setcurrentnotes(e.currentTarget.innerHTML)}
          >Start Typing.....</div>
          <button
            className="btn btn-sm btn-primary"
            style={{
              marginTop: "10px",
              marginLeft: "auto",
              display: "block"
            }}
            onClick={HandleSave}
          >
            Save
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const editor = document.getElementById("Ourthoughts");
                  if (editor) {
                    editor.innerHTML += `<br/><img src="${reader.result}" style="max-width:300px; border-radius:8px; margin-top:40px;"/>`;
                    setcurrentnotes(editor.innerHTML);
                  }
                };
                reader.readAsDataURL(file);
              }
            }}
            style={{
              backgroundColor: "#97c1e6",
              marginLeft: "20px",
            }}
          />
          {preview && (
            <img src={preview}
              alt="Preview"
              style={{ width: "200px", marginTop: "10px", borderRadius: "8px" }} />
          )}

          <Link to="/aiassistant">
            <button
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                background: "rgba(255, 215, 0, 0.15)",
                backdropFilter: "blur(6px)",
                border: "2px solid rgba(255, 215, 0, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "#FFD700",
                cursor: "pointer",
                boxShadow: "0 0 10px rgba(255, 215, 0, 0.4)",
                transition: "all 0.3s ease",
                position: "fixed",
                bottom: "30px",
                right: "30px",
                zIndex: 999
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(255, 215, 0, 0.8)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(255, 215, 0, 0.4)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              🤖
            </button>
          </Link>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  )
}
export default DD

