import * as React from 'react';
import logo from './logo.svg';
import './App.css';

const ReadOnlyComment = ({ text, left, top }) => (
  <p className="comment-box" style={{ top, left }}>{text}</p>
)

const CommentBox = ({ left, top, onSubmit }) => {
  const [text, setText] = React.useState('')
  return <div className="comment-box" style={{ top, left }}>
    <textarea onInput={(event) => setText(event.target.value)} />
    <button onClick={() => onSubmit(text)}>Submit</button>
  </div>
}

let i = 0;

const useLocalJams = () => {
  const [jams, setJams] = React.useState(JSON.parse(window.localStorage.getItem('jams')) || [])
  console.log('jams', jams)

  const setStorage = (args) => {
    window.localStorage.setItem('jams', JSON.stringify(args))
    setJams(args)
  }
  return [jams, setStorage]
}

function App() {
  const [currentPosition, setPosition] = React.useState({ left: null, top: null })
  const [jams, setJams] = useLocalJams()
  const { left, top } = currentPosition

  const ref = React.useRef(null);

  const onSubmit = (text) => {
    setJams(jams.concat([{
      left, top, text
    }]))
    setPosition({ left: null, top: null })
  }

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.persist()
    setPosition({ left: e.clientX, top: e.clientY })
  }

  return (
    <>
    {jams.map((comment) => (<ReadOnlyComment {...comment} />))}
    {left != null && top != null && <CommentBox onSubmit={onSubmit} {...currentPosition} />}
    <div onClick={onClick} ref={ref} className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </>
  );
}

export default App;
