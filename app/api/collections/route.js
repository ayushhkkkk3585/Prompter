import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect"; // your DB connection helper
import { connectToDB } from "@utils/database";
import Collection from "@/models/Collection";
import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth"; // your next-auth config
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { authOptions } from "@/lib/authOptions";


export async function GET(request) {
  await connectToDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find collections where creator matches logged-in user id
    const collections = await Collection.find({ creator: session.user.id })
      .populate("creator", "username email")
      .select("name description creator createdAt")
      .sort({ createdAt: -1 });

    return NextResponse.json(collections);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
  }
}


export async function POST(request) {
  await connectToDB();

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { name, description } = body;

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const newCollection = new Collection({
      name,
      description: description || "",
      creator: session.user.id,
      prompts: [],
    });

    await newCollection.save();
    return NextResponse.json(newCollection, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create collection" }, { status: 500 });
  }
}
