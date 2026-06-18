"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={styles.preloader_container}>
      <div className={styles.loader_wrapper}>
        <div className={styles.loader_circle}></div>
        <Image
          src="/assets/loader.png"
          alt="Loading..."
          width={140}
          height={140}
          className={styles.loader_logo}
          priority
        />
      </div>
    </div>
  );
}
