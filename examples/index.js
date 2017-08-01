import React from 'react';
import ReactDOM from 'react-dom';

import Portal from '../src/portal.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.onClose = ::this.onClose;
    this.onOpen = ::this.onOpen;
  }

  onClose() {
    console.log('On Close');
    this.setState({
      isOpen: false
    });
  }

  onOpen() {
    console.log('On Open');
    this.setState({
      isOpen: true
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.onOpen}>Open Portal</button>
        <Portal
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          closeOnEsc
          closeOnOutsideClick
        >
          <div style={{border: "1px solid #000"}}>
            <h2>Pseudo Modal</h2>
            <p>This react component is appended to the document body.</p>
            <p>
              This is{' '}
              <strong>
                great for a modal, lightbox, loading bar ... etc.
              </strong>.
            </p>
            <p>Close this by pressing <strong>ESC</strong>.</p>
            <button onClick={this.onClose}>Close Portal</button>
          </div>
        </Portal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
