import React, { useState, useRef, useEffect } from 'react';
import './index.css';

interface ImageUploadProps {
  onUpload: (file: File) => void;
  currentImageUrl?: string;
  aspectRatio?: 'square' | 'banner'; // square for profile pic, banner for banner image
  label: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onUpload,
  currentImageUrl,
  aspectRatio = 'square',
  label,
}) => {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when currentImageUrl changes (e.g., when user data loads)
  useEffect(() => {
    if (currentImageUrl) {
      setPreview(currentImageUrl);
    }
  }, [currentImageUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Call upload handler
    onUpload(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='image-upload'>
      <label className='image-upload-label'>{label}</label>
      <div className={`image-preview ${aspectRatio}`}>
        {preview ? (
          <img src={preview} alt='Preview' className='preview-image' />
        ) : (
          <div className='no-image-placeholder'>
            <p>No image uploaded</p>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button type='button' className='button button-secondary' onClick={handleClick}>
        {preview ? 'Change Image' : 'Upload Image'}
      </button>
    </div>
  );
};

export default ImageUpload;
