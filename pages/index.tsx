import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
//import useSWR, { Fetcher, mutate } from 'swr'
import { MosaicTile } from '@prisma/client'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {

  const [tiles, setTiles] = useState<MosaicTile[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false)
 
  async function getAllTiles(){
    const allTiles = await fetch('/api/getAllTiles').then(r=>r.json());
    setTiles(allTiles);
  }

  async function updateTile(tile: MosaicTile) {
    const updatedTile: MosaicTile = await fetch("/api/updateTile", {  method: 'POST', body: JSON.stringify(tile) }).then(r => r.json())
    if(tile?.color !== updatedTile.color)
    {
      setRefresh(true);
    }
  }

  useEffect(()=>{ 
    if(refresh)
    {
      getAllTiles();
    }
   }, [refresh])

   useEffect(()=>{ 
     if(tiles.length === 0)
    getAllTiles();
   },[tiles])

  //if (error) return <div>failed to load</div>

  return tiles.length > 0 ? (
    <div className={styles.container}>
      <Head>
        <title>Mosaic Game</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Mosaic Game
        </h1>
        <div className={styles.grid}>
        {tiles.map((tile) => 
        <div 
        className={styles.card} 
        id={`${tile.x}${tile.y}`} 
        key={`${tile.x}${tile.y}`} 
        style={{backgroundColor: `#${tile.color}`}}
        onClick={()=>{
          updateTile(tile);
          setRefresh(false)}}
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
    </div>
  ) : (<div>Loading...</div>)
}

export default Home
