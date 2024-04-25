import { ClimbingBoxLoader } from "react-spinners";
import "./LoadingScreen.css";
import Jumbotron from "./components/Jumbotron";

const LoadingScreen = () => {
    return (
        <>
            <Jumbotron title="Lorem ipsum" />
            <div className="row mt-4">
                <div className="col">
                    <div className="loading-wrapper">
                        <ClimbingBoxLoader />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoadingScreen;
