import { MetaTitle } from "@/common/MetaTitle";
import HomePageComponent from "@/PageComponent/Home";

export default function Home() {
  return <>
    <MetaTitle
      title="Best Pediatric Ophthalmology Hospital in Hyderabad | Pixel Eye Hospital"
      description="Expert eye care for infants, kids & teenagers in Hyderabad. We specialize in squint, lazy eye, refractive errors and child-friendly eye evaluations by experienced specialists."
      keywords="best pediatric ophthalmology hospital in hyderabad, children eye care hyderabad, squint treatment for kids, lazy eye treatment, pediatric eye specialist hyderabad"
    />
    <HomePageComponent />
  </>
}