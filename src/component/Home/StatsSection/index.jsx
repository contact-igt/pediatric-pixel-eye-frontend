import React from "react";
import styles from "./styles.module.css";
import SubBanner from "@/common/SubBanner";
const StatsSection = ({ data , checkSurgery, handleTogglecontactForm }) => {
  return (
    <section>
      <div className="my-5 my-md-3">
        {/* ... (commented out code) ... */}

        <SubBanner
          title={checkSurgery?.title?.split(' ').slice(0, 3).join(' ')}
          spantitle={checkSurgery?.title?.split(' ').slice(3).join(' ')}
          content={checkSurgery?.description}
          bgcolor={"#fef8f1"}
          spancolor={"#d3863c"}
          bordercolor={"#eea35cff"}
          btn_bgcolor={"#cf873d"}
          btn_name={checkSurgery?.buttontxt}
          btn_txtcolor={"#fff"}
          isicons={false}
          isimg={true}
          btn_img={"/assets/whatsapp.png"}
          img={"/assets/surgeryCost.webp"}
          imgwidth={250}
          imgheight={250}
          scale={1.1}
          handleTogglecontactForm={handleTogglecontactForm}
        />
      </div>
    </section>
  );
};

export default StatsSection;
