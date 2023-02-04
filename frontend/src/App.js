import logo from './logo.svg';
import './App.css';
import Recipe from './Components/Recipe/Recipe';
import {BrowserRouter, Routes, Route} from "react-router-dom"
// import CreateRecipe from './Components/CreateRecipe/CreateRecipe';
import AddRecipe from './Components/cr/AddRecipe';
import EditRecipe from './Components/cr/EditRecipe';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import { Toaster } from 'react-hot-toast';
import JoinUs from './Components/JoinUs/JoinUs';
import Login from './Components/JoinUs/Login';
import MyRecipes from './Components/MyRecipes/MyRecipes';

function App() {
  return (

    <BrowserRouter>
              <Toaster />
              <Header />
        <Routes>
              <Route path={`/`} element={<Home />}/>
              <Route path={"/recipe/:recipeId"} element={<Recipe />} />
              <Route path={"/create"} element={<AddRecipe />} />
              <Route path={"/edit/:recipeId"} element={<EditRecipe />} />
              <Route path={"/my-recipes"} element={<MyRecipes />}/>
              <Route path={`/join-us`} element={<JoinUs />} />
              <Route path={`/login`} element={<Login />} />
        </Routes> 
    </BrowserRouter>
  );
}

export default App;
