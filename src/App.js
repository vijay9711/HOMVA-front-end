import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RoleProvider } from './context/roleContext';
import {Router} from "./route/route";
function App() {
  return (
    <div>
      <RoleProvider>
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
      </RoleProvider>
    </div>
  );
}

export default App;
