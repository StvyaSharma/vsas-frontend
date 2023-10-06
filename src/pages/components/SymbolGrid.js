// components/SymbolGrid.js
import React from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs'; // Import your desired React Icons
import { AiFillDelete, AiOutlineCloudDownload } from 'react-icons/ai'

const SymbolGrid = () => {
    // Mock data for symbols and tags
    const symbols = [
        {
            name: 'Scroll 1',
            tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4'], // Add more tags as needed
        },
        {
            name: 'Scroll 2',
            tags: ['Tag5', 'Tag6'],
        },
        {
            name: 'Scroll 3',
            tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4'], // Add more tags as needed
        },
        {
            name: 'Symbol 2',
            tags: ['Tag5', 'Tag6'],
        },
        {
            name: 'Symbol 1',
            tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4'], // Add more tags as needed
        },
        {
            name: 'Symbol 2',
            tags: ['Tag5', 'Tag6'],
        },
        {
            name: 'Symbol 1',
            tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4'], // Add more tags as needed
        },
        {
            name: 'Symbol 2',
            tags: ['Tag5', 'Tag6'],
        },
        {
            name: 'Symbol 1',
            tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4'], // Add more tags as needed
        },
        {
            name: 'Symbol 2',
            tags: ['Tag5', 'Tag6'],
        },
        // Add more symbols as needed
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {symbols.map((symbol, index) => (
                <div key={index} className="grid-item p-4 hover:shadow-lg shadow-md rounded-lg">
                    <h2 className="text-lg font-semibold">{symbol.name}</h2>
                    <div className="mt-2">
                        {symbol.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span key={tagIndex} className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs mr-2">
                                {tag}
                            </span>
                        ))}
                        {symbol.tags.length > 2 && <span className="text-gray-600 text-xs">...</span>}
                    </div>
                    <div className="flex justify-between mt-2">
                        <button className='p-1.5 rounded-md shadow-md hover:shadow-lg background'>
                      
                                <AiFillDelete />
                       
                        </button>
                        <button className='p-1.5 rounded-md shadow-md hover:shadow-lg background'> <AiOutlineCloudDownload /></button>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default SymbolGrid;
