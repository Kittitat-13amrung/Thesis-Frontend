export interface song {
    tempo: songItem,
    tuning: songItem,
    artist: songItem,
    timeSignature?: songItem,
    keySignature?: songItem 
};

export type songItem = {
        value: string,
        icon: string
}