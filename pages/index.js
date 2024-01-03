import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  // Function to handle the GitHub authentication
  const handleAuth = () => {
    const client_id = "9120b5755513c4851300";
    const redirect_uri = "https://git-api-backend-production.up.railway.app/oauth-callback";
    const scope = "repo";  // Adjust the scope according to your needs

    // Construct the GitHub OAuth URL
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;
    
    // Redirect to GitHub OAuth page
    window.location.href = githubAuthUrl;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Github Sponsor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ... rest of your code ... */}

      <main>
        {/* ... rest of your code ... */}
        
        {/* Add an authentication button */}
        <button onClick={handleAuth} className={styles.authButton}>
          Authenticate with GitHub
        </button>
        
        {/* ... rest of your code ... */}
      </main>

      {/* ... rest of your code ... */}

      <style jsx>{`
    

        .authButton {
          padding: 10px 20px;
          margin: 20px;
          background-color: #2d2d2d;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
      `}</style>

      {/* ... rest of your code ... */}
    </div>
  );
}
