import { Helmet } from "react-helmet";
import Banner from "./Banner";
import PopularServices from "./PopularServices";
import Feedback from "./Feedback";
import WhyChoose from "./WhyChoose";
import ContactMe from "./ContactMe";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Your Service Mate | Home</title>
            </Helmet>
            <div>
                <Banner></Banner>
            </div>
            <div>
                <PopularServices></PopularServices>
            </div>
            <div>
                <WhyChoose></WhyChoose>
            </div>
            <div>
                <Feedback></Feedback>
            </div>
            <div>
                <ContactMe></ContactMe>
            </div>
        </div>
    );
};

export default Home;