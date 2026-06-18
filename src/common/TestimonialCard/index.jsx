import { DynamicIcon } from "lucide-react/dynamic";
import Image from "next/image";
import styles from "./styles.module.css";

const TestimonialCard = ({
    imageSrc,
    openModal,
    name,
    testimonial,
    surgery
}) => {
    return (
        <div className={styles.testimonialCard}>
            {/* <img src="/assets/vls_logo.png" alt="" className={styles.logoImg} /> */}
            <div className={styles.imageContainer}>
                <Image src={imageSrc} alt={name} className={styles.clientImage} width={300} height={300} style={{ objectFit: "cover" }} />
                <button
                    onClick={openModal}
                    className={styles.playButton}
                >
                    <DynamicIcon name="play" fill="#e30000"
                        color="#e30000"
                        size={32} />
                </button>
                {/* <div className={styles.nameContainer}>
                    <h5>{name}</h5>
                </div> */}
            </div>
            {/* <div className={styles.textContainer}>
                <p>{testimonial}</p>
            </div> */}
        </div>
    );
};

export default TestimonialCard;