import React from 'react';
import { CheckCircle2, Heart, Info, AlertTriangle, X } from 'lucide-react';
import { ToastMessage } from '../../types/recipe';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
          heart: <Heart className="w-5 h-5 text-rose-500 fill-rose-500 flex-shrink-0" />,
          info: <Info className="w-5 h-5 text-sage-600 flex-shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
        };

        const icon = toast.type ? icons[toast.type] : icons.success;

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-soft-xl rounded-2xl p-4 flex items-start gap-3 transform transition-all duration-300 animate-slide-up"
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-charcoal-900">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
