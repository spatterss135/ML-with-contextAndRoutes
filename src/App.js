import './App.css';
import { useEffect, useState } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'

// React router dom
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ArtistView from './components/ArtistView';
import AlbumView from './components/AlbumView';
// Add Context
import { SearchContext } from './context/SearchContext';
import { DataContext } from './context/DataContext';

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')

  useEffect(() => {
    if (searchTerm) {
      document.title=`${searchTerm} Music`
      const fetchData = async () => {
        const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}`)
        const resData = await response.json()
        if(resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
  }
  }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  return (
    <div className="App">
          {message}
      <Router>
        <Routes>
          <Route path='/' element={
            <div>
              <SearchContext.Provider value={{term: '', handleSearch: handleSearch}}>
                <SearchBar/>
              </SearchContext.Provider>
              <DataContext.Provider value={data}>
                  <Gallery/>
              </DataContext.Provider>
            </div>
          } />

          <Route path='/artist/:id' element={<ArtistView />}/>

          <Route path='/album/:id' element={<AlbumView />}/>

      
        </Routes>

      </Router>
      
      
      
    </div>
  );
}

export default App;