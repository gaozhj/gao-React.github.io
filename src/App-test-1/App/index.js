import React from 'react'
import Edit from '../Edit'
import ShowData from '../ShowData'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            history: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(value) {
        // this.setState({
        //     value: event.target.value,
        // });
        this.setState({ value });
    }

    handleSubmit(event) {
        const history = this.state.history;
        this.setState({
            history: history.concat({
                value: this.state.value
            })
        });
        event.preventDefault(); 
    }

    render() {
        return (
            <div>
                <Edit onChange={this.handleChange} onSubmit={this.handleSubmit} />
                <ShowData history={this.state.history} />
            </div>
        );
    }
}
