"use client";

import { Form } from "@Components/Form";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditPrompt = () => {
  const router = useRouter();

  const searchParam = useSearchParams();
  const searchId = searchParam.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const PromptDetails = async () => {
      const res = await fetch(`/api/prompt/${searchId}`);
      const data = await res.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (searchId) {
      PromptDetails();
    }
  }, [searchId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!searchId) {
      return alert("Prompt ID not found");
    }
    try {
      const res = await fetch(`/api/prompt/${searchId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post?.prompt,
          tag: post?.tag,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    ></Form>
  );
};

export default EditPrompt;
