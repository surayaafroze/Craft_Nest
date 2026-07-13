export const imageUpload = async (image: File | Blob): Promise<any> => {
  const formData = new FormData();
  formData.append('image', image);
  
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error("Proxy upload error:", err);
    // Fallback for network errors
    return { url: "https://placehold.co/600x400/eeeeee/999999.png?text=Upload+Failed" };
  }
};

// Alias for backwards compatibility with any existing reference
export const imageUploade = imageUpload;
