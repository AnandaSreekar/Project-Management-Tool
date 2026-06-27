import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div className="auth-page">

            <div className="auth-card">

                <h1>404</h1>

                <h2>Page Not Found</h2>

                <p className="subtitle">
                    The page you are looking for doesn't exist.
                </p>

                <Link to="/">
                    <button className="primary-btn">
                        Go to Login
                    </button>
                </Link>

            </div>

        </div>

    );

}

export default NotFound;