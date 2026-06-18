import Title from "@/common/Title";
import styles from "./styles.module.css";
import SubBanner from "@/common/SubBanner";
import Image from "next/image";
import Button from "@/common/Button";
import { useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";

const FAQ = ({ faqlist, handleTogglecontactForm }) => {
  const [stable, setStable] = useState(null);

  return (
    <section className={styles.faqsec}>
      <div>
        <Title title={"Frequently Asked Questions"} />

        <div className="accordion commonshadow my-4" id="accordionExample">
          {faqlist.map((data, i) => (
            <div className="accordion-item" key={i}>
              <h2 className={`accordion-header ${styles.question}`}>
                <button
                  className={`accordion-button ${stable === i ? "" : "collapsed"}`}
                  type="button"
                  onClick={() => setStable(stable === i ? null : i)}
                  aria-expanded={stable === i}
                  aria-controls={`collapse${i}`}
                >
                  {data?.question}
                </button>
              </h2>
              <div
                id={`collapse${i}`}
                className={`accordion-collapse collapse ${stable === i ? "show" : ""}`}
                data-bs-parent="#accordionExample"
              >
                <div className={`${styles.accordionbody} accordion-body`}>
                  {data?.answer}
                </div>
                <div
                  className={`${styles.accordionbodybtn} d-flex gap-2 align-items-center`}
                >
                  <Image
                    src={"/assets/whatsapp_blue.png"}
                    width={20}
                    height={20}
                    alt="logo"
                  />
                  <a target="_blank" href="https://wa.me/917075008561"><h6 className="m-0">Chat on WhatsApp</h6></a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <SubBanner
          title={"Find Out If Your Child"}
          spantitle={"Needs a Pediatric Eye Checkup"}
          content={
            "If your child has symptoms like squinting, blurred vision, watering, eye rubbing, or poor focus, book a consultation with Pixel Eye Hospital for a detailed eye evaluation."
          }
          bgcolor={"#f4faff"}
          spancolor={"#5382b0"}
          bordercolor={"#2f74b1"}
          btn_bgcolor={"#2f74b1"}
          btn_name={"Book Appointment Now"}
          img={"/assets/fitforyou.webp"}
          imgheight={250}
          imgwidth={250}
          handleTogglecontactForm={handleTogglecontactForm}
          scale={1.6}
          height={"210px"}
          btn_txtcolor={"#fff"}
          isicons={false}
          isimg={false}
        />
        <div className="mt-5 pt-4 border-top">
          <div className="row g-4">
            <div className="col-md-6">
              <div className={styles.branchCard}>
                <h5 className="mb-3">Branch 1: Kukatpally</h5>
                <p className="small mb-0">
                  Pixel Eye Hospital<br />
                  Fourth Floor, Commercial Complex PNR Highnest,<br />
                  1-2-22/PNRHN/3/B, Dharma Reddy Colony Phase II,<br />
                  Kukatpally Housing Board Colony, Hyderabad, Telangana 500085
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className={styles.branchCard}>
                <h5 className="mb-3">Branch 2: Sanath Nagar</h5>
                <p className="small mb-0">
                  TRT 1190, Ground Floor, Bansal Residency,<br />
                  Beside Sanath Nagar Police Station,<br />
                  Sanath Nagar Main Road, Hyderabad, Telangana 500018
                </p>
              </div>
            </div>

            {/* Flexible CTAs aligned with text margins */}
            <div className="col-12 mt-5">
              <div className={`${styles.footercta} d-flex flex-column flex-md-row gap-3`}>
                <Button
                  href={"tel:+917075008561"}
                  name={"Call 7075008561"}
                  bgcolor={"#ff6f61"}
                  txtcolor={"#ffff"}
                  isicon={true}
                  icon={"phone"}
                  iconcolor={"#fff"}
                />
                <Button
                  href={"https://wa.me/917075008561"}
                  name={"Chat on WhatsApp"}
                  bgcolor={"#21a179"}
                  txtcolor={"#ffff"}
                  isimg={true}
                  imgicon={"/assets/whatsapp.png"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
