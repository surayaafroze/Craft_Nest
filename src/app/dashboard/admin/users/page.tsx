"use client";

import { useEffect, useState } from 'react';
import { getAdminUsers, updateUserStatus } from '@/lib/admin';
import { handleApiError } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { Users, Shield, Check, X, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';

export default function ManageUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAdminUsers();
      setUsers(data.users);
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (userId: string, newStatus: string) => {
    try {
      await updateUserStatus(userId, newStatus);
      toast.success(`User updated successfully`);
      fetchUsers();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Manage Users</h2>
        <p className="text-muted-foreground mt-1">View and manage all registered users.</p>
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {users.map((user) => (
                <motion.tr 
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                        {user.name?.charAt(0) || '?'}
                      </div>
                      <div>
                        <div className="font-medium text-zinc-900 dark:text-white">{user.name}</div>
                        <div className="text-zinc-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={user.role === 'admin' ? 'default' : 'outline'} className="capitalize">
                      {user.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant={user.status === 'suspended' ? 'destructive' : 'success'} 
                      className="capitalize"
                    >
                      {user.status || 'active'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {user.role !== 'admin' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs h-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200"
                          onClick={() => handleUpdateStatus(user._id, 'admin')}
                        >
                          <ShieldAlert className="w-3 h-3 mr-1" /> Promote
                        </Button>
                      )}
                      
                      {user.status === 'suspended' ? (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                          onClick={() => handleUpdateStatus(user._id, 'active')}
                        >
                          <Check className="w-3 h-3 mr-1" /> Activate
                        </Button>
                      ) : (
                        user.role !== 'admin' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                            onClick={() => handleUpdateStatus(user._id, 'suspended')}
                          >
                            <X className="w-3 h-3 mr-1" /> Suspend
                          </Button>
                        )
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
              
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
