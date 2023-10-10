import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';

const cssClasses = [
    "bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 inline-block",
    "bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 inline-block",
    "bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 inline-block",
    "bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-block",
    "bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 inline-block",
    "bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 inline-block",
    "bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 inline-block",
    "bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300 inline-block"
];

const ScrollDetail = ({ scrollId }) => {
    const [scroll, setScroll] = useState(null);
    const [user, setUser] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        // Fetch scroll data when the component mounts
        axios.get(`http://localhost:8080/api/scrolls/${scrollId}`)
            .then(response => {
                setScroll(response.data);
                setComment(response.data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // Check if the user exists in localStorage and save it to state
        const userStoredInLocalStorage = localStorage.getItem('user');
        if (userStoredInLocalStorage) {
            setUser(JSON.parse(userStoredInLocalStorage));
        }
        
    }, [scrollId]);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Convert the comment to a List of Integers
        const commentList = comment.split(',').map((item) => parseInt(item.trim(), 10));

        try {
            // Send the commentList to the backend using Axios POST
            await axios.post(`http://localhost:8080/api/scrolls/changedata`, {
                id: scroll.id,
                commentList,
            });
            alert('File successfully updated');
            // Optionally, you can display a success message or perform any other actions
            console.log('Comment submitted successfully.');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    if (!scroll) {
        return (
            <>
                <Navbar />
                <main>
                    <div style={{ padding: '20px' }}>
                        <div className='main'>
                            <div className="container mx-auto p-4">
                                <h1 className="text-2xl font-semibold mb-4">Loading</h1>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main>
                <div style={{ padding: '20px' }}>
                    <div className='main'>
                        <div className="container mx-auto p-4">
                            <h1 className="text-2xl font-semibold mb-4">{scroll.name}</h1>
                            <div>

                                {scroll.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className={cssClasses[Math.floor(Math.random() * cssClasses.length)]}
                                    >
                                        {tag}
                                    </span>
                                ))}
                                <br></br>
                                <br></br>
                                <h2 className="text-l font-semibold mb-4">User: {scroll.user.username}</h2>
                                {user ? (
                                    <>

                                        {user.id == scroll.user.id || user.userRole == 'admin' ? (
                                            <>
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    Delete Scroll
                                                </button>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                                            <label htmlFor="comment" className="sr-only">Your comment</label>
                                                            <textarea
                                                                id="comment"
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}
                                                                rows="4"
                                                                className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                                                
                                                               
                                                                required
                                                            ></textarea>
                                                        </div>
                                                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                                            <button
                                                                type="submit"
                                                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                                                            >
                                                                Update
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </>
                                        ) : (
                                            <>
                                                <textarea
                                                    id="message"
                                                    value={scroll.data}
                                                    rows="4"
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Write your thoughts here..."
                                                ></textarea>
                                            </>
                                        )}

                                    </>
                                ) : (
                                    <>
                                        <textarea
                                            id="message"
                                            rows="4"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Write your thoughts here..."
                                            readonly
                                        ></textarea>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.query; // Get the id from the URL

    return {
        props: {
            scrollId: id,
        },
    };
}

export default ScrollDetail;
