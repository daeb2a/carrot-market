import type { NextPage } from "next";
import Button from "../../components/button";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";

const Write: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="px-4 py-10">
        <TextArea placeholder="Ask a Question!" required />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;