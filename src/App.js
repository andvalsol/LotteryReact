import "./App.css";
import React from "react";
import Lottery from "./Lottery";
import web3 from "./web3";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            manager: '...',
            players: [],
            currentBalance: '',
            value: '',
            statusMessage: ''
        };
    }

    async componentDidMount() {
        // Get data from the contract
        const manager = await Lottery.methods.manager().call(); // We don´t have to specify the account since we´re using the account that Metamask has selected by default in the tab
        const players = await Lottery.methods.getPlayers().call();
        const currentBalance = await web3.eth.getBalance(Lottery.options.address);

        this.setState({
            manager,
            players,
            currentBalance
        })
    }

    // We use an arrow function so that we can skip binding the this object
    onSubmit = async (event) => {
        // Prevent the form to submit itself
        event.preventDefault();

        // Send the transaction to the enter function
        // NOTE: Because of the current version of web3 that we're using we need to specify the account that we're using to make
        // a transaction
        const accounts = await web3.eth.getAccounts();

        // Assume that the first account is the account that will send the transaction
        const mainAccount = accounts[0];

        // Since this will send a transaction and it takes time, we need to communicate this to the user
        this.setState({statusMessage: 'Waiting on transaction success'})

        await Lottery.methods.enter().send({
            from: mainAccount,
            value: web3.utils.toWei(this.state.value, 'ether')
        });

        this.setState({statusMessage: 'You have entered the contest!'})
    }

    // Use the arrow syntax
    pickWinner = async () => {
        // Send the transaction to the enter function
        // NOTE: Because of the current version of web3 that we're using we need to specify the account that we're using to make
        // a transaction
        const accounts = await web3.eth.getAccounts();

        // Assume that the first account is the account that will send the transaction
        const mainAccount = accounts[0];

        // Since this will send a transaction and it takes time, we need to communicate this to the user
        this.setState({statusMessage: 'Picking a winner!'})

        await Lottery.methods.pickWinner().send({
            from: mainAccount
        });

        this.setState({statusMessage: 'A winner has been picked!'})
    }

    render() {
        return (
            <div className="App">
                <h2>Lottery Contract</h2>
                <p>
                    This contract is managed by: {this.state.manager}.
                    There are currently {this.state.players.length} trying to
                    earn {web3.utils.fromWei(this.state.currentBalance, 'ether')}
                </p>
                <hr/>
                <form onSubmit={this.onSubmit}>
                    <h4>Want to try your luck?</h4>
                    <div>
                        <label>Amount of ether to enter: </label>
                        <input
                            value={this.state.value}
                            onChange={(event) => {
                                this.setState({value: event.target.value})
                            }}/>
                    </div>
                    <button>Enter</button>
                </form>
                <hr/>
                <h1>{this.state.statusMessage}</h1>
                <hr/>
                <h4>Ready to pick a winner?</h4>
                <button onClick={this.pickWinner}>Pick a winner</button>
            </div>
        );
    }
}

export default App;
