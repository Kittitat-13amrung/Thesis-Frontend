import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react'

type Props = {
    isPlaying: boolean,
    handlePlayButtonClick: () => void,
}

const PlayPauseButton: React.FC<Props> = (info) => {
    return info.isPlaying ? (
        <button className='min-w-12' onClick={() => info.handlePlayButtonClick()}>
            <Icon inline icon='material-symbols-light:pause-outline' className='h-10 w-10 text-lime-900' />
        </button>
    ) : (
        <button className='min-w-12' onClick={() => info.handlePlayButtonClick()}>
            <Icon inline icon='material-symbols-light:play-arrow-outline' className='h-10 w-10 text-lime-900' />
        </button>
    );
}

export default PlayPauseButton;