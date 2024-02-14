import { song } from '@/types/songs/song'
import React from 'react'

type Props = {
  details: song | null
}

const SongDescriptions:React.FC<Props> = (props) => {
  const details = props.details;

  // Description Item Component
  const DescriptionItem:React.FC<{ title: string, value: string | number }> = ({ title, value }) => {
    return (
      <li className="flex gap-2 font-medium font-serif">
        {/* Icon */}

        {/* Item Title */}
        <h3 className='text-base font-semibold'>{title}:</h3>
        <p>{value}</p>
      </li>
    )
  }

  if(!details) return;

  const items = Object.entries(details).map(([title, value]) => <DescriptionItem key={title} title={title} value={value}/>)

  return (
    <ul className='grid grid-flow-col-dense place-content-stretch grid-cols-10'>
      {items}
    </ul>
  )
}

export default SongDescriptions