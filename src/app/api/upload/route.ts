import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }
    
    // Convert File to Base64 to avoid Node.js native fetch FormData boundary bugs
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');
    
    // First try ImgBB if the key is provided
    const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_UPLOAD_API;
    if (imgbbKey) {
      const imgbbFormData = new FormData();
      imgbbFormData.append('image', base64Image);
      
      try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
          method: 'POST',
          body: imgbbFormData
        });
        const data = await res.json();
        if (res.ok && data.data?.url) {
          return NextResponse.json(data.data);
        }
      } catch (err) {
        console.error("ImgBB proxy error:", err);
      }
    }

    // Fallback to FreeImageHost (Chevereto API)
    const freeImageHostKey = "6d207e02198a847aa98d0a2a901485a5";
    const uploadFormData = new FormData();
    uploadFormData.append('image', base64Image);

    const res = await fetch(`https://freeimage.host/api/1/upload?key=${freeImageHostKey}`, {
      method: 'POST',
      body: uploadFormData
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data.image?.url) {
        return NextResponse.json({ url: data.image.url, display_url: data.image.display_url });
      }
    }
    
    // Ultimate fallback placeholder
    return NextResponse.json({ url: "https://placehold.co/600x400/eeeeee/999999.png?text=Upload+Failed" });
  } catch (error) {
    console.error("Server-side upload error:", error);
    return NextResponse.json(
      { url: "https://placehold.co/600x400/eeeeee/999999.png?text=Upload+Error" }
    );
  }
}
