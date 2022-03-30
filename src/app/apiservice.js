

import axios from 'axios'

export const httpClient = axios.create({
    baseURL: ' https://egefaz-api1.herokuapp.com'
}
)

class ApiService {

    constructor(apiurl) {
        this.apiurl = apiurl
    }

    post(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.post(requestUrl, objeto)
    }
    put(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl, objeto)
    }
    get(url) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.get(requestUrl)
    }

    patch(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.patch(requestUrl)
    }
    
    delete(url) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.delete(requestUrl)
    }
}

export default ApiService