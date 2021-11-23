import './App.css';
import Header from './components/Header';
import './components/Home'
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';

function App() {
  return (
    <>
      <Header />
      <div className="flex-container" >
        <div className="box" >
          <Home />
        </div>
        <div className="box" >
          <Login />
        </div>
      </div>

      <Profile />


      <Register />
    </>
  );
}

export default App;
