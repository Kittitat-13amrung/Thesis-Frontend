import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import useVolumeHook from '@/hooks/useVolumeHook';
import SliderInput from './SliderInput';

type Props = {
    player: React.MutableRefObject<any>,
    originalAudio: React.RefObject<HTMLAudioElement>
};

const Volume: React.FC<Props> = ({ player, originalAudio }) => {
    const volumeSlider = React.useRef<HTMLInputElement>(null);
    const [volume, setVolume] = useVolumeHook();

    // update volume state
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentVolume = parseInt(e.target.value);
        setVolume(prevState => ({
            prevVolume: prevState?.prevVolume,
            currentVolume: currentVolume
        }));

        // update player volume
        player.current.changeTrackVolume(player.current.score.tracks, currentVolume / 100);
        if(!originalAudio.current) return;
        // update volume on the original audio element
        originalAudio.current.volume = currentVolume / 100;
    };

    // set volume to zero or previous volume state
    const handleVolumeButtonClick = () => {
        // set volume to zero or previous volume state
        const currentVolume = volume.currentVolume > 0 ? 0 : volume.prevVolume;

        setVolume(prevState => ({
            ...prevState,
            currentVolume: currentVolume
        }));

        // update player volume on the Player instance
        player.current.masterVolume = currentVolume / 100;

        if(!originalAudio.current) return;
        // update volume on the original audio element
        originalAudio.current.volume = currentVolume / 100;
    }

    // Utilised when volume is set to zero to return the previous volume state
    const handleMouseVolumeUp = (e: React.MouseEvent<HTMLInputElement>) => {
        const currentVolume = parseInt(e.currentTarget.value) == 0 ? volume.prevVolume : parseInt(e.currentTarget.value);
        setVolume(prevState => ({
            prevVolume: currentVolume,
            currentVolume: prevState.currentVolume
        }));
    }

    return (
        <div className='flex gap-2.5'>
            {/* volume button */}
            <button onClick={handleVolumeButtonClick}>
                {volume.currentVolume == 0 ? (
                    <Icon inline icon='heroicons-outline:volume-off' className='w-5 h-5 cursor-pointer text-lime-900' />
                ) : (
                    <Icon inline icon='heroicons-outline:volume-up' className='w-5 h-5 cursor-pointer text-lime-900' />
                )}
            </button>
            {/* volume slider */}
            <SliderInput ref={volumeSlider} onChange={handleVolumeChange} onMouseUp={handleMouseVolumeUp} value={volume.currentVolume} className='w-full accent-lime-400' />
        </div>
    )
}

export default Volume