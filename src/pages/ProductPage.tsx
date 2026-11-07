import { useParams } from "react-router";
import Container from "../components/Container";

function ProductPage() {
  const { id } = useParams();

  return (
    <Container>
      <h1 className="text-2xl font-bold">Product #{id}</h1>
      <p className="mt-2 text-gray-600">Product details will be here.</p>
    </Container>
  );
}

export default ProductPage;