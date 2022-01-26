import { useContext, useState } from 'react'
import { SearchContext } from '../context/SearchContext'


function SearchBar(){
    // let [searchTerm, setSearchTerm] = useState('')
    let [input, setInput]  = useState('')
    let {term, handleSearch} = useContext(SearchContext)

    return (
            <form onSubmit={(e) => handleSearch(e, input)}>
                <input type="text" placeholder="Search Here" onChange={(e) => setInput(e.target.value)} />
                <input type="submit" />
            </form>
    )
}

export default SearchBar
