'use client'
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import Card from '../AlbumCard/Card';
import styles from './SingleArtist.module.scss';


const SingleArtistData = [

    { id: 1, title: 'Artist Name', image: "/images/albumCard.png", subtitle: '100 song' },

]

const SingleArtist = () => {
    return (
        <div className={styles.container}>
            {
                SingleArtistData.map((artist) => (
                    <Card
                        key={artist.id}
                        images={artist.image} 
                        title={artist.title} 
                        subtitle={artist.subtitle}
                        showDetails
                        imageSizeVariant={ImageSizeVariant.RoundedXL}
                        direction='row' />
                ))
            }


        </div>
    )
}

export default SingleArtist;