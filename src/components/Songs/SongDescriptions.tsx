import React from 'react'

type Props = {}

const SongDescriptions:React.FC<Props> = (props) => {

  // Description Item Component
  const DescriptionItem:React.FC = () => {
    return (
      <li className="flex gap-2 font-medium font-serif">
        {/* Icon */}

        {/* Item Title */}
        <h3 className='text-base font-semibold'>Artist:</h3>
        <p>Name</p>
      </li>
    )
  }

  const temp = Array(4).fill(0);
  const items = temp.map((i, idx) => <DescriptionItem key={idx}/>);

  return (
    <ul className='grid grid-flow-col-dense grid-cols-6 place-content-around'>
      {items}
    </ul>
  )
}

export default SongDescriptions