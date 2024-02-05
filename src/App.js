import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RoleProvider } from './context/roleContext';
import { Home } from './container/Home/Home';
function App() {
  return (
    <div>
      <RoleProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </div>
  );
}

export default App;
