'use client'
import Card from '../AlbumCard/Card';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import Heading from '../Heading/Heading';
import axios from "axios";
import styles from './TopArtist.module.scss'


const ArtistData = [
  { id:1,title: 'Song Name', image: "/Images/albumCard.png", subtitle: '100 song' },
  { id:2,title: 'Song Name', image: "/Images/albumCard.png", subtitle: '100 song' },
  { id:3,title: 'Song Name', image: "/Images/albumCard.png", subtitle: '100 song' },
  { id:4,title: 'Song Name', image: "/Images/albumCard.png", subtitle: '100 song' },
  { id:5,title: 'Song Name', image: "/Images/albumCard.png", subtitle: '100 song' },
  { id:6,title: 'Song Name', image: "/Images/albumCard.png", subtitle: '100 song' },
  { id:7,title: 'Song Name', image: "/Images/albumCard.png", subtitle: '100 song' },
  { id:8,title: 'Song Name', image: "/Images/albumCard.png", subtitle: '100 song' },
];





const TopArtist = () => {
  return (
    <div className={styles.container}>
    <Heading title="Top Artists" />
    <div className={styles.albumWrapper}>
      {ArtistData.map((artist) => (

        <Card
          link={`/topartist/${artist.id}`} 
          key={artist.id}
          images={artist.image}
          title={artist.title}
          subtitle={artist.subtitle}
          showDetails
          direction="column"
          imageSizeVariant={ImageSizeVariant.RoundedXL}
        />

      ))}
    </div>

  </div>
    
  )
}


export default TopArtist;
