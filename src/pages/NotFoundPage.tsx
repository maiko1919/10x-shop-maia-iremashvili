import { Link } from "react-router";
import Container from "../components/Container";

function NotFoundPage() {
  return (
    <Container>
      <div className="py-16 text-center">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="mt-2 text-gray-600">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700"
        >
          Go to catalog
        </Link>
      </div>
    </Container>
  );
}

export default NotFoundPage;