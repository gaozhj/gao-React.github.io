import React from 'react'

export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // this.setState({
        //     value: event.target.value,
        // });
        this.props.onChange(event.target.value);
    }

    handleSubmit(event) {
        this.props.onSubmit(event);      
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    名字:
                 <input type="text" value={this.props.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="提交" />
            </form>

        );
    }
}

