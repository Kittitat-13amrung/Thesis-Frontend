import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

type Props = {}

const Volume:React.FC<Props> = (props) => {
    const volumeSlider = React.useRef<HTMLInputElement>(null);
    const [volume, setVolume] = React.useState<string>("");

    const handleVolumeMouseEnter = () => {

    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(e.target.value);
    };

    return (
        <>
            <Icon inline icon='heroicons-outline:volume-up' className='w-10 h-10 cursor-pointer' onMouseEnter={handleVolumeMouseEnter} />
            <input type='range' ref={volumeSlider} onChange={handleVolumeChange} max={100} value={volume}/>
        </>
    )
}

export default Volume