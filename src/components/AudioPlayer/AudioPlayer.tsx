import React from 'react'
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import Volume from './Volume';
import SliderInput from './SliderInput';
import AudioInfo from '@/types/audioPlayer/info';
import PlayPauseButton from './PlayPauseButton';
import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import VolumeType from '@/types/audioPlayer/volume';
import { useSearchParams } from 'react-router-dom';

const AudioPlayer: React.FC<AudioInfo> = (info): React.ReactElement<HTMLElement> => {
    const seeker = React.useRef<HTMLInputElement>(null);
    const audioMetadata = React.useRef<HTMLAudioElement>(null);
    const volume = useReadLocalStorage<VolumeType>("currentVolume");
    const [searchParams,] = useSearchParams();

    const songName = searchParams.get('song');

    React.useEffect(() => {
        if (audioMetadata.current && volume) {
            // const songName = searchParams.get('song');
            audioMetadata.current.volume = volume.currentVolume / 100;
        }

        if (!info.player.current) return;

        info.player.current.beatMouseDown.on(() => {
            if (!audioMetadata.current) return;
            if (!seeker.current) return;

            let currentPlayTime = parseInt(seeker.current.value);

            if (currentPlayTime < 0) {
                currentPlayTime = 1000;
            }

            audioMetadata.current.currentTime = currentPlayTime / 1000;
        })

    }, []);

    // format duration to mm:ss
    const formatDuration = (milliseconds: number | string): string => {
        // convert to integer if string
        if (typeof milliseconds === 'string') milliseconds = parseInt(milliseconds);

        let seconds = milliseconds / 1000;
        const minutes = (seconds / 60) | 0;
        seconds = (seconds - minutes * 60) | 0;
        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0")
        );
    };

    // update seeker position on change
    const handleSeekerPositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioMetadata.current) return;

        // calculate the ratio of audioMetadata.current.duration and info.duration
        const ratio = audioMetadata.current.duration / (info.duration / 1000);

        // calculate the new time position in terms of audioMetadata
        const newPosition = parseInt(e.target.value);

        audioMetadata.current.currentTime = (newPosition * ratio / 1000) + 1;

        // update song position
        info.player.current.timePosition = newPosition;

        // update currentTime state
        info.setPlaytime(newPosition);
    };

    // play/pause button click handler
    const handlePlayButtonClick = () => {

        // update isPlaying state
        info.setIsPlaying(!info.isPlaying);
        info.player.current.playPause();

        if (!audioMetadata.current) return;

        if (info.player.current.playerState === 1) {
            audioMetadata.current.pause();
        } else {
            audioMetadata.current.play();
        }
    }

    // stop button click handler
    const handleStopButtonClick = () => {
        info.player.current.stop();
    }

    return createPortal((
        <div className="fixed bottom-0 w-full bg-neutral-200 h-16 z-[3000] bg-opacity-80 drop-shadow-sm backdrop-blur-sm flex gap-2 justify-evenly items-center">
            <audio ref={audioMetadata} controls className='hidden' src={`https://thesisbackendstorage.blob.core.windows.net/thesisbackendcontainer/audio/${songName}.wav`} preload="auto">
                <source type="audio/wav" />
                Your browser does not support the audio element.
            </audio>


            <div className="flex gap-2 5">
                <button className='min-w-12' onClick={() => handleStopButtonClick()}>
                    <Icon inline icon='material-symbols-light:stop-outline' className='h-9 w-9 text-lime-900' />
                </button>

                {/* play button */}
                <PlayPauseButton isPlaying={info.isPlaying} handlePlayButtonClick={handlePlayButtonClick} />
            </div>
            {/* seek slider */}
            <div className="flex gap-2.5 w-1/2">
                {/* current position */}
                <p>{formatDuration(info.currentTime)}</p>
                {/* <input type='range' max={duration} value={seeker} className='w-full' /> */}
                <SliderInput ref={seeker} onChange={handleSeekerPositionChange} max={info.duration} value={info.currentTime} className='w-full accent-lime-400' />
                {/* total duration */}
                <p>{formatDuration(info.duration)}</p>
            </div>

            {/* volume slider */}
            <Volume player={info.player} originalAudio={audioMetadata} />

        </div>
    ), document.body);
}

export default AudioPlayer