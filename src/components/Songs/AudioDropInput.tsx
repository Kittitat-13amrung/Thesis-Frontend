import React from 'react'
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

type Props = {}

const AudioDropInput: React.FC<Props> = () => {
  const navigate = useNavigate();

  // handle audio file upload
  const handleOnFileDrop = (acceptedFiles: Array<File>) => {
    console.log(acceptedFiles);

    const formData = new FormData();

    formData.append('audio', acceptedFiles[0]);

    fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigate(`/tab-visualiser?song=${data.filename}`, { state: { tab: data.tab } });
    })
    .catch(error => console.error(error));
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
    < div {...getRootProps()} className="justify-center center py-32 rounded-lg border-neutral-800 border-dashed border-2 backdrop-blur bg-opacity-40 px-5 hover:cursor-pointer" >
      {/* Drag n' Drop audio functionality */}
      <input {...getInputProps()} />
      {/* Icon */}
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div >
  )
}

export default AudioDropInput;