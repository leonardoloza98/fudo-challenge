'use client';

import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DeleteCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  commentContent: string;
  isLoading?: boolean;
}

export default function DeleteCommentModal({
  isOpen,
  onClose,
  onConfirm,
  commentContent,
  isLoading = false,
}: DeleteCommentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 w-full max-w-md border border-gray-700/50 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-red-400" />
            </div>
            <h3 id="modal-title" className="text-xl font-semibold text-white">
              Eliminar comentario
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-300 mb-4 leading-relaxed">
          ¿Estás seguro de que quieres eliminar este comentario?
        </p>

        <div className="bg-gray-700/50 p-3 rounded-lg mb-6">
          <p className="text-gray-300 text-sm italic">
            &ldquo;
            {commentContent.length > 100
              ? `${commentContent.substring(0, 100)}...`
              : commentContent}
            &rdquo;
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white"
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </div>
      </div>
    </div>
  );
}
