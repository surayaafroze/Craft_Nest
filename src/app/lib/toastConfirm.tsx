import toast from 'react-hot-toast';
import React from 'react';

export const confirmDeleteToast = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    toast((t) => (
      <div className="flex flex-col gap-3 min-w-[250px]">
        <p className="font-semibold text-zinc-900 dark:text-white">{message}</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700"
            onClick={() => {
              toast.dismiss(t.id);
              resolve(false);
            }}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1.5 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
            onClick={() => {
              toast.dismiss(t.id);
              resolve(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
    });
  });
};
