import React from 'react'
import {createPortal} from 'react-dom';
import audioWav from '@assets/00_BN1-129-Eb_solo_mic.wav';
import { Icon } from '@iconify/react/dist/iconify.js';
import Volume from './Volume';

type Props = {}

const AudioPlayer = (props: Props) => {
    const audioPlayer = React.useRef<HTMLSourceElement>(null);

    return createPortal((
        <div className="fixed bottom-0 right-[8vw] w-1/5 bg-neutral-900 h-16 z-10 bg-opacity-80 drop-shadow-sm backdrop-blur-sm flex gap-2 justify-evenly items-center">
            {/* <audio controls>
                <source ref={audioPlayer} src={audioWav} type="audio/wav" />
                Your browser does not support the audio element.
            </audio> */}
            <Icon inline icon='mdi:play-outline' className='h-12 w-12'/>
            <Volume/>
            
        </div>
    ), document.body);
}

export default AudioPlayer