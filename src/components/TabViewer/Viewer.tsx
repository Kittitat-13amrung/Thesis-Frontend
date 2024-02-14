import { song } from '@/types/songs/song';
import React from 'react'
import SongDescriptions from '../Songs/SongDescriptions';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

type Props = {
    setSongTitle: React.Dispatch<React.SetStateAction<string>>
}

declare global {
    interface Window {
        alphaTab: any;
    }
}

const formatDuration = (milliseconds: number): string => {
    let seconds = milliseconds / 1000;
    const minutes = (seconds / 60) | 0;
    seconds = (seconds - minutes * 60) | 0;
    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0")
    );
}


const Viewer: React.FC<Props> = (props) => {
    const _api = React.useRef<any>();
    const _viewport = React.useRef<HTMLDivElement>(null);
    const _overlay = React.useRef<HTMLDivElement>(null);
    const _controls = React.useRef<HTMLDivElement>(null);
    const _songPosition = React.useRef<HTMLDivElement>(null);

    const [songDetails, setSongDetails] = React.useState<song | null>(null);


    const [isPlayButtonDisabled, setIsPlayButtonDisabled] = React.useState(false);

    React.useEffect(() => {
        if (_api.current) return;

        const API_SETTINGS = {
            file: "https://advanced-js.s3.eu-west-1.amazonaws.com/test+(26).xml",
            notation: {
                elements: {
                    scoreTitle: false,
                    scoreSubTitle: false,
                    scoreArtist: false,
                    scoreAlbum: false,
                    scoreWords: false,
                    scoreMusic: false,
                    scoreWordsAndMusic: false,
                    scoreCopyright: false,
                    guitarTuning: false
                }
            },
            player: {
                enablePlayer: true,
                soundFont: `https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2`,
                scrollElement: _viewport.current // this is the element to scroll during playback
            }
        };

        _api.current = new window.alphaTab.AlphaTabApi(_viewport.current as HTMLDivElement, API_SETTINGS);

        _api.current.renderStarted.on(() => {
            if (_overlay.current !== null) {
                _overlay.current.style.display = 'flex';
            }
        });

        _api.current.renderFinished.on(() => {
            if (_overlay.current !== null) {
                _overlay.current.style.display = 'none';
            }
        });

        _api.current.playerReady.on(() => {
            setIsPlayButtonDisabled(false);
        });

        _api.current.playerPositionChanged.on((e: any) => {
            let previousTime = -1;
            const currentSeconds = (e.currentTime / 1000) | 0;

            if (currentSeconds == previousTime) {
                return;
            }

            if (_songPosition.current !== null) {
                _songPosition.current.innerText = formatDuration(e.currentTime) + " / " + formatDuration(e.endTime);
            }
        });

        _api.current.scoreLoaded.on((score: any) => {
            console.log(score.tracks);

            setSongDetails({
                artist: {
                    value: score.artist,
                    icon: 'material-symbols:artist-outline'
                },
                tempo: {
                    value: score.tempo,
                    icon: 'ph:metronome-bold'
                },
                tuning: {
                    value: score.tracks[0].staves[0].stringTuning.name,
                    icon: 'mdi:tuner'
                },
                timeSignature: {
                    value: score.masterBars[0].timeSignatureDenominator + '/' + score.masterBars[0].timeSignatureNumerator,
                    icon: 'tabler:triangle-off'
                },
                keySignature: {
                    value: score.masterBars[0].keySignature,
                    icon: 'mdi:music-clef-treble'
                }
            })

            props.setSongTitle(score.title);
        })
    }, []);

    const handlePlayButtonClick = () => {
        if (isPlayButtonDisabled) {
            return;
        }

        console.log(_api.current)
        _api.current.playPause();
    }

    return (
        <>
            <div className="mx-20 grid gap-4">
                <SongDescriptions details={songDetails} />
                {/* Loading indicator for music sheet */}
                <div className="absolute top-0 left-0 right-0 bottom-0 z-20 bg-slate-700 bg-opacity-15 backdrop-blur-sm flex justify-center items-start" ref={_overlay as React.RefObject<HTMLDivElement>}>
                    <div className="absolute top-1/2 bottom-0">
                        Music is Loading...
                    </div>
                </div>
                {/* Player controls */}
                <div className="" ref={_controls}>
                    <AudioPlayer/>
                    <button onClick={handlePlayButtonClick} disabled={isPlayButtonDisabled} className='bg-neutral-900 hover:bg-neutral-800 disabled:cursor-progress disabled:opacity-50 py-2 px-6 rounded-md text-neutral-50'>Play</button>
                    <div ref={_songPosition}>00:00 / 00:00</div>
                </div>
            </div>
            {/* Tab Visualiser */}
            <div ref={_viewport}>
                <div className="at-cursors">
                    <div className="at-selection"></div>
                    <div className="at-cursor-bar bg-red-900"></div>
                </div>
            </div>
        </>
    )
}

export default Viewer;