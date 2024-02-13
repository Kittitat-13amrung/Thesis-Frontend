import React from 'react'
import { useDropzone } from 'react-dropzone';

type Props = {}

const AudioDropInput: React.FC<Props> = () => {
  // handle audio file upload
  const handleOnFileDrop = (acceptedFiles:Array<File>) => {
    console.log(acceptedFiles);
  };

  // init dropzone 
  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      "audio/*": [".wav", ".mp3"]
    },
    multiple: false,
    onDrop: handleOnFileDrop,
  });
  
  return (
    < div {...getRootProps() } className = "justify-center center py-32 rounded-lg border-neutral-800 border-dashed border-2 backdrop-blur bg-opacity-40 px-5" >
      {/* Drag n' Drop audio functionality */ }
          <input {...getInputProps()} />
          {/* Icon */}
          <p>Drag 'n' drop some files here, or click to select files</p>
    </div >
  )
}

export default AudioDropInput;