import { songWithIcon } from '@/types/songs/song';
import React from 'react'
import SongDescriptions from '../Songs/SongDescriptions';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import VolumeType from '@/types/audioPlayer/volume';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
// import SelectedNoteController from './NoteSelector/NoteSelector';

type Props = {
    setSongTitle: React.Dispatch<React.SetStateAction<string>>
}

declare global {
    interface Window {
        alphaTab: any;
    }
}

function getStringNumber(y: number, barBounds: any) {
    // TODO: Add padding around first and last frets
    const fretH = barBounds.h / 6;
    console.log(y, barBounds.y + fretH * 2, barBounds)
    if (y > barBounds.y - 2 && y < barBounds.y + fretH * 1 - 1) {
      return 6;
    }
    if (y > barBounds.y && y < barBounds.y + fretH * 2) {
      return 5;
    }
    if (y > barBounds.y && y < barBounds.y + fretH * 3) {
      return 4;
    }
    if (y > barBounds.y && y < barBounds.y + fretH * 4) {
      return 3;
    }
    if (y > barBounds.y && y < barBounds.y + fretH * 5) {
      return 2;
    }
    if (y > barBounds.y && y < barBounds.y + fretH * 6) {
      return 1;
    }
    return null;
  }

const Viewer: React.FC<Props> = (props) => {
    const _api = React.useRef<any>();
    const _viewport = React.useRef<HTMLDivElement>(null);
    const _guide = React.useRef<HTMLDivElement>(null);
    const _overlay = React.useRef<HTMLDivElement>(null);
    // const selectedNoteController = new SelectedNoteController(null);

    const [songDetails, setSongDetails] = React.useState<songWithIcon | null>(null); // song details
    const [isPlaying, setIsPlaying] = React.useState(false); // play/pause state

    const [, setIsPlayButtonDisabled] = React.useState(false); // disable play button until player is ready
    const [duration, setDuration] = React.useState(0); // song duration
    const [playtime, setPlaytime] = React.useState(0); // song duration and current time

    const volume = useReadLocalStorage<VolumeType>("currentVolume");
    const [searchParams,] = useSearchParams();
    const navigate = useNavigate();

    // function createGuide(wrapper: HTMLDivElement, bounds: any | {
    //     visualBounds: any,
    //     realBounds: any
    // }, color: string) {
    //     const guide = document.createElement("div");
    //     guide.style.position = "absolute";
    //     const rect =
    //         "x" in bounds
    //             ? bounds
    //             : bounds.visualBounds;
    //     guide.style.left = rect.x + "px";
    //     guide.style.top = rect.y + "px";
    //     guide.style.width = rect.w + "px";
    //     guide.style.height = rect.h + "px";
    //     guide.style.border = `1px solid ${color}`;
    //     guide.style.background = hexToRgba(color, 0.5);
    //     wrapper.appendChild(guide);
    // }

    // function hexToRgba(hex: string, alpha: number) {
    //     let c = hex.substring(1).split("");
    //     if (c.length == 3) {
    //         c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    //     }
    //     const n = parseInt(c.join(""), 16);
    //     return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255},${alpha})`;
    // }

    React.useEffect(() => {
        const songName = searchParams.get('name');
        // check if song does not exists
        if (!songName) return navigate('/');

        // check if AlphaTabApi is already initialized
        if (_api.current) return;

        // settings for AlphaTabApi
        const API_SETTINGS = {
            core: {
                includeNoteBounds: true,
            },
            file: `https://thesisbackendstorage.blob.core.windows.net/thesisbackendcontainer/xml/${songName}.xml`,
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
                document.body.style.overflow = 'hidden';
                _overlay.current.style.display = 'flex';
            }
        });

        // hide loading indicator when render is finished
        _api.current.renderFinished.on(() => {
            if (_overlay.current !== null) {
                _overlay.current.style.display = 'none';
                document.body.style.overflow = 'visible';
            }
        });

        // _api.current.postRenderFinished.on(() => {
        //     // let bounds = selectedNoteController?.getNoteBounds(_api?.current?.renderer)
        //     if (_api.current.renderer.boundsLookup) {
        //         // createStaveGroupGuides(
        //         //     _guide.current as HTMLDivElement,
        //         //     _api.current.renderer.boundsLookup
        //         // );


        //         const lookup = _api.current.renderer.boundsLookup;
        //         for (const staveGroup of lookup.staveGroups) {
        //             console.log(staveGroup);
        //             for (const masterBar of staveGroup.bars) {
        //                 // staveGroup.addBar(masterBar);
        //                 // for (const bar of masterBar.bars) {
        //                 //     for (const beat of bar.beats) {
        //                 //         if (beat.notes) {
        //                 //             for (const note of beat.notes) {
        //                 //                 createGuide(_guide.current as HTMLDivElement, note.noteHeadBounds, "#512da8")
        //                 //             }
        //                 //         }
        //                 //     }
        //                 // }
        //             }
        //         }

        //     }
        // });

        _api.current.noteMouseDown.on((note:any) => {
            if(note) {
                console.log({
                    type: 'note-mouse-down',
                    data: {
                        note,
                    }
                });
            };
        });
        

        _api.current.beatMouseDown.on((beat:any) => {
            const beats = _api.current.renderer?.boundsLookup?.findBeats(beat);

            const barBounds = beats?.[1]?.barBounds.visualBounds;

            if(!barBounds) return;
            if(!_viewport.current) return;

            const containerOffsetTop = _viewport.current.offsetTop;

            const y = (window.event as any).pageY - containerOffsetTop;

            
            const stringNumber = getStringNumber(y, barBounds);
            // console.log((window.event as any).pageY, y, barBounds, stringNumber)
            console.log({
                type: 'string-mouse-down',
                data: {
                    beat,
                    stringNumber
                }
            });
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
                    value: score.tempo + ' bpm',
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
                <div className="absolute top-0 left-0 right-0 bottom-0 z-[1001] bg-neutral-200 bg-opacity-50 flex justify-center items-start" ref={_overlay as React.RefObject<HTMLDivElement>}>
                    <div className="absolute top-1/2 bottom-0 flex flex-col items-center gap-10">
                        <Icon icon="mdi:loading" className="w-24 h-24 animate-spin text-slate-900" />
                        <h3 className='text-xl'>Music is Loading...</h3>
                    </div>
                </div>
                {/* Player controls */}
                <AudioPlayer player={_api} setPlaytime={setPlaytime} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentTime={playtime} duration={duration} />
            </div>
            {/* Tab Visualiser */}
            <div className='relative' ref={_viewport}>
                <div className='absolute z-[1000] inline pointer-events-none top-0 left-0 right-0 bottom-0' ref={_guide} />
                <div className="at-cursors">
                    <div className="at-selection"></div>
                    <div className="at-cursor-bar bg-red-900"></div>
                </div>
            </div>
        </>
    )
}

export default Viewer;