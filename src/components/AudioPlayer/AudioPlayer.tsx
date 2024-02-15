import React from 'react'
import { createPortal } from 'react-dom';
import audioWav from '@assets/00_BN1-129-Eb_solo_mic.wav';
import { Icon } from '@iconify/react/dist/iconify.js';
import Volume from './Volume';

type AudioInfo = {
    duration: string,
    currentTime: string,
}

const AudioPlayer:React.FC<AudioInfo> = (info) => {
    const audioPlayer = React.useRef<HTMLSourceElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const playPause = isPlaying ? (
        <button className='min-w-10' onClick={() => setIsPlaying(!isPlaying)}>
            <Icon inline icon='material-symbols-light:pause-outline' className='h-8 w-8'/>
        </button>
    ) : (
        <button className='min-w-10' onClick={() => setIsPlaying(!isPlaying)}>
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
                <input type='range' max={100} value={0} className='w-full' />
                {/* total duration */}
                <p>{info.duration}</p>
            </div>

            {/* volume slider */}
            <Volume />

        </div>
    ), document.body);
}

export default AudioPlayer