import React from 'react'
import Listbox from '@/components/Homepage/Songs/Listbox'
import useFetch from '@/hooks/useFetch';
import { Icon, InlineIcon } from '@iconify/react/dist/iconify.js';
import { SongProps } from '@/types/songs/song';

type Response = {
    data: SongProps[];
    status: string;
}

const SongList = () => {
    const [songs, setSongs] = React.useState<SongProps[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => { 
        console.log(process.env.VITE_API_URL);

        useFetch<Response>(`${process.env.VITE_API_URL}/songs`)
        .then((res) => {
            setSongs(res.data);
            setLoading(false);
        })
        .catch((error) => {
            if(error instanceof Error) {
                console.error(error);
                setError(error.message);
                setLoading(false);
            }
        });
    }, []);

    const shouldRenderList = loading ? (
        <Icon inline icon='mdi:loading' aria-description='loading icon' className='w-20 h-20 text-center animate-spin'/>
    ) : error ? (
        <p className='text-center'>{error}</p>
    ) : songs.map((song) => <Listbox key={song.id} {...song} />);


    return (
        <article>
            {/* Title & Filter */}
            <div className="container mx-auto">
                <div className="flex justify-between my-6">
                    {/* Songs Title */}
                    <div className="flex items-center gap-8">
                        <InlineIcon icon="streamline:music-note-2" className='w-16 h-16'/>
                        <h2 className="text-5xl font-bold font-sans">
                            Songs
                        </h2>
                    </div>
                    {/* Filter */}
                    <div className="flex gap-2">
                        {/* <FunnelIcon className='aspect-square w-5'/> */}
                        <select defaultValue="1" name="" id="">
                            <option value="1">latest</option>
                            <option value="2">oldest</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Songs list */}
            <section className="container mx-auto divide-y-4 divide-purple-100 divide-dashed">
                {shouldRenderList}
            </section>
        </article>
    )
}

export default SongList;