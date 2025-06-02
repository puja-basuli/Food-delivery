import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET - Fetch user profile
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        name: true,
        email: true,
        image: true,
        dob: true,
        phone: true,
        house: true,
        city: true,
        pincode: true,
        country: true,
        admin: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

// PUT - Update profile
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      name,
      image,
      dob,
      phone,
      house,
      city,
      pincode,
      country,
    } = await request.json();

    const dobDate = dob ? new Date(dob) : undefined;
    if (dob && isNaN(dobDate.getTime())) {
      return NextResponse.json({ error: "Invalid DOB format" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        ...(name && { name }),
        ...(image && { image }),
        ...(dobDate && { dob: dobDate }),
        ...(phone && { phone }),
        ...(house && { house }),
        ...(city && { city }),
        ...(pincode && { pincode }),
        ...(country && { country }),
        

      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// POST - Upload profile image to Cloudinary
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const uploadRes = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "profile_pics" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
      stream.pipe(uploadStream);
    });

    await prisma.user.update({
      where: { email: session.user.email },
      data: { image: uploadRes.secure_url },
    });

    return NextResponse.json({ success: true, image: uploadRes.secure_url });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
