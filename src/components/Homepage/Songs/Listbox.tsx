import { SongProps } from "@/types/songs/song"
import { InlineIcon } from "@iconify/react/dist/iconify.js"
import { NavLink } from "react-router-dom";

const Listbox: React.FC<SongProps> = ({ artist, bpm, created_at, duration, filename, genre, id, key_signature, name, time_signature, updated_at }) => {
    return (
        <NavLink to={`/songs?name=${filename}`} className='p-4 flex flex-row gap-4 group/songButton rounded-lg hover:bg-neutral-100'>
            {/* Image */}
            <div className="aspect-square bg-neutral-300 h-24" />
            {/* Song Desc. */}
            <div className="grid place-items-start place-content-between">
                <h3 className="font-sans text-4xl font-bold group-hover/songButton:underline underline-offset-4 decoration-1">{name}</h3>
                <ul className='grid grid-flow-col grid-cols-10 gap-10 font-medium'>
                    {/* Artist Name */}
                    <li className="flex flex-row gap-2">
                        <InlineIcon icon='material-symbols:artist-outline' className="not-sr-only w-5 h-5" />
                        <p className="text-sm">{artist}</p>
                    </li>

                    {/* Key */}
                    <li className="flex flex-row gap-2">
                        <InlineIcon icon='mdi:music-clef-treble' className="not-sr-only w-5 h-5" />
                        <p className="text-sm">{key_signature}</p>
                    </li>

                    {/* Tempo */}
                    <li className="flex flex-row gap-2">
                        <InlineIcon icon='ph:metronome-bold' className="not-sr-only w-5 h-5" />
                        <p className="text-sm">{bpm} Tempo</p>
                    </li>

                    {/* Time Signature */}
                    <li className="flex flex-row gap-2">
                        <InlineIcon icon='tabler:triangle-off' className="not-sr-only w-5 h-5" />
                        <p className="text-sm">{time_signature}</p>
                    </li>
                </ul>
            </div>
        </NavLink>
    )
}

export default Listbox