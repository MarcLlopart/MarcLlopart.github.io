import React, { useEffect, useRef, useState } from "react";
import styles from "./ChainExpertise.module.css";
import chainsData from "../../data/chains.json";

const KpiSection = ({ titleNode, description, kpis, isVisible }) => (
    <div className={styles.kpiSection}>
        <h3 className={styles.sectionTitle}>{titleNode}</h3>
        <p className={styles.sectionDescription}>{description}</p>
        <div className={styles.kpiContainer}>
            {kpis.map((kpi, index) => (
                <div key={index} className={styles.kpiItem}>
                    <div className={styles.kpiLabel}>{kpi.label}</div>
                    <div className={styles.kpiBarContainer}>
                        <div
                            className={`${styles.kpiBar} ${isVisible ? styles.animated : ""}`}
                            style={{
                                "--target-width": `${kpi.value}%`,
                                "--animation-delay": `${index * 0.1}s`,
                            }}
                        >
                            <span className={styles.kpiValue}>{kpi.value}%</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const ChainExpertise = () => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const section = containerRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(section);
        return () => observer.unobserve(section);
    }, []);

    return (
        <section className={styles.container} id="chains" ref={containerRef}>
            <h2 className={styles.title}>Chain Expertise</h2>
            <p className={styles.subtitle}>
                Multi-chain analytics across leading blockchain ecosystems
            </p>

            <div className={styles.expertiseGrid}>
                <KpiSection
                    titleNode={
                        <>
                            <span className={styles.highlight}>Algorand</span> Specialist
                        </>
                    }
                    description={chainsData.algorand.description}
                    kpis={chainsData.algorand.kpis}
                    isVisible={isVisible}
                />

                <KpiSection
                    titleNode={
                        <>
                            <span className={styles.highlight}>Prediction</span> Markets
                        </>
                    }
                    description={chainsData.predictionMarkets.description}
                    kpis={chainsData.predictionMarkets.kpis}
                    isVisible={isVisible}
                />

                <KpiSection
                    titleNode={
                        <>
                            <span className={styles.highlight}>Hyperliquid</span> &amp; DeFi Trading
                        </>
                    }
                    description={chainsData.defiTrading.description}
                    kpis={chainsData.defiTrading.kpis}
                    isVisible={isVisible}
                />

                {/* EVM Ecosystem Section (full width) */}
                <div className={styles.evmSection}>
                    <h3 className={styles.sectionTitle}>
                        <span className={styles.highlight}>EVM</span> Ecosystem Coverage
                    </h3>
                    <p className={styles.sectionDescription}>
                        Comprehensive analytics across major EVM-compatible chains
                    </p>
                    <div className={styles.chainGrid}>
                        {chainsData.evm.map((chain, index) => (
                            <div
                                key={index}
                                className={styles.chainCard}
                                style={{ "--animation-delay": `${index * 0.1}s` }}
                            >
                                <div className={styles.chainName}>{chain.name}</div>
                                <div className={styles.proficiencyContainer}>
                                    <div className={styles.proficiencyCircle}>
                                        <svg viewBox="0 0 100 100" className={styles.circularProgress}>
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                className={styles.circleBackground}
                                            />
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                className={`${styles.circleProgress} ${isVisible ? styles.animated : ""
                                                    }`}
                                                style={{
                                                    "--proficiency": chain.proficiency,
                                                }}
                                            />
                                        </svg>
                                        <div className={styles.proficiencyValue}>
                                            {chain.proficiency}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
