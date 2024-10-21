import React,{useEffect, useState} from 'react';
import './github.module.css';
function FetchUserProfile(){
    const[username,setUsername] = useState('');
    const[error,SetError] = useState(null);
    const[loading,SetLoading] = useState(false);
    const[profile,SetProfile] = useState(null);

    async function fetchingApi(){
        SetLoading(true);
        SetError(false);
        try{
           
            const api = await fetch(`https://api.github.com/users/${username}`)
            if(!api.ok){
                throw new Error('User not Found')
            }
            const data = await api.json();
            SetProfile(data);

        }catch(e){
          SetError(e.message);
         
        }
        SetLoading(false);
    }

    function handleReset(){
        SetProfile('');
        SetError(false);
        setUsername('');
    }

useEffect(()=> {
    if(username){
    fetchingApi()
}
},[username]);

    return(
        <div>
            <h1>GitHub Profile Fetcher</h1>
            <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter a Username'/>
                <button onClick={handleReset}>Reset</button>
           {loading && <p>Loading...</p>} 
           {error && <p className='error'>{error}</p>}

           {
            profile && (
                <div className='card'>
                    <img src={profile.avatar_url} alt={profile.login} className='profile-image'/>
                    <h2>{profile.name || 'NO Name Provided'}</h2>
                    <p>{profile.bio || 'No BIO Available'}</p>
                    <p>Public Repositories:{profile.public_repos}</p>
                    <a href={profile.html_url} target='_blank' rel='noopener noreferrer'>View on Github</a>
                </div>
            )
           }
            
        </div>
    )

}
export default FetchUserProfile;  