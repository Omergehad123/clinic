import Footer from "../components/layout/Footer";
import Header from "./component/Header";

export default function websiteLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}