import React from 'react'
import { createPortal } from 'react-dom';
// import audioWav from '@assets/00_BN1-129-Eb_solo_mic.wav';
import { Icon } from '@iconify/react/dist/iconify.js';
import Volume from './Volume';

type AudioInfo = {
    duration: string,
    currentTime: string,
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
    handlePlayButtonClick: () => void,
}

const AudioPlayer:React.FC<AudioInfo> = (info):React.ReactElement<HTMLElement> => {
    const [seeker, setSeeker] = React.useState<number>(0);
    const [duration, setDuration] = React.useState<number>(0);

    // const audioPlayer = React.useRef<HTMLSourceElement>(null);
    const playPause = info.isPlaying ? (
        <button className='min-w-10' onClick={() => info.handlePlayButtonClick()}>
            <Icon inline icon='material-symbols-light:pause-outline' className='h-8 w-8'/>
        </button>
    ) : (
        <button className='min-w-10' onClick={() => info.handlePlayButtonClick()}>
            <Icon inline icon='material-symbols-light:play-arrow-outline' className='h-8 w-8' />
        </button>
    )

    return createPortal((
        <div className="fixed bottom-0 w-full bg-neutral-900 h-16 z-10 bg-opacity-80 drop-shadow-sm backdrop-blur-sm flex gap-2 justify-evenly items-center">
            {/* <audio controls>
                <source ref={audioPlayer} src={audioWav} type="audio/wav" />
                Your browser does not support the audio element.
            </audio> */}
            {/* play button */}
            {playPause}
            {/* seek slider */}
            <div className="flex gap-2.5 w-1/2">
                {/* current position */}
                <p>{info.currentTime}</p>
                <input type='range' max={100} value={seeker} className='w-full' />
                {/* total duration */}
                <p>{info.duration}</p>
            </div>

            {/* volume slider */}
            <Volume />

        </div>
    ), document.body);
}

export default AudioPlayer