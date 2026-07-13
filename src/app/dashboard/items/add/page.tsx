"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, authFetch } from "@/app/lib/auth-client";
import { FormInput } from "@/components/ui/FormInput";
import { FormTextarea } from "@/components/ui/FormTextarea";
import { FormSelect } from "@/components/ui/FormSelect";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";
import { imageUpload } from "@/app/lib/imgUpload";
import { UploadCloud, X, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function AddItemPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
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
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${serverUrl}/api/categories`);
        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, [serverUrl]);

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
      let imageUrl = "";

      if (imageFile) {
        const uploadResult = await imageUpload(imageFile);
        if (uploadResult?.url) {
          imageUrl = uploadResult.url;
        } else {
          throw new Error("Failed to upload image");
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
        images: imageUrl ? [imageUrl] : [],
      };

      const res = await authFetch(`${serverUrl}/api/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create item");
      }

      toast.success("Item created successfully!");
      router.push("/dashboard/items/manage");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-sm"
      >
        <div className="mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white font-heading tracking-tight">Add New Item</h1>
          <p className="text-zinc-500 mt-2">List a new handcrafted item for your portfolio or shop.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload Area */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white">Product Image</label>
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
            </div>
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
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <FormInput
              label="Quantity"
              name="quantity"
              type="number"
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
              Publish Item
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
