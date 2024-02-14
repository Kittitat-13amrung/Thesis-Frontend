export interface song {
    tempo: songItem,
    tuning: songItem,
    artist: songItem,
};

export type songItem = {
        value: string,
        icon: string
}