import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Loader: React.FC = () => {
    return (
        <div>
            {Array(3).fill(0).map((_, index) => (
                <div key={index} className='card m-8 flex flex-wrap gap-2 p-3 m-3 animate-pulse'>
                    <div className='image flex-shrink-0 bg-gray-300 h-48 w-full md:w-48'></div>
                    <div className='flex flex-col flex-grow p-2'>
                        <div className='mb-4'>
                            <h3 className='h-6 bg-gray-300 rounded w-1/2'></h3>
                        </div>
                        <div className='flex flex-wrap justify-between'>
                            <div className='flex flex-col mb-4 w-full md:w-1/3'>
                                <p className='h-4 bg-gray-300 rounded w-3/4 mb-2'></p>
                                <p className='h-4 bg-gray-300 rounded w-1/2'></p>
                            </div>
                            <div className='flex flex-col mb-4 w-full md:w-1/3'>
                                <span className='h-4 bg-gray-300 rounded w-1/4 mb-2'></span>
                                {Array(3).fill(0).map(() => (
                                    <li key={uuidv4()} className='h-4 bg-gray-300 rounded w-full mb-1'></li>
                                ))}
                            </div>
                            <div className='flex flex-col mb-4 w-full md:w-1/3'>
                                <span className='h-4 bg-gray-300 rounded w-1/4 mb-2'></span>
                                <p className='h-4 bg-gray-300 rounded w-full'></p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Loader;
