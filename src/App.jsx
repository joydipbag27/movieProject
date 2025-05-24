import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Explore from './components/Explore'
import Details from './components/Details'
import Category from './components/Category'
import Favorites from './components/Favorites'
import Settings from './components/Settings'
import Profile from './components/Profile'

function App() {
  return (
    <div className='mainContainer'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/explore' element={<Explore/>} />
        <Route path='/details/:mediaType/:mediaId' element={<Details/>} />
        <Route path='/categories/:category' element={<Category/>} />
        <Route path='/favorites' element={<Favorites/>} />
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </div>
  )
}

export default App