"use client";

import PromptCard from "@Components/PromptCard";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Tag = () => {
  const tagParam = useSearchParams();
  const tagname = tagParam.get("tag");
  const [posts, setPosts] = useState();
  useEffect(() => {
    const fetchTag = async () => {
      const res = await fetch(`/api/prompt/tag/${tagname}`);
      const data = await res.json();
      setPosts(data);
    };
    if (tagname) {
      fetchTag();
    }
  }, [tagname]);
  if (!posts) {
    return null;
  }
  const PromptCardList = ({ data }) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard key={post._id} post={post} />
        ))}
      </div>
    );
  };
  console.log(posts);
  return (
    <div>
      <PromptCardList data={posts} />
    </div>
  );
};

export default Tag;
