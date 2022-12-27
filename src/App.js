import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Feedbackform from './Components/Feedbackform';
import FeedbackTable from './Components/FeedbackTable';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Feedbackform/>}/>
          <Route path='/table' element={<FeedbackTable/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
