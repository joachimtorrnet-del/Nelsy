import { useRef, useState } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { uploadImage, addGalleryPhoto, deleteGalleryPhoto } from '../../lib/supabase-queries';
import type { GalleryPhoto } from '../../lib/supabase-queries';

interface Props {
  profileId: string;
  photos: GalleryPhoto[];
  onPhotosChange: (photos: GalleryPhoto[]) => void;
}

export default function GalleryManager({ profileId, photos, onPhotosChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const toUpload = files.slice(0, 12 - photos.length);
    if (!toUpload.length) return;

    setUploading(true);
    const newPhotos = [...photos];
    try {
      for (const file of toUpload) {
        const url = await uploadImage(file, 'gallery');
        const photo = await addGalleryPhoto(profileId, url);
        if (photo) newPhotos.push(photo);
      }
      onPhotosChange(newPhotos);
    } catch (err) {
      console.error('Gallery upload error:', err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteGalleryPhoto(id);
      onPhotosChange(photos.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Gallery delete error:', err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative rounded-xl overflow-hidden bg-gray-100"
            style={{ aspectRatio: '3/4' }}
          >
            <img src={photo.image_url} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => handleDelete(photo.id)}
              disabled={deletingId === photo.id}
              className="absolute top-1.5 right-1.5 w-7 h-7 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition disabled:opacity-50"
            >
              {deletingId === photo.id
                ? <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                : <Trash2 className="w-3.5 h-3.5 text-white" />}
            </button>
          </div>
        ))}

        {photos.length < 12 && (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-[#F52B8C] hover:text-[#F52B8C] transition disabled:opacity-50"
            style={{ aspectRatio: '3/4' }}
          >
            {uploading
              ? <Loader2 className="w-5 h-5 animate-spin" />
              : (
                <>
                  <Plus className="w-5 h-5" />
                  <span className="text-xs font-medium">Add</span>
                </>
              )}
          </button>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-2">{photos.length}/12 photos</p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
}
