import './App.css';
import Board from './components/Board';
import { CAMP } from './config';

function App() {
  return (
    <div className="App">
      <Board userCamp={CAMP.BLACK} />
    </div>
  );
}

export default App;
