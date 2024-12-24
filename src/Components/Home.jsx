import { Helmet } from "react-helmet";
import Banner from "./Banner";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Your Service Mate | Home</title>
            </Helmet>
            <div>
                <Banner></Banner>
            </div>
        </div>
    );
};

export default Home;