import React, { useState, useEffect } from 'react';

const Repositories = () => {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        // Fetch the repositories when the component mounts
        fetch('https://git-api-backend-production.up.railway.app/get-repos')
            .then(response => response.json())
            .then(data => setRepos(data))
            .catch(error => console.error('Error fetching repos:', error));
    }, []); // Empty dependency array means this effect runs once on mount
    useEffect(() => {
        console.log(repos);
    },[repos]);
    return (
        <div>
            <h1>User Repositories</h1>
            <ul>
                {repos.map(repo => (
                    <li key={repo.id}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Repositories;
