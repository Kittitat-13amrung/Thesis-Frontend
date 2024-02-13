const Listbox = () => {
  return (
    <div className='container px-2 py-4 mx-auto border-t-2 border-dashed border-purple-100 flex flex-row gap-4'>
        {/* Image */}
        <div className="aspect-square bg-neutral-300 h-24"></div>
        {/* Song Desc. */}
        <div className="grid">
            <h3 className="font-sans text-4xl font-bold">Songs</h3>
            <ul className='grid grid-flow-col gap-10 font-medium'>
                {/* Artist Name */}
                <li className="flex flex-row gap-2">
                    <p className="text-sm">Artist</p>
                </li>

                {/* Key */}
                <li className="flex flex-row gap-2">
                    <p className="text-sm">G#</p>
                </li>

                {/* Tempo */}
                <li className="flex flex-row gap-2">
                    <p className="text-sm">120 Tempo</p>
                </li>

                {/* Time Signature */}
                <li className="flex flex-row gap-2">
                    <p className="text-sm">4/4</p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Listbox