
import axios from 'axios'


const journalApi = axios.create({
    baseURL: 'https://vue-tests-da460-default-rtdb.firebaseio.com/'
})

export default journalApi


