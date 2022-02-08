
import axios from 'axios'


const journalApi = axios.create({
    baseURL: 'http://localhost:3000'
})

export default journalApi


