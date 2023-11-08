import Navbar from "./Navbar";

const LayoutPage = (props) => {
    return <div className={"dashboard-page"}>
        <Navbar />
        {props.children}
    </div>
}

export default LayoutPage;