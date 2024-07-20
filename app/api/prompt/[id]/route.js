import Prompt from "@Models/prompt";
import { connectToDB } from "@Utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 405 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  console.log(params.id);
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt Deleted", { status: 500 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
