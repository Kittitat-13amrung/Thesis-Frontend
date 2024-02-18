import { song } from '@/types/songs/song'
import React from 'react'
import {Icon} from '@iconify/react';


type Props = {
  details: song | null
}

const SongDescriptions:React.FC<Props> = (props) => {
  const details = props.details;

  // Description Item Component
  const DescriptionItem:React.FC<{ title: string, value: string | number, iconName: string }> = ({ title, value, iconName }) => {

    return (
      <li className="flex gap-2 font-medium font-serif">
        {/* Icon */}
        <Icon inline className="text-2xl" icon={iconName} />
        {/* Item Title */}
        <h3 className='text-base font-semibold md:hidden block'>{title}:</h3>
        <p>{value}</p>
      </li>
    )
  }

  if(!details) return;

  const items = Object.entries(details).map(([title, item]) => <DescriptionItem key={title} title={title} value={item.value} iconName={item.icon}/>)

  return (
    <ul className='grid grid-flow-col place-content-start gap-14 md:gap-4 md:place-content-between'>
      {items}
    </ul>
  )
}

export default SongDescriptions