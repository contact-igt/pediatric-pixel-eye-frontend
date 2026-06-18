import SubBanner from "@/common/SubBanner";
import styles from "./styles.module.css";

const AfterSurgery = ({ surgerydata, handleTogglecontactForm }) => {
  return (
    <section className={styles.aftersurgerysec}>
      <div
        className={`commonshadow ${styles.surgerycard}`}
        onClick={handleTogglecontactForm}
      >
        <h4>{surgerydata?.title}</h4>
        <p>{surgerydata?.desc1}</p>
        <p>{surgerydata?.desc2}</p>
        <p>{surgerydata?.desc3}</p>
      </div>

      <SubBanner
        title={"Your Child’s Eye Health,"}
        spantitle={"Explained Clearly"}
        content={
          "Get guidance on symptoms, consultation needs, and the next best step for your child’s eye care."
        }
        bgcolor={"#f4faff"}
        spancolor={"#5382b0"}
        bordercolor={"#2f74b1"}
        btn_bgcolor={"#2f74b1"}
        btn_name={"Check Now"}
        btn_txtcolor={"#fff"}
        isicons={false}
        isimg={false}
         img={"/assets/simplifiedAi.webp"}
          imgheight={250}
          imgwidth={250}
          scale={1.2}
        handleTogglecontactForm={handleTogglecontactForm}
      />
    </section>
  );
};

export default AfterSurgery;
