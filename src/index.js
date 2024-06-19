import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";

import {BrowserRouter, Routes, Route, useParams, NavLink,} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <div className="post-container">
        {posts.map((post) => (
          <NavLink
            className="post-titles"
            style={{ display: "block" }}
            to={`/post/${post.id}`}
          >
            {post.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
};

const Profile = () => {
  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
};

const Settings = () => {
  return (
    <div>
      <h1>Settings Page</h1>
    </div>
  );
};

const SayUser = () => {
  const params = useParams(); //to get params out of the url and is imported from the react-router-dom //also params is an object
  console.log("params", params);
  return (
    <div>
      <h1>Your name is {params.userName}</h1>
    </div>
  );
};

const PostPage = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  console.log("Params", params);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)  //this is very standard practice ki ek .then se pehle data.json ko return karte hain next .then me
      .then((data) => data.json())
      .then((data) => setData(data));  //this willbe simply an object
  }, []);
  console.log("Data", data);
  if (data === null) return <p>Loading...</p>;
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/user/:userName" element={<SayUser />} />

        <Route path="account">
          <Route path="/profile" element={<Profile />} />
          <Route path="/setting" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
