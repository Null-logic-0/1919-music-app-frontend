import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import Card from '../../AlbumCard/Card';
import styles from './Albums.module.scss';
import Heading from '../../Heading/Heading';

const Albums = () => {
    const data = [
        {
            image: '/images/album1.png'
        },
        {
            image: '/images/album2.png'
        },
        {
            image: '/images/album3.png'
        },
        {
            image: '/images/album4.png'
        },
        {
            image: '/images/album5.png'
        },
        
        
        


    ]

    const turnicateData = data.slice(0,3)
    return (

        <div className={styles.main}>
            <Heading title="Top Albums"/>
            <div className={styles.container}>
                {
                    turnicateData.map((item, index) => (
                        <Card key={index}
                            images={item.image}
                            imageSizeVariant={ImageSizeVariant.Medium} />
                    ))
                }

            </div>

        </div>

    )
}

export default Albums;