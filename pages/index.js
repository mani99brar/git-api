import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  // Function to handle the GitHub authentication
  const handleAuth = () => {
    const client_id = "9120b5755513c4851300";
    const redirect_uri = "https://git-api-backend-production.up.railway.app/oauth-callback?user=mani";
    const scope = "repo";  // Adjust the scope according to your needs

    // Construct the GitHub OAuth URL
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;
    
    // Redirect to GitHub OAuth page
    window.location.href = githubAuthUrl;
  };

  return (
    <div >
      <Head>
        <title>Github Sponsor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 > Add omo as Sponsor in Github repo</h1>
        
        <button onClick={handleAuth} >
          Authenticate with GitHub
        </button>

      </main>

      <style jsx global>{`
        .authButton {
          padding: 10px 20px;
          margin: 20px;
          background-color: #2d2d2d;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
          background-color: #black;
       }
        main {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: black;
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
      h1{
        color: white;
        font-size: 2.4rem;
        margin-bottom: 60px;
    }  
      `}</style>
    </div>
  );
}
