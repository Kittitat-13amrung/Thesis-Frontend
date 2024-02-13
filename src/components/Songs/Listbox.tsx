const Listbox = () => {
  return (
    <div className='container px-2 py-4 mx-auto border-t-2 border-dashed border-purple-100 flex flex-row gap-4'>
        <div className="aspect-square bg-neutral-300 h-24"></div>
        <div className="grid">
            <h3 className="font-sans text-4xl font-bold">Songs</h3>
            <ul className='grid grid-flow-col gap-10 font-medium'>
                <li className="flex flex-row gap-2">
                    <p className="text-sm">Artist</p>
                </li>
                <li className="flex flex-row gap-2">
                    <p className="text-sm">G#</p>
                </li>
                <li className="flex flex-row gap-2">
                    <p className="text-sm">120 Tempo</p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Listbox