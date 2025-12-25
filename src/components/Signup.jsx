import {supabase} from '../supabase.js';
import {useState} from 'react';


 const Signup  = ()=>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const signup = async ()=>{
        const {error}  = await supabase.auth.signUp({
            email,
            password,
        })
        if(error) alert(error.message);

    }

    return(
    <>
    <input type="email" onChange={e=>setEmail(e.target.value)}/>
    <input type="password" onChange={e=>setPassword(e.target.value)} />
    <button onClick={signup}>Sign Up</button>
    </>
    )
}

export default Signup;