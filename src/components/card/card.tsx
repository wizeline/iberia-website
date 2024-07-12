import styles from './card.module.css';
interface CardProps {
  image: string;
  title: string;
  price: number;
}
 
const Card: React.FC<CardProps> = ({ image, title, price }) => {
  return (
    <div className={styles.card}>
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