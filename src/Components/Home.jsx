import { Helmet } from "react-helmet";
import Banner from "./Banner";
import PopularServices from "./PopularServices";
import Feedback from "./Feedback";


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
                <Feedback></Feedback>
            </div>
        </div>
    );
};

export default Home;