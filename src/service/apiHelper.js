import axios from 'axios';

const APP_URL = process.env.REACT_APP_URL;
const BASE_URL = "";

export class ApiHelper{
    get(uri) {
        // console.log("url ", uri)
        return axios.get( uri, {
            headers:this.getHeaders(),
            withCredentials: false
        })
            .then(this.checkResponse)
            .catch(this.handleError)
    }
    loginPost(uri, data) {
        return axios.post( uri, data, {
            withCredentials: false
        })
            .then(this.checkResponse)
            .catch(this.handleError)
    }
    post(uri, data) {
        return axios.post( uri, data, {
            headers:this.getHeaders(),
            withCredentials: false
        })
            .then(this.checkResponse)
            .catch(this.handleError)
    }
    put(uri, data) {
        return axios.put( uri, data, {
            headers:this.getHeaders(),
            withCredentials: false
        })
            .then(this.checkResponse)
            .catch(this.handleError)
    }
    delete(uri) {
        return axios.delete( uri, {
            headers:this.getHeaders(),
            withCredentials: false
        })
            .then(this.checkResponse)
            .catch(this.handleError)
    }
    getHeaders(){
        let defaultHeaders = BASE_URL;
        defaultHeaders = {};
        let token = localStorage.getItem('token');
        if(token){
            defaultHeaders.Authorization = `Bearer ${token}`;
        }
        // console.log(" header ", defaultHeaders);
        return defaultHeaders
    }
    checkResponse(response) {
        return response
    }

    handleError(error) {
        return Promise.reject(error.response)
    }
}