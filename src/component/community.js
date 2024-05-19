import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Navbar2 from "./NavBar2";
import "../css/Community.css"; // Import CSS file for styling

function Community() {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [newComment, setNewComment] = useState("");
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [messages, setMessages] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/communities`)
      .then((response) => {
        if (response.status === 200) {
          setCommunities(response.data);
        } else {
          console.error("Error fetching communities:", response.data);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (id) {
      setSelectedCommunity(id);
      // Load messages for the selected community
      fetchMessages(id);
    }
  }, [id]);

  const fetchMessages = (communityId) => {
    axios
      .get(`http://localhost:5000/community/messages/${communityId}`)
      .then((response) => {
        if (response.status === 200) {
          setMessages(response.data);
        } else {
          console.error("Error fetching comments:", response.data);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const addComment = () => {
    if (!selectedCommunity) {
      console.error("No community selected");
      return;
    }

    const storedUsername = localStorage.getItem("username");

    axios
      .post(
        "http://localhost:5000/addmessage",
        {
          content: newComment,
          username: storedUsername,
          community_id: selectedCommunity,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          // Refresh messages after adding new comment
          fetchMessages(selectedCommunity);
          setNewComment("");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const deleteComment = (commentId) => {
    axios
      .delete(`http://localhost:5000/addmessage/${commentId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        // Refresh messages after deleting a comment
        fetchMessages(selectedCommunity);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleCommunityChange = (e) => {
    const communityId = e.target.value;
    setSelectedCommunity(communityId);
    fetchMessages(communityId);
  };

  return (
    <div>
      <Navbar2 />

      <div className="community-container">
        <br />
        <div className="sidebar">
          <h2>Communities</h2>
          <select value={selectedCommunity} onChange={handleCommunityChange}>
            <option value="">Select Community</option>
            {communities.map((community) => (
              <option
                key={community.community_id}
                value={community.community_id}
              >
                {community.community_name}
              </option>
            ))}
          </select>
        </div>
        <div className="chat-container">
          {selectedCommunity && (
            <div className="chat-section">
              <div className="messages">
                {messages.map((comment, key) => (
                  <div key={key} className="message">
                    <span className="username">{comment.username}:</span>
                    <span className="content">{comment.content}</span>
                    {authState && authState.username === comment.username && (
                      <button
                        onClick={() => deleteComment(comment.id)}
                        className="delete-button"
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="add-comment">
                <input
                  type="text"
                  placeholder="Write a message..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={addComment}>Send</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Community;
