class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.textInput = React.createRef();    
        this.handleInput = this.handleInput.bind(this);
    }
    
    componentDidMount() {
        let node = this.textInput.current;
        node.style.height = `${node.scrollHeight}px`;
        node.style.overflowY = 'hidden';
    }

    handleInput(event) {
        let target = event.target;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
    }

    render() {
        return (
            <textarea ref={this.textInput} onChange={this.handleInput} />
        );
    }
}

class AutoFocusTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }


}

ReactDOM.render(<AutoFocusTextInput />, document.querySelector('#root'))