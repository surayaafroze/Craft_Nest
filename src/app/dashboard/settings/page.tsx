'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { authFetch, useSession } from '@/app/lib/auth-client';
import { Button } from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import FormTextarea from '@/components/ui/FormTextarea';
import { User, Mail, Shield, Camera } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Avatar from '@/components/ui/Avatar';

// Zod schema matching the backend validation
const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters').optional(),
  avatarUrl: z.string().url('Avatar must be a valid URL').optional().or(z.literal('')),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional().or(z.literal('')),
  phone: z.string().max(20, 'Phone number must be less than 20 characters').optional().or(z.literal('')),
  location: z.string().max(100, 'Location must be less than 100 characters').optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function DashboardSettingsPage() {
  const { data: session } = useSession();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty }
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      avatarUrl: '',
      bio: '',
      phone: '',
      location: ''
    }
  });

  const avatarUrl = watch('avatarUrl');
  const name = watch('name');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const res = await authFetch(`/api/backend/users/me`);
        
        if (!res.ok) {
          throw new Error('Failed to load profile data');
        }
        
        const data = await res.json();
        setUserData(data.user);
        
        reset({
          name: data.user.name || '',
          avatarUrl: data.user.avatarUrl || '',
          bio: data.user.bio || '',
          phone: data.user.phone || '',
          location: data.user.location || ''
        });
      } catch (error: any) {
        toast.error(error.message || 'Could not load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [serverUrl, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsSaving(true);
      
      const payload: any = { ...data };
      
      // Clean up empty strings to avoid sending them if not needed, 
      // although backend accepts them as long as they pass validation
      
      const res = await authFetch(`/api/backend/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }
      
      toast.success('Profile updated successfully');
      
      // Update local state to clear dirty state
      reset(data);
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while saving');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white font-heading tracking-tight">
          Profile Settings
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage your public profile and personal details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          className="md:col-span-1 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-zinc-900 dark:text-white mb-6">Account Status</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white capitalize">{userData?.role}</p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">Current Role</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white truncate max-w-[150px]" title={userData?.email}>{userData?.email}</p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">Email Address</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white capitalize">{userData?.authProvider}</p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">Auth Method</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
              <p className="text-xs text-zinc-500 text-center">
                Joined {new Date(userData?.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pb-6 border-b border-zinc-100 dark:border-zinc-800/50">
                <Avatar 
                  src={avatarUrl || userData?.avatarUrl} 
                  fallback={name?.charAt(0) || userData?.name?.charAt(0) || 'U'}
                  size="xl"
                  className="ring-4 ring-emerald-500/20"
                />
                <div className="flex-1 w-full">
                  <FormInput
                    label="Avatar URL"
                    id="avatarUrl"
                    placeholder="https://example.com/avatar.jpg"
                    error={errors.avatarUrl?.message}
                    {...register('avatarUrl')}
                  />
                  <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
                    <Camera className="w-3 h-3" /> Provide a valid image URL for your profile picture.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormInput
                  label="Display Name"
                  id="name"
                  placeholder="Your full name"
                  error={errors.name?.message}
                  {...register('name')}
                />
                <FormInput
                  label="Location"
                  id="location"
                  placeholder="e.g. New York, USA"
                  error={errors.location?.message}
                  {...register('location')}
                />
              </div>

              <FormInput
                label="Phone Number"
                id="phone"
                placeholder="+1 (555) 000-0000"
                error={errors.phone?.message}
                {...register('phone')}
              />

              <FormTextarea
                label="Bio"
                id="bio"
                placeholder="Tell us a little bit about yourself and your craft..."
                rows={4}
                error={errors.bio?.message}
                {...register('bio')}
              />

              <div className="pt-4 flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSaving || !isDirty}
                  className="w-full sm:w-auto"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Saving Changes...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
