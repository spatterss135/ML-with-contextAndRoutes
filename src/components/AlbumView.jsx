import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

export default function AlbumView(){
    let {id} = useParams()
    let [AlbumData, setAlbumData] = useState([])

    let navigate = useNavigate()

    useEffect(()=> {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            let response = await fetch(API_URL)
            let resData = await response.json()
            console.log(resData.results)
            setAlbumData(resData.results)

        }
        fetchData()
    }, [id])
    
    const justSongs = AlbumData.filter(data => data.kind === 'song')
    const renderSongs = justSongs.map((album, i) => {
        return(
            <div key={i}>

               {album.trackName}
            </div>
        )
    })
    // console.log(AlbumData[0].AlbumName)

    return (
        <>
        <button onClick={()=> navigate('/')}>Home</button>
        <button onClick={()=> navigate(-1)}>Back</button>
        <p>
            {AlbumData[0]? AlbumData[0].collectionName: 'Loading...'}
        </p>
        {renderSongs}
        </>
    )
}
