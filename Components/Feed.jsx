"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearch = () => {};
  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    const postFetch = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();

      setPosts(data);
    };
    postFetch();
  }, []);

  const handleTagClick = () => {};
  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for prompts"
          value={searchText}
          onChange={(e) => handleSearch}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
