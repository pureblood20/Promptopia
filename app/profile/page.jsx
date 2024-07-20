"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from "@Components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState("");
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const isConfirm = confirm("Are you sure want to delete the prompt?");
    console.log(confirm);
    if (isConfirm) {
      try {
        console.log("fsed");
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPost = posts.filter((item) => post._id != item._id);
        setPosts(filteredPost);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };

    if (session) {
      fetchUser();
    }
  }, [session]);
  if (!posts?.length) {
    return null;
  }
  return (
    <Profile
      name="My"
      posts={posts}
      desc="Welcome to your personalized profile"
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
