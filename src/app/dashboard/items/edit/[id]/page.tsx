"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession, authFetch } from "@/app/lib/auth-client";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";
import { imageUpload } from "@/app/lib/imgUpload";
import { UploadCloud, X, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function EditItemPage() {
  const router = useRouter();
  const params = useParams();
  const itemId = params.id as string;
  const { data: session } = useSession();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  
  // Image state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [replaceImage, setReplaceImage] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    category: "",
    quantity: "",
    location: "",
  });

  useEffect(() => {
    // Fetch categories and item details
    const fetchData = async () => {
      try {
        setFetching(true);
        const [catRes, itemRes] = await Promise.all([
          fetch(`${serverUrl}/api/categories`),
          authFetch(`${serverUrl}/api/items/${itemId}`)
        ]);

        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData.data || []);
        }

        if (itemRes.ok) {
          const itemData = await itemRes.json();
          const item = itemData.item;
          
          setFormData({
            title: item.title || "",
            shortDescription: item.shortDescription || "",
            fullDescription: item.fullDescription || "",
            price: item.price ? item.price.toString() : "",
            category: item.category || "",
            quantity: item.quantity ? item.quantity.toString() : "",
            location: item.location || "",
          });

          if (item.images && item.images.length > 0) {
            setExistingImageUrl(item.images[0]);
          }
        } else {
          toast.error("Failed to load item details");
          router.push("/dashboard/items/manage");
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
        toast.error("An error occurred while fetching data");
      } finally {
        setFetching(false);
      }
    };
    
    if (itemId) {
      fetchData();
    }
  }, [itemId, serverUrl, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      let imageUrl = existingImageUrl;

      if (replaceImage && imageFile) {
        const uploadResult = await imageUpload(imageFile);
        if (uploadResult?.url) {
          imageUrl = uploadResult.url;
        } else {
          throw new Error("Failed to upload new image");
        }
      }

      const itemData = {
        title: formData.title,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        price: parseFloat(formData.price),
        category: formData.category,
        quantity: parseInt(formData.quantity) || 1,
        location: formData.location,
        images: replaceImage && !imageFile ? [] : (imageUrl ? [imageUrl] : []),
      };

      const res = await authFetch(`${serverUrl}/api/items/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.details && data.details.length > 0) {
          throw new Error(data.details[0].message);
        }
        throw new Error(data.error || "Failed to update item");
      }

      toast.success("Item updated successfully!");
      router.push(`/items/${itemId}`);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-sm"
      >
        <div className="mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white font-heading tracking-tight">Edit Item</h1>
            <p className="text-zinc-500 mt-2">Update your listing details.</p>
          </div>
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload Area */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white">Product Image</label>
            
            {!replaceImage && existingImageUrl ? (
              <div className="relative border border-zinc-200 dark:border-zinc-700 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-6">
                <img src={existingImageUrl} alt="Current" className="w-40 h-40 object-cover rounded-xl shadow-sm" />
                <div>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">This is the current image for your item.</p>
                  <Button type="button" variant="outline" onClick={() => setReplaceImage(true)}>
                    Replace Image
                  </Button>
                </div>
              </div>
            ) : (
              <div className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-colors ${imagePreview ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10' : 'border-zinc-300 dark:border-zinc-700 hover:border-emerald-400 dark:hover:border-emerald-500'}`}>
                {imagePreview ? (
                  <div className="relative w-full max-w-sm">
                    <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-xl shadow-sm" />
                    <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); }} className="absolute -top-3 -right-3 p-1.5 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-transform hover:scale-110">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-500 dark:text-zinc-400">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Click or drag image to upload</p>
                    <p className="text-xs text-zinc-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </>
                )}
                {existingImageUrl && (
                  <div className="mt-4">
                    <Button type="button" variant="ghost" size="sm" onClick={() => { setReplaceImage(false); setImageFile(null); setImagePreview(null); }}>
                      Keep Existing Image Instead
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Title *"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. Handmade Ceramic Bowl"
              required
            />
            
            <FormInput
              label="Price ($) *"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-zinc-900 dark:text-white">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full h-[3.25rem] rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-emerald-500"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <FormInput
              label="Quantity"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="1"
            />
          </div>

          <FormInput
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g. New York, USA"
          />

          <FormTextarea
            label="Short Description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            placeholder="A brief catchy description..."
            rows={2}
          />

          <FormTextarea
            label="Full Description"
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleInputChange}
            placeholder="Detailed description of materials, process, etc..."
            rows={5}
          />

          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <Button
              type="submit"
              size="lg"
              className="rounded-xl px-8"
              loading={loading}
              disabled={loading}
            >
              <Check className="w-5 h-5 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
