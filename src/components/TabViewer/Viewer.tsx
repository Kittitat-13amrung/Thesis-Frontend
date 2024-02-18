import { song } from '@/types/songs/song';
import React from 'react'
import SongDescriptions from '../Songs/SongDescriptions';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import VolumeType from '@/types/audioPlayer/volume';

type Props = {
    setSongTitle: React.Dispatch<React.SetStateAction<string>>
}

declare global {
    interface Window {
        alphaTab: any;
    }
}


const Viewer: React.FC<Props> = (props) => {
    const _api = React.useRef<any>();
    const _viewport = React.useRef<HTMLDivElement>(null);
    const _overlay = React.useRef<HTMLDivElement>(null);

    const [songDetails, setSongDetails] = React.useState<song | null>(null); // song details
    const [isPlaying, setIsPlaying] = React.useState(false); // play/pause state

    const [isPlayButtonDisabled, setIsPlayButtonDisabled] = React.useState(false); // disable play button until player is ready
    const [duration, setDuration] = React.useState(0); // song duration
    const [playtime, setPlaytime] = React.useState(0); // song duration and current time

    const volume = useReadLocalStorage<VolumeType>("currentVolume");

    React.useEffect(() => {
        // check if AlphaTabApi is already initialized
        if (_api.current) return;

        // settings for AlphaTabApi
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

        // create new instance of AlphaTabApi
        _api.current = new window.alphaTab.AlphaTabApi(_viewport.current as HTMLDivElement, API_SETTINGS);

        // show loading indicator when render is started
        _api.current.renderStarted.on(() => {
            if (_overlay.current !== null) {
                _overlay.current.style.display = 'flex';
            }
        });

        // hide loading indicator when render is finished
        _api.current.renderFinished.on(() => {
            if (_overlay.current !== null) {
                _overlay.current.style.display = 'none';
            }
        });

        // enable play button when player is ready
        _api.current.playerReady.on(() => {
            setIsPlayButtonDisabled(false);
        });

        // update song position
        _api.current.playerPositionChanged.on((e: any) => {
            let previousTime = -1;
            const currentSeconds = (e.currentTime / 1000) | 0;

            // song ended
            if (currentSeconds == previousTime) {
                return;
            }

            // insert playtime on initial mount
            setPlaytime(e.currentTime);

            // only update duration when it's not set
            if (duration === 0) {
                setDuration(e.endTime);
            };
        });

        // update play/pause state
        _api.current.playerStateChanged.on((e: any) => {
            if (e.stopped) {
                setIsPlaying(false);
            }
        });

        // when score loaded, save song details
        _api.current.scoreLoaded.on((score: any) => {
            // save song details
            setSongDetails({
                artist: {
                    value: score.artist ? score.artist : "Unknown",
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
                    value: score.masterBars[0].keySignature ? score.masterBars[0].keySignature : "C",
                    icon: 'mdi:music-clef-treble'
                }
            });

            // set song title
            const songTitle = score.title ? score.title : "Untitled";
            props.setSongTitle(songTitle);

            // set volume from local storage
            if (volume) {
                _api.current.masterVolume = volume.currentVolume / 100;
            }
        });

        // destroy the instance when component is unmounted
        // return(() => {
        //     _api.current.destroy();
        // });

    }, []);

    return (
        <>
            <div className="mx-20 grid gap-2">
                <SongDescriptions details={songDetails} />
                {/* Loading indicator for music sheet */}
                <div className="absolute top-0 left-0 right-0 bottom-0 z-20 bg-slate-700 bg-opacity-15 backdrop-blur-sm flex justify-center items-start" ref={_overlay as React.RefObject<HTMLDivElement>}>
                    <div className="absolute top-1/2 bottom-0">
                        Music is Loading...
                    </div>
                </div>
                {/* Player controls */}
                <AudioPlayer player={_api} setPlaytime={setPlaytime} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentTime={playtime} duration={duration} />
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