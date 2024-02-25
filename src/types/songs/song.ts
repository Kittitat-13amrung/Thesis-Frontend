export type SongProps = {
    id: string;
    name: string;
    artist: string;
    bpm: number;
    key_signature: string;
    time_signature: string;
    duration: number;
    genre: string;
    filename: string;
    created_at: string;
    updated_at: string;
}

export type songWithIcon = {
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