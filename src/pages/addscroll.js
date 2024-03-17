// components/FileUploadForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TagsInput from 'react-tagsinput'
import { RxCross2 } from 'react-icons/ri'
import styles from '@/styles/register.module.css'
import Navbar from './components/navbar';
import { useRouter } from 'next/router';

const input = 'rounded-none rounded-r-lg bg-gray-0 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-zinc-900 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
const passwordInput = 'rounded-none rounded-l-lg bg-gray-0 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-zinc-900 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
const correctInput = 'bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400'
const errorInput = 'rounded-none rounded-r-lg border-2 border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 focus:border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500 block flex-1 min-w-0 w-full text-sm p-2.5 focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400'
// const errorInput  = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400'
const input2 = 'mt-2 rounded bg-gray-0 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-zinc-900 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'


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



function FileUploadForm() {
    const router = useRouter();
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [tags, setTags] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push('/dashboard'); // Redirect to dashboard route
        }
        setUser(user)
    }, [router]);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleTagsChange = (newTags) => {
        setTags(newTags);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please select a file.');
            return;
        }

        if (!name) {
            alert('Please enter a name.');
            return;
        }

        const reader = new FileReader();

        reader.onload = async (event) => {
            const fileData = event.target.result;
            const fileText = new TextDecoder().decode(fileData); // Convert binary data to text

            try {
                const dataToSend = {
                    textData: fileText,
                    name: name,
                    user: user.username,
                    tags: tags,
                };

                const response = await axios.post('http://localhost:8080/api/upload', dataToSend, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    alert('File uploaded successfully!');
                } else {
                    alert('File upload failed.');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    function defaultRenderTag(props) {
        let { tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other } = props
        return (
            <span key={key} {...other} className={cssClasses[key % cssClasses.length]}>
                {getTagDisplayValue(tag)}
                {!disabled &&
                    <a style={{ backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: '3px' }} onClick={(e) => onRemove(key)} >
                        ⛌
                    </a>

                }
            </span>
        )
    }



    return (
        <>
            <Navbar />
            <main>
                <div className={styles.register}>
                    <form onSubmit={handleSubmit} className={styles.registerForm}>

                        <div>
                            <label htmlFor="name" >Scroll Name:</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-stone-700 dark:text-stone-900 dark:border-gray-400">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-stone-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                    </svg>
                                </span>
                                <input type="text"
                                    id="name"
                                    className={input}
                                    placeholder='name'
                                    value={name} onChange={handleNameChange} required
                                />
                            </div>
                        </div>

                        {/* <input type="text" placeholder="name" value={name} onChange={handleNameChange} required /> */}
                        <div>
                            <label htmlFor="tags" >Tags:</label>
                            <TagsInput value={tags} onChange={handleTagsChange}
                                renderTag={defaultRenderTag} inputProps={{
                                    className: input2,
                                    placeholder: 'Add a tag'
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="file">Upload Scroll</label>

                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-34 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-stone-800 dark:bg-stone-600 hover:bg-stone-100 dark:border-stone-400 dark:hover:border-stone-500 dark:hover:bg-stone-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-stone-900 block"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-stone-900"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-stone-900">Upload File</p>
                                    </div>
                                    <input type="file" id="file" name="file" className="hidden" onChange={handleFileChange} required />
                                </label>
                            </div>
                        </div>
                        {/* <input type="file" id="file" onChange={handleFileChange} required /> */}
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <button type="submit" className="button-4 dark:bg-stone-900 dark:hover:bg-stone-600">Upload Scroll</button>
                        </div>

                    </form>
                </div>
            </main>
        </>
    );
}

export default FileUploadForm;
