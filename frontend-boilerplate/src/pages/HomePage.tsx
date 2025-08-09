import { Link } from "react-router";

function HomePage() {
    return (
        <div className="page-container">
            <div className="home-content">
                <h1 className="home-title">
                    Folio Attendance System
                </h1>
                <div className="button-group">
                    <Link to="/login" className="btn-base btn-blue">
                        Login (Coming Soon)
                    </Link>
                    <Link to="/signup" className="btn-base btn-purple">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;