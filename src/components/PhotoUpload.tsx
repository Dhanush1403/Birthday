import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface PhotoUploadProps {
  onPhotosUploaded: (photos: { url: string; title: string; subtitle: string }[]) => void;
  existingPhotos: { url: string; title: string; subtitle: string }[];
}

const PhotoUpload = ({ onPhotosUploaded, existingPhotos }: PhotoUploadProps) => {
  const [photos, setPhotos] = useState(existingPhotos);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = Array.from(files).map((file, index) => ({
      url: URL.createObjectURL(file),
      title: `Memory ${photos.length + index + 1}`,
      subtitle: "A special moment",
    }));

    const updatedPhotos = [...photos, ...newPhotos];
    setPhotos(updatedPhotos);
    onPhotosUploaded(updatedPhotos);
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    onPhotosUploaded(updatedPhotos);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="gap-2"
          style={{ background: "var(--gradient-button)" }}
        >
          <Upload className="w-4 h-4" />
          Upload Photos
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <p className="text-sm text-muted-foreground italic">
          Add your favorite memories
        </p>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <Card key={index} className="relative p-2 group">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-32 object-cover rounded"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
