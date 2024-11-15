import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Header from './bricks/Header';
import Home from './bricks/Home';
import ShoppingList from './bricks/ShoppingList';

function App() 
{
  return (
    <UserProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/shopping-list" element={<ShoppingList/>} />          
       </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
