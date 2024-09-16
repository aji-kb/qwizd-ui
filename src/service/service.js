import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});


export const fetchData = async (endpoint, params={}, config={})=>{
    try {
        const response = await axiosInstance.get(endpoint, {params, ...config});
        return response.data;
    }
    catch(error)
    {
        handleAxiosError(error);
    }
};

export const postData = async(endpoint, data, config={})=>{
    try
    {
        const response = await axiosInstance.post(endpoint, data, config);
        return response.data;
    }
    catch(error)
    {
        handleAxiosError(error);
    }
}

const handleAxiosError = (error) => {
    console.error(error);
}
