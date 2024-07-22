import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import Card from '../../AlbumCard/Card';
import Heading from '../../Heading/Heading';
import styles from './Hits.module.scss';

const Hits = () => {
    const data = [
        {
            image: '/images/hits1.png'
        },
        {
            image: '/images/hits2.png'
        },
        {
            image: '/images/hits3.png'
        },

    ]

    const turnicateData = data.slice(0, 3)
    return (
        <div className={styles.main}>
            <Heading title="Top Hits" />
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

export default Hits;