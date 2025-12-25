import {supabase}  from '../supabase.js';
import {useState} from 'react';

 const Auth  = ()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    const login = async ()=>{
        const {error,data} = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if(error) alert(error.message);
        if(!error) alert('Logged in successfully');
        console.log(data);
    }

return(
<>

<input type="email" onChange={e=>setEmail(e.target.value)}/>
<input type="password" onChange={e=>setPassword(e.target.value)} />
<button onClick={login}>Login</button>
</>

)
}

export default Auth;