import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

type Props = {
  onChange: (value: string) => void
  value: string
}

export const ImageUpload = ({ onChange, value }: Props) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
    },
    [onChange],
  )

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset='airbnb'
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            // TODO: Why is h-80 needed here?
            className='relative flex h-80 cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 text-neutral-600 transition hover:opacity-70'
            onClick={() => open?.()}
          >
            <TbPhotoPlus size={50} />
            <div className='text-lg font-semibold'>Click to upload</div>
            {value && (
              <div className='absolute inset-0 h-full w-full'>
                <Image alt='Upload' fill style={{ objectFit: 'cover' }} src={value} />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}
