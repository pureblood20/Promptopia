import Prompt from "@Models/prompt";
import { connectToDB } from "@Utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const res = await Prompt.find({ tag: params.tagname }).populate("creator");
    console.log(res);
    if (!res) {
      return new Response("No tags found", { status: 404 });
    }
    return new Response(JSON.stringify(res), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch tags", { status: 500 });
  }
};
