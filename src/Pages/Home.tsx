import Banner from "../components/Home/Banner"
import BusinessSupport from "../components/Home/BusinessSupport"
// import Engage from "../components/Home/Engage"
import Faq from "../components/Home/Faq"
import FreeTrial from "../components/Home/FreeTrial"
import Keyfeatures from "../components/Home/Keyfeatures"
import SmarterWay from "../components/Home/SmarterWay"



const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Banner />
      <SmarterWay />
      <BusinessSupport />
      {/* <Engage /> */}
      <Keyfeatures />
      <Faq/>
      <FreeTrial/>
    </div>
  )
}

export default Home