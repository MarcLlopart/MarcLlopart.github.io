import React, { useEffect, useRef, useState } from "react";
import { CountUp } from "countup.js";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  const statsRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Animate counters
            const counters = [
              { id: 0, end: 5, suffix: "+" },
              { id: 1, end: 12, suffix: "+" },
              { id: 2, end: 300, suffix: "+" },
              { id: 3, end: 7, suffix: "+" },
              { id: 4, end: 6, suffix: "+" },
            ];

            counters.forEach(({ id, end, suffix }) => {
              if (statsRef.current[id]) {
                const countUp = new CountUp(statsRef.current[id], end, {
                  duration: 2.5,
                  suffix: suffix,
                  enableScrollSpy: false,
                });
                countUp.start();
              }
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const heroElement = document.querySelector(`.${styles.container}`);
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
    };
  }, [isVisible]);

  return (
    <section className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.content}>
          <h1 className={styles.title}>Hi, I'm Marc!</h1>
          <p className={styles.subtitle}>Data Scientist & Blockchain Enthusiast</p>
          <p className={styles.tagline}>
            "Extracting actionable insights from onchain data"
          </p>
          <p className={styles.description}>
            I'm an analytics engineer working at the intersection of trading and
            on-chain data. I build the instrumentation and data models that turn raw
            blockchain and product activity into clear, decision-ready intelligence.
            My background combines a foundation in computational mathematics with
            quantitative-finance rigor and crypto-native fluency, so I can translate
            complex data into insight that teams and traders act on.
          </p>
          <a href="mailto:llopartdata@gmail.com" className={styles.contactBtn}>
            Let's Connect
          </a>
        </div>

        <div className={styles.imageWrapper}>
          <img
            src={getImageUrl("aboutImage.jpg")}
            alt="Marc Llopart"
            className={styles.heroImg}
          />
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.statValue} ref={(el) => (statsRef.current[0] = el)}>
            0
          </div>
          <div className={styles.statLabel}>Years On-Chain</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statValue} ref={(el) => (statsRef.current[1] = el)}>
            0
          </div>
          <div className={styles.statLabel}>Dashboards Shipped</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statValue} ref={(el) => (statsRef.current[2] = el)}>
            0
          </div>
          <div className={styles.statLabel}>Github Contributions</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statValue} ref={(el) => (statsRef.current[3] = el)}>
            0
          </div>
          <div className={styles.statLabel}>Chains Analyzed</div>
          <div className={styles.subStatLabel}>(Algorand, Ethereum, Binance Smart Chain, ...)</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statValue} ref={(el) => (statsRef.current[4] = el)}>
            0
          </div>
          <div className={styles.statLabel}>Categories Analyzed</div>
          <div className={styles.subStatLabel}>(DeFi, RWA, Prediction Markets,...)</div>
        </div>
      </div>

      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};