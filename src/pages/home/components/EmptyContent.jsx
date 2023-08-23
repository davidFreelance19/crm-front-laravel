import React from 'react'

const EmptyContent = ({ image, altImage, info }) => {
    return (
        <div className='h-full grid place-content-center'>
            <img src={image} className='w-[550px] h-[550px] mx-auto' alt={altImage} />
            <p className='text-xl font-semibold text-center'>{info}</p>
        </div>
    )
}

export default EmptyContent
