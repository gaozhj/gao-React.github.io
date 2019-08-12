import React from 'react'

export default class ShowData extends React.Component {
    render() {
        const history = this.props.history;
        const moves = history.map((step, move) => {
            const coordinate = step.value;
            const desc =
                move + '项: ' + coordinate;
            return (
                <li key={move}>
                    {desc}
                </li>
            );
        });
        return (
            <ul>{moves}</ul>
        );
    }
}