import React from 'react'
import { createPortal } from 'react-dom';
// import audioWav from '@assets/00_BN1-129-Eb_solo_mic.wav';
import { Icon } from '@iconify/react/dist/iconify.js';
import Volume from './Volume';
import SliderInput from './SliderInput';
import AudioInfo from '@/types/audioPlayer/info';

const AudioPlayer:React.FC<AudioInfo> = (info):React.ReactElement<HTMLElement> => {
    const seeker = React.useRef<HTMLInputElement>(null);

    const playPause = info.isPlaying ? (
        <button className='min-w-10' onClick={() => info.handlePlayButtonClick()}>
            <Icon inline icon='material-symbols-light:pause-outline' className='h-8 w-8'/>
        </button>
    ) : (
        <button className='min-w-10' onClick={() => info.handlePlayButtonClick()}>
            <Icon inline icon='material-symbols-light:play-arrow-outline' className='h-8 w-8' />
        </button>
    );

    const formatDuration = (milliseconds: number | string): string => {
        // convert to integer if string
        if(typeof milliseconds === 'string') milliseconds = parseInt(milliseconds);

        let seconds = milliseconds / 1000;
        const minutes = (seconds / 60) | 0;
        seconds = (seconds - minutes * 60) | 0;
        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0")
        );
    };
    
    const handleSeekerPositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // update song position
        const newPosition = e.target.value;
        info.player.current.timePosition = parseInt(newPosition);

        // update currentTime state
        info.setPlaytime(prevState => ({
            ...prevState,
            currentTime: newPosition
        }));
    };

    return createPortal((
        <div className="fixed bottom-0 w-full bg-neutral-900 h-16 z-[3000] bg-opacity-80 drop-shadow-sm backdrop-blur-sm flex gap-2 justify-evenly items-center">
            {/* <audio controls>
                <source ref={audioPlayer} src={audioWav} type="audio/wav" />
                Your browser does not support the audio element.
            </audio> */}
            {/* play button */}
            {playPause}
            {/* seek slider */}
            <div className="flex gap-2.5 w-1/2">
                {/* current position */}
                <p>{formatDuration(info.currentTime)}</p>
                {/* <input type='range' max={duration} value={seeker} className='w-full' /> */}
                <SliderInput ref={seeker} onChange={handleSeekerPositionChange} max={info.duration} value={info.currentTime} className='w-full accent-neutral-900'/>
                {/* total duration */}
                <p>{formatDuration(info.duration)}</p>
            </div>

            {/* volume slider */}
            <Volume player={info.player}/>

        </div>
    ), document.body);
}

export default AudioPlayer