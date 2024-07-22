import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import Card from '../../AlbumCard/Card';
import styles from './Artist.module.scss';
import Heading from '../../Heading/Heading';

const Artist = () => {
    const data = [
        {
            image: '/images/artist1.jpg'
        },
        {
            image: '/images/artist2.jpg'
        },
        {
            image: '/images/artist3.jpg'
        },
        {
            image: '/images/artist4.jpg'
        },
        {
            image: '/images/artist5.jpg'
        },
        {
            image: '/images/artist6.jpg'
        },
        {
            image: '/images/artist5.jpg'
        },
        {
            image: '/images/artist6.jpg'
        },
        
        


    ]

    const turnicateData = data.slice(0,5)
    return (

        <div className={styles.main}>
            <Heading title="Top Artists"/>
            <div className={styles.container}>
                {
                    turnicateData.map((item, index) => (
                        <Card key={index}
                            images={item.image}
                            imageSizeVariant={ImageSizeVariant.Rounded} />
                    ))
                }

            </div>

        </div>

    )
}

export default Artist;