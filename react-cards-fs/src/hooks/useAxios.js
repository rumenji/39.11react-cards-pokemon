import React, {useState, useEffect} from "react";
import axios from "axios";
import {v1 as uuid} from "uuid";

const useLocalStorage = (key, defaultValue = []) => {
    const [state, setState] = useState(() => {
        let value;
        try{
            value = JSON.parse(
                window.localStorage.getItem(key) || JSON.stringify(defaultValue)
            )
        } catch (e) {
            console.log(e)
            value = defaultValue;
        }
        return value;
    }
    )

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])
    return [state, setState];
}

const useAxios = (url, minRes, keyName) => {
    const [response, setResponse ] = useLocalStorage(keyName, [])
    console.log(url)
    console.log(response)
    const fetchData = async name => {
        
        const reqUrl = typeof name === "string" ? `${url}${name}` : url;
        const res = await axios.get(reqUrl);
        console.log(res)
        const formattedResponse = minRes(res)
        setResponse(response => [...response, { ...formattedResponse, id: uuid() }]);
    }

    const deleteResData = () => {
        setResponse([])
    }

    return [response, fetchData, deleteResData]
}

export {useAxios, useLocalStorage };