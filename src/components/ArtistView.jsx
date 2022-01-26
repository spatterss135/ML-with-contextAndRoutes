import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

export default function ArtistView(){
    let {id} = useParams()
    let [artistData, setArtistData] = useState([])

    useEffect(()=> {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            let response = await fetch(API_URL)
            let resData = await response.json()
            console.log(resData.results)
            setArtistData(resData.results)

        }
        fetchData()
    }, [id])
    
    const justAlbums = artistData.filter(data => data.collectionType === 'Album')
    const renderAlbums = justAlbums.map((album, i) => {
        return(
            <div key={i}>

                <Link to={`/album/${album.collectionId}`}>{album.collectionName}</Link>
                
            </div>
        )
    })
    // console.log(artistData[0].artistName)

    return (
        <>
        <p>{artistData[0]? artistData[0].artistName: 'Loading...'}</p>
        {renderAlbums}
        </>
    )
}



