import { Link } from "react-router-dom";
import Container from "../shared/Container";

const Error = () => {
  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-md text-center">
          <h1 className="text-7xl font-extrabold text-red-600 sm:text-9xl">
            404
          </h1>
          <p className="mt-4 text-2xl font-semibold text-gray-800 sm:text-3xl">
            Page Not Found
          </p>
          <p className="mt-2 text-gray-600 text-base sm:text-lg">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-blue-700 transition duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Error;
