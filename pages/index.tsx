import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
//import useSWR, { Fetcher, mutate } from 'swr'
import { MosaicTile } from '@prisma/client'
import { useState } from 'react'
import { HexColorPicker, HexColorInput } from "react-colorful";
import useSWR, { mutate } from 'swr'

const Home: NextPage = () => {
  const [color, setColor] = useState("#aabbcc");
  const refetchKey = "/api/getAllTiles";
  const fetcher: (url: RequestInfo) => Promise<any> = url => fetch(url).then(r => r.json())
  const { data: tiles, error } = useSWR<MosaicTile[]>(refetchKey, fetcher)

  async function updateTile(tile: MosaicTile) {
    let updatedTile: MosaicTile | undefined = undefined
    const dataForSend = {
      x: tile.x,
      y: tile.y,
      color: color
    }
    // restrict multiple updates based on initial color #000000
    if(tile.color == '000000')
    {
      updatedTile = await fetch("/api/updateTile", {  method: 'POST', body: JSON.stringify(dataForSend) }).then(r => r.json())
    }    
    if(tile.color !== updatedTile?.color)
    {
      // Automatically refetch updated info as defined on: https://swr.vercel.app/docs/mutation
      mutate(refetchKey)
    }
  }
  

/*   useEffect(()=>{ 
    if(refresh)
    {
      getAllTiles();
    }
   }, [refresh])

   useEffect(()=>{ 
     if(tiles.length === 0)
    getAllTiles();
   },[tiles]) */

  //if (error) return <div>failed to load</div>
  if (error) return <div>failed to load</div>
  if (!tiles) return <div>loading...</div>
  return (
    <div id={"Mosaic"} className={styles.container}>
      <Head>
        <title>Mosaic Game</title>
      </Head>
      

      <main className={styles.main}>
        
        <h1 className={styles.title}>
          Welcome to the Mosaic Game
        </h1>
        <div>
          <HexColorPicker id={"colorPicker"} color={color} onChange={setColor} />
        </div>
        <div className={styles.grid}>
        {tiles.map((tile) => 
        <div 
        className={styles.card} 
        id={`${tile.x}${tile.y}`} 
        key={`${tile.x}${tile.y}`} 
        style={{backgroundColor: `#${tile.color}`}}
        onClick={()=>{
          updateTile(tile);
         // setRefresh(false)
        }}
        >
        
        </div>)}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://diginlab.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/diginlab.png" alt="Diginlab Logo" width={60} height={30} />
          </span>
        </a>
      </footer>
    </div>)
  //) : (<div>Loading...</div>)
}

export default Home
