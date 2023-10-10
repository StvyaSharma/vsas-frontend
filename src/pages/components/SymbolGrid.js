import React, { useState, useEffect } from 'react';
import { AiFillDelete, AiOutlineCloudDownload } from 'react-icons/ai';
import { fetchScrollData } from '../api/getScrolls';

const SymbolGrid = () => {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchScrollData()
      .then(data => {
        setSymbols(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  // Check if symbols is null or an empty array before rendering
  if (!symbols || symbols.length === 0) {
    return null; // Return null to render nothing
  }

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
            <button className='p-1.5 rounded-md shadow-md hover:shadow-lg background'>
              <AiOutlineCloudDownload />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SymbolGrid;
