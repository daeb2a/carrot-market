import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { Stream } from "stream";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface CreateStreamResponse {
  ok: boolean;
  stream: Stream;
}

interface CreateStreamForm {
  name: string;
  price: number;
  description: string;
}

const Create: NextPage = () => {
  const router = useRouter();
  const [createStream, { data, loading }] = useMutation<CreateStreamResponse>(`/api/streams`);
  const { register, handleSubmit } = useForm<CreateStreamForm>();
  const onValid = (form: CreateStreamForm) => {
    if (loading) return;
    createStream(form);
  }
  useEffect(() => {
    if(data && data.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data])
  return (
    <Layout canGoBack title="Go Live">
      <form onSubmit={handleSubmit(onValid)} className=" space-y-4 py-10 px-4">
        <Input
          register={register("name", { required: true })}
          required
          title="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          required
          title="Price"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea
          register={register("description", { required: true })}
          name="description"
          label="Description"
        />
        <Button text={loading ? "Loading..." : "Go live"} />
      </form>
    </Layout>
  );
};

export default Create;
