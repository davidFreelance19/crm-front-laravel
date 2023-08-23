import React from 'react';
import { useLocation } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';

const Loader = () => {
    const location = useLocation()
    return (
        <div className='grid place-content-center'>
            <ProgressSpinner />
            <p>Please do not reload this page</p>
        </div>

    )
}

export default Loader
