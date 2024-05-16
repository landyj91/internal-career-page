import NavBar from "./NavBar";

export const PageLayout = (props) => {
    return (
        <>
            <NavBar />
            <br />
            <center>Welcome to the Microsoft Authentication Library For React Quickstart</center>
            <br />
            {props.children}
        </>
    );
};