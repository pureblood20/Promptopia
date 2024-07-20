import Prompt from "@Models/prompt";
import User from "@Models/user";
import { connectToDB } from "@Utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const user = await Prompt.find({ creator: params.id }).populate("creator");
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed in fetching API", { status: 500 });
  }
};
