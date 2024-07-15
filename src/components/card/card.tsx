import styles from './card.module.css';
import { useRouter } from 'next/router';

interface CardProps {
  image: string;
  title: string;
  price: number;
  profile: string;
}

const Card: React.FC<CardProps> = ({ image, title, price , profile}) => {
    const router = useRouter();
    const handleCardClick = () => {
        router.push(`/detail/${title}/${profile}`);
    };
 
  return (
    <div className={styles.card} onClick={handleCardClick}>
      <img src={image} alt={title} className={styles.card_image} />
      <div className={styles.card_content}>
        <h2>{title}</h2>
        <p>Round trip price from</p>
        <p className={styles.card_price}>{price} €</p>
      </div>
    </div>
  );
};

export default Card;