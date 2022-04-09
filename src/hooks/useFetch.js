import { useEffect, useState } from 'react';
import axios from './axios';


export const useFetch = (URL)=>{
    const [isPending , setIsPending] = useState(false);
    const [error , setError] = useState(null);
    const [data , setData] = useState(null);

    //--------------------------------------------------
    useEffect(()=>{
        async function dataFetch(){
            setIsPending(true)
            try{
                const data = await axios.get(URL);
                setTimeout(setIsPending(false),2000)
                setData(data)
                setError(null)
            }catch(error){
                setIsPending(false)
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("error-response",error.response.data);
                    console.log("error-status",error.response.status);
                    console.log("error-headers",error.response.headers);
                  }
            }
        }
        dataFetch();
    },[URL])
    

    return { isPending , data , error }
}

