type AudioInfo = {
    player: React.MutableRefObject<any>,
    duration: string,
    currentTime: string,
    setPlaytime: React.Dispatch<React.SetStateAction<{
        duration: string,
        currentTime: string,
    }>>,
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
    handlePlayButtonClick: () => void,
}

export default AudioInfo;