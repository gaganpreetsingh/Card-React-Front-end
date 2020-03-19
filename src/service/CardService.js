import axios from 'axios'

const SERVER_BASE_URL = 'http://localhost:8080'
const CARD_API_URL = SERVER_BASE_URL+'/api/v1'

class CardService {

    fetchAllCards() {
        return axios.get(CARD_API_URL+'/cards/');
    }

    createCard(card){
        return axios.post(CARD_API_URL+'/cards/', card);
    }
}

export default new CardService()