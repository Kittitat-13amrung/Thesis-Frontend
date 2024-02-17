import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import useVolumeHook from '@/hooks/useVolumeHook';
import SliderInput from './SliderInput';

type Props = {
    player: React.MutableRefObject<any>,
};

const Volume: React.FC<Props> = ({ player }) => {
    const volumeSlider = React.useRef<HTMLInputElement>(null);
    const [volume, setVolume] = useVolumeHook();

    // const handleVolumeMouseEnter = () => {

    // }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentVolume = parseInt(e.target.value);
        setVolume(prevState => ({
            prevVolume: prevState?.prevVolume,
            currentVolume: currentVolume
        }));

        // update player volume
        player.current.changeTrackVolume(player.current.score.tracks, currentVolume / 100);
    };

    const handleVolumeButtonClick = () => {
        // set volume to zero or previous volume state
        const currentVolume = volume.currentVolume > 0 ? 0 : volume.prevVolume;

        setVolume(prevState => ({
            ...prevState,
            currentVolume: currentVolume
        }));
    }

    const handleMouseVolumeUp = (e: React.MouseEvent<HTMLInputElement>) => {
        const currentVolume = parseInt(e.currentTarget.value) == 0 ? volume.prevVolume : parseInt(e.currentTarget.value);
        setVolume(prevState => ({
            prevVolume: currentVolume,
            currentVolume: prevState.currentVolume
        }));
    }

    return (
        <div className='flex gap-2.5'>
            <button onClick={handleVolumeButtonClick}>
                {volume.currentVolume == 0 ? (
                    <Icon inline icon='heroicons-outline:volume-off' className='w-5 h-5 cursor-pointer' />
                ) : (
                    <Icon inline icon='heroicons-outline:volume-up' className='w-5 h-5 cursor-pointer' />
                )}
            </button>
            <SliderInput ref={volumeSlider} onChange={handleVolumeChange} onMouseUp={handleMouseVolumeUp} value={volume.currentVolume} className='w-full accent-neutral-900' />
        </div>
    )
}

export default Volume