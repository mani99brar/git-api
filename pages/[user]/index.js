import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import axios from 'axios'; // Import Axios

const Repositories = () => {
    const router = useRouter();
    const user = router.query.user;

    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [customContent, setCustomContent] = useState("custom: 'https://omo.so/User'"); // Default content

    useEffect(() => {
        
        // Function to fetch the repositories
        const fetchRepos = async () => {
            setLoading(true);
            try {
                const response = await axios.post('https://git-api-backend-production.up.railway.app/get-repos', {
                    user: user // Pass the user as part of the request body
                });
                setRepos(response.data); // Update the state with the fetched repositories
                setLoading(false);
            } catch (error) {
                console.error('Error fetching repos:', error);
                setMessage(`Error fetching repositories: ${error.message}`);
                setLoading(false);
            }
        };
    
        if (user) {
            fetchRepos(); // Call the function to fetch repositories if user is defined
        }
    }, [user]); // Empty dependency array means this effect runs once on mount

    // Function to handle adding FUNDING.yml to the selected repository
    const handleAddFundingFile = async (repo) => {
        setLoading(true);
        setMessage(''); // Clear any previous messages
        
        try {
            const response = await axios.post('https://git-api-backend-production.up.railway.app/save-file', {
                owner: repo.owner.login,
                repo: repo.name,
                content: customContent // Use the custom content from state
            });
            setMessage(`omo sponsor link added to ${repo.name}`); // Set a success message
        } catch (error) {
            setMessage(`Error adding FUNDING.yml to ${repo.name}: ${error.message}`); // Set an error message
            console.error('Error adding FUNDING.yml:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className='repoWrapper'>
            {repos[0] && <h1>Choose Your Repo {repos[0].owner.login}</h1>}
            {loading && <p>Loading...</p>}
            {message && <p>{message}</p>}
            <div className='inputDiv'>
                <label htmlFor="customContent">Your omo url</label>
            <input 
                type="text"
                value={customContent}
                onChange={(e) => setCustomContent(e.target.value)} // Update customContent state when input changes
                placeholder="Enter custom content for FUNDING.yml"
            />
            </div>
            
            <ul>
                {repos.map(repo => (
                    <li key={repo.id}>
                        <button onClick={() => handleAddFundingFile(repo)}>{repo.name}</button>
                    </li>
                ))}
            </ul>
            
            <style jsx global>{`
                .inputDiv{
                    width: 80%;
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                }
                label{
                    color: white;
                    font-size: 1.2rem;
                }
                input{
                    padding: 10px 20px;
                    width: 20%;
                }
                body {
                    margin: 0;
                    padding: 0;
                    font-family: sans-serif;
                    background-color: #black;
                 }
                h1{
                    color: white;
                    font-size: 2.4rem;
                    width: 80%;
                    
                }        
                button {
                    padding: 10px 20px;
                    margin: 20px;
                    background-color: white;
                    color: #2d2d2d;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                    font-size: 1.2rem;
                }
                li{
                    list-style-type: none;
                    
                }
                .repoWrapper{
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: black;
                }
                ul{
                    padding: 0;
                    display: flex;
                    width: 80%;
                    flex-wrap: wrap;
                    justify-content: space-around;
                }
                p{
                    color: white;
                    text-size: 1.2rem;
                }
            `}</style>
        </div>
    );
};

export default Repositories;
