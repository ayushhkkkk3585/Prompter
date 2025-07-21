import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import Collection from "@/models/Collection";
import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";
// import {authOptions} from "@app/api/auth/[...nextauth]/route";
import { authOptions } from "@/lib/authOptions";


export async function GET(request, { params }) {
  await connectToDB();
  const { id } = params;

  try {
    const collection = await Collection.findById(id)
      .populate("creator", "username email")
      .populate({
        path: "prompts",
        populate: { path: "creator", select: "username email image" },
      });

    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    return NextResponse.json(collection);
  } catch {
    return NextResponse.json({ error: "Failed to fetch collection" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectToDB();
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const collection = await Collection.findById(id);
    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }
    if (collection.creator.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { action, promptId } = await request.json();
    if (!action || !promptId) {
      return NextResponse.json({ error: "action and promptId required" }, { status: 400 });
    }

    if (action === "add") {
      if (!collection.prompts.includes(promptId)) {
        collection.prompts.push(promptId);
      }
    } else if (action === "remove") {
      collection.prompts = collection.prompts.filter((p) => p.toString() !== promptId);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await collection.save();
    return NextResponse.json(collection);
  } catch {
    return NextResponse.json({ error: "Failed to update collection" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectToDB();
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const collection = await Collection.findById(id);
    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    // Only allow creator to delete their collection
    if (collection.creator.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Collection.findByIdAndDelete(id);
    return NextResponse.json({ message: "Collection deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete collection" }, { status: 500 });
  }
}

