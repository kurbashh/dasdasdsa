import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
function ListPage(){
    return (
        <div className="main__page__container">
            <nav className="navigation__wrapper">
                <Navigation />
            </nav>
            <main className="new__main__wrapper">
                <Outlet />
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default ListPage;