import { PropsWithChildren } from "react";

import styles from "./demo-article.module.css";

interface DemoArticleProps {
  title: string;
  description: string;
  instructions?: string;
}

const DemoArticle = ({
  title,
  description,
  instructions,
  children,
}: PropsWithChildren<DemoArticleProps>): JSX.Element => {
  return (
    <article className={styles.article}>
      <header>
        <h3>{title}</h3>
        <p>{description}</p>
        {instructions && <p className={styles.instructions}>{instructions}</p>}
      </header>
      <section className={styles.content}>{children}</section>
    </article>
  );
};

export default DemoArticle;
