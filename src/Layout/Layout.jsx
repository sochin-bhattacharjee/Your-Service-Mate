import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar></Navbar>
            <div className='flex-grow'>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;