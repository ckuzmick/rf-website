import styles from "@/styles/Cards.module.css";
import { Article } from "@/types";

export function LeftImageSmallCard(info: Article) {
    return (
        <a href={`/writing/${info.slug}`}>
            {info.cover && (
                <div className={styles.leftcard}>
                    <img src={info.cover} alt="Picture of the author" />
                    <div className={styles.text}>
                        <h2>{info.author}</h2>
                        <h1>{info.title}</h1>
                        <p>{info.body?.slice(0, 200)}...</p>
                    </div>
                </div>
            )}
        </a>
    );
}

export function TopImageSmallCard(info: Article) {
    return (
        <a href={`/writing/${info.slug}`}>
            {info.cover && (
                <div className={styles.topcard}>
                    <img src={info.cover} alt="Picture of the author" />
                    <div className={styles.text}>
                        <h1>{info.title}</h1>
                        <h2>{info.author}</h2>
                        <p>{info.body?.slice(0, 200)}...</p>
                    </div>
                </div>
            )}
        </a>
    );
}