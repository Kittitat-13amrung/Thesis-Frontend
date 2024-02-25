import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react'
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

const AudioDropInput: React.FC = () => {
  const navigate = useNavigate();
  const fileDropRef = React.useRef<HTMLDivElement>(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);

  // handle audio file upload
  const handleOnFileDrop = async (acceptedFiles: Array<File>) => {
    setIsUploading(true);

    // formData init
    const formData = new FormData();
    formData.append('audio', acceptedFiles[0]);

    // XMR Request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/predict', true);

    // on upload progress
    xhr.upload.onprogress = (event: ProgressEvent) => {
      const percentages = + (((event.loaded / event.total) * 100) / 2).toFixed(2);
      console.log(percentages, event.loaded, event.total);
      setUploadProgress(percentages);
    };

    // on upload complete
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      console.log(xhr.readyState)
      setIsUploading(false);

      if (xhr.status === 201) {
        const response = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
        navigate(`/songs?name=${response.filename}`);
      }

      if (xhr.status !== 201) {
        console.error(xhr.responseText);
      }
    }

    xhr.send(formData);

    // console.log(success);

    // fetch('http://localhost:5000/predict', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     setIsUploading(false);
    //     console.log(data);
    //     navigate(`/tab-visualiser?song=${data.filename}`, { state: { tab: data.tab } });
    //   })
    //   .catch(error => {
    //     setIsUploading(false);
    //     console.error(error)
    //   });
  };

  // dropzone init 
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      "audio/*": [".wav", ".mp3"]
    },
    multiple: false,
    onDrop: handleOnFileDrop,
  });

  return (
    < div {...getRootProps()} ref={fileDropRef} className={`h-[30vh] w-[500px] flex flex-col justify-center items-center gap-5 rounded-lg border-neutral-800 border-dashed border-2 backdrop-blur bg-opacity-40 px-5 ${isDragActive ? 'hover:cursor-grabbing' : 'hover:cursor-pointer'}`} >
      {/* Drag n' Drop audio functionality */}
      <input {...getInputProps()} />
      {/* Icon */}
      <Icon inline icon={isDragActive ? 'line-md:uploading-loop' : 'mingcute:upload-line'} className={`w-28 h-28 text-neutral-100 ${isDragActive && 'animate-pulse'}`} />
      {isUploading ? (
        <>
          <input type='range' className='w-64 accent-lime-300 caret-lime-300 pointer-events-none transition-all' readOnly value={uploadProgress} max={100}/>
          <p className='text-neutral-100 text-lg'>Uploading {uploadProgress}%</p>
        </>
      ) : (
        <p>{isDragActive ? 'Release to drop your audio here' : `Drag n' drop some files here, or click to select files`}</p>
      )}
    </div >
  )
}

export default AudioDropInput;