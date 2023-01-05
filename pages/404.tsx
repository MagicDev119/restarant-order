import Error from "next/error";
import { Layout } from "../components/layout/Layout";

function NotFound() {
  return (
    <Layout>
      <Error statusCode={404} />
    </Layout>
  );
}

export default NotFound;
