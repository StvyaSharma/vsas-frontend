import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillDelete, AiOutlineCloudDownload } from 'react-icons/ai';
import Navbar from './components/navbar';
import Link from 'next/link';

const Dashboard = () => {
  const [symbols, setSymbols] = useState([]);
  const [selectedTag, setSelectedTag] = useState(''); // State to manage the selected tag filter
  const [searchInput, setSearchInput] = useState(''); // State to manage the search input
  const userStoredInLocalStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('http://localhost:8080/api/scrolls/all')
      .then(response => {
        setSymbols(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  // Check if symbols is null or an empty array before rendering
  if (!symbols || symbols.length === 0) {
    return (
      <>
        <Navbar />
        <main>
          <div style={{ padding: '20px' }}>
            <div className='main'>
              <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold mb-4">Scrolls</h1>
                <p>No scrolls</p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  const handleDeleteClick = (symbolId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this scroll?');

    if (shouldDelete) {
      // Log a message to the console
      console.log(`Scroll with ID ${symbolId} deleted.`);
      // You can perform the actual deletion logic here

      axios.post(`http://localhost:8080/api/scrolls/delete/${symbolId}`)

      // For now, let's just re-render the page by reloading it
      window.location.reload();
    }
  };

  // Function to filter scrolls by selected tag
  const filteredSymbolsByTag = selectedTag
    ? symbols.filter(symbol => symbol.tags.includes(selectedTag))
    : symbols;

  // Function to filter scrolls by search input value
  const filteredSymbolsByName = searchInput
    ? filteredSymbolsByTag.filter(symbol => symbol.name.toLowerCase().includes(searchInput.toLowerCase()))
    : filteredSymbolsByTag;

  return (
    <>
      <Navbar />
      <main>
        <div style={{ padding: '20px' }}>
          <div className='main'>
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-semibold mb-4">Scrolls</h1>

              {/* Search bar for filtering by scroll names */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="px-2 py-1 border rounded-md"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>

              {/* Select dropdown for filtering by tags */}
              <div className="mb-4">
                <label htmlFor="tagFilter" className="text-sm font-semibold">Filter by Tag:</label>
                <select
                  id="tagFilter"
                  className="px-2 py-1 border rounded-md"
                  onChange={(e) => setSelectedTag(e.target.value)}
                  value={selectedTag}
                >
                  <option value="">All</option>
                  {/* Map through unique tags from the scrolls and create options */}
                  {[...new Set(symbols.flatMap(symbol => symbol.tags))].map((tag, index) => (
                    <option key={index} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSymbolsByName.map((symbol, index) => (
                  <Link href={`/scrolls/${symbol.id}`}>
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
                      {userStoredInLocalStorage && userStoredInLocalStorage.id === symbol.user.id ? (
                        <button
                          className='p-1.5 rounded-md shadow-md hover:shadow-lg background'
                          onClick={() => handleDeleteClick(symbol.id)} // Pass the symbol ID to the click handler
                        >
                          <AiFillDelete />
                        </button>
                      ) : (
                        <></>
                      )}
                      <button className='p-1.5 rounded-md shadow-md hover:shadow-lg background'>
                        <AiOutlineCloudDownload />
                      </button>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
