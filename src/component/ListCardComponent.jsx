import React, {Component} from 'react';
import CardService from '../service/CardService';

class ListCardComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status:null,
            cards:[]
        }
        this.refreshCards = this.refreshCards.bind(this)
        this.addCardsClicked = this.addCardsClicked.bind(this)
    }

    componentDidMount() {
        this.refreshCards();
    }

    refreshCards() {
        CardService.fetchAllCards()
            .then(
                response => {
                    this.setState({ cards: response.data.data })
                }
            )
    }
    addCardsClicked() {
        this.props.history.push('/cards/-1')
    }
    render() {
        
        return (
            <div className="row">
                <h3>Existing Cards</h3>
                    {
                    this.state.cards.length?
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Card Number</th>
                                <th>Limit</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.cards.map(
                                    card =>
                                    <tr key={card.cardId}>
                                        <td>{card.cardHolderName}</td>
                                        <td>{card.cardNumber}</td>
                                        <td>£{card.limit}</td>
                                        <td>£{card.balance}</td>
                                    </tr>
                                )
                            }
                            
                        </tbody>
                    </table>:<div className="table">No Record Found...</div>}
                </div>
        )
    }
}

export default ListCardComponent