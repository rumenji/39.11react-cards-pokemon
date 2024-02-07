import React, {useState} from "react";
import axios from "axios";
import {v1 as uuid} from "uuid";

const useAxios = url => {
    const [response, setResponse ] = useState([])
    console.log(url)
    console.log(response)
    const fetchData = async name => {
        console.log(name)
        const reqUrl = typeof name === "string" ? `${url}${name}` : url;
        const res = await axios.get(reqUrl);
        setResponse(response => [...response, { ...res.data, id: uuid() }]);
    }
    return [response, fetchData]
}

export default useAxios;