import React from 'react'

function Button({ text, icon, onClick }) {
    return (
        <button onClick={onClick} className='flex items-center gap-1 capitalize bg-(--second-color) text-white p-2 rounded-lg font-semibold cursor-pointer'>
            <span className='text-sm text-white'>{icon}</span>
            {text}
        </button>
    )
}

export default Button