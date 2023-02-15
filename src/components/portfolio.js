import React from 'react'
import useSWR from 'swr'
import styles from '../styles/portfolio.module.css'
import Image from 'next/image'
import {Commontitle} from './commonTitle'
import { useState } from 'react'
('use client')
const fetcher = (url) => fetch(url).then((res) => res.json())
function Portfolio({modeToggler}) {
  const [isOpen, setOpen] = useState(true)
  const [fullImage, setFullImage] = useState()
  const openHander = (items) => {
    setFullImage(items)
    setOpen(false)
  }
  const closeHander = ( ) => {
    setFullImage()
    setOpen(true)
  }
  const { data, error } = useSWR('/api/portfolio', fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <div>
      <Commontitle  modeToggler={modeToggler} title={data.Portfolio.title} className="text-start" icon ={data.skills.arrowimg}/>
      {isOpen? <div className={`${styles.row} ${styles.portfolioContent}`}>
        { data.Portfolio.images.map((items) => {
          return (
            <div  key={Math.random()} className={styles.item}>
            <div className={styles.well}> 
            <button style={{border:"transparent", width:"100%", background:"transparent"}} onClick={(e)=> {e.preventDefault() ;openHander(items)}}>
            <Image  className={`${modeToggler? "img-thumbnail" : styles.backgroundNone} ${styles.zoom}`} 
            src={items.src} width={items.width} height={items.height} alt="PortFolio Images" />
            </button>
            </div>
          </div>
          )
        })}
      </div>:<><button className="position-relative" style={{border:"transparent", backgroundColor: "transparent"}} onClick={closeHander}>
        <Image  priority={true} width={700} height={700}  className={styles.fullscreenImg}  src={fullImage && fullImage.src} alt="portfolio-fullscreen" />
         <span className={styles.animatedOverlayTxt}>Close</span>
        </button></>}
    </div>
  )
}

export default Portfolio