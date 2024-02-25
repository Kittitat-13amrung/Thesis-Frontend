import { InlineIcon } from "@iconify/react/dist/iconify.js";

// Description Item Component
const IconWithText: React.FC<{ title: string, iconName: string }> = ({ title, iconName }) => {
    return (
        <li className="flex gap-2 font-medium font-serif">
            {/* Icon */}
            <InlineIcon className="text-2xl" icon={iconName} />
            {/* Item Title */}
            <h3 className='text-base font-semibold block'>{title}:</h3>
        </li>
    )
}

export default IconWithText;