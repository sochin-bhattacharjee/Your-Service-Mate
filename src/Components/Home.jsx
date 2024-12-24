import { Helmet } from "react-helmet";
import Banner from "./Banner";
import PopularServices from "./PopularServices";


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
        </div>
    );
};

export default Home;