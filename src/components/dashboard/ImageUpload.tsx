import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Props {
  currentImageUrl?: string | null;
  onImageUploaded: (url: string) => void;
  userId: string;
  folder?: string;
  maxSizeMB?: number;
}

export default function ImageUpload({
  currentImageUrl,
  onImageUploaded,
  userId,
  folder = 'avatars',
  maxSizeMB = 5,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [error, setError] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file || !supabase) return;

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      setError(`File too large. Max size: ${maxSizeMB}MB`);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(folder)
        .upload(fileName, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(folder)
        .getPublicUrl(fileName);

      onImageUploaded(publicUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Upload failed. Please try again.');
      setPreview(currentImageUrl || null);
    } finally {
      setUploading(false);
    }
  }, [userId, folder, maxSizeMB, onImageUploaded, currentImageUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    disabled: uploading,
  });

  const handleRemove = () => {
    setPreview(null);
    onImageUploaded('');
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative w-32 mx-auto">
          <img
            src={preview}
            alt="Avatar preview"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          {uploading ? (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          ) : (
            <button
              onClick={handleRemove}
              className="absolute -top-1 -right-1 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition shadow-lg"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
            isDragActive
              ? 'border-[#F52B8C] bg-pink-50'
              : 'border-gray-300 hover:border-[#F52B8C] hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />

          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>

          {isDragActive ? (
            <p className="text-[#F52B8C] font-medium">Drop your image here</p>
          ) : (
            <>
              <p className="text-gray-900 font-medium mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PNG, JPG or WEBP (max {maxSizeMB}MB)</p>
            </>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
}
