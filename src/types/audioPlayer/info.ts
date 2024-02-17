type AudioInfo = {
    player: React.MutableRefObject<any>,
    duration: number,
    currentTime: number,
    setPlaytime: React.Dispatch<React.SetStateAction<number>>,
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
}

export default AudioInfo;