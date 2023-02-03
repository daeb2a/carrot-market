import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Review } from "@prisma/client";
import { useRouter } from "next/router";
import Input from "@components/input";

interface ReviewForm {
  score: number;
  review: string;
}

interface ReviewResponse {
  ok: boolean;
  review: Review;
}

const Review: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ReviewForm>();
  const [ createReview, { loading, data } ] = useMutation<ReviewResponse>("/api/reviews");
  const onValid = (data: ReviewForm) => {
    if (loading) return;
    createReview({
      ...data,
      createdById: Number(router.query.createById),
      createdForId: Number(router.query.createForId),
    });
  }
  useEffect(() => {
    if(data && data.ok) {
      router.push("/");
    }
  }, [data, router])
  return (
    <Layout title="Write A Review" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10">
        <Input
          required={true}
          type="number"
          name="rating"
          register={register("score", {
            required: true,
            pattern: /^[1-5]+$/,
            minLength: 1,
            maxLength: 1,
            valueAsNumber: true,
          })}
          title="Rating : 1 ~ 5"
        />
        <TextArea
          register={register("review", {
            required: true,
            minLength: 5,
          })}
          required
          placeholder="Write A Review!"
        />
        <Button text={loading ? "Loading..." : "Submit"} />
      </form>
    </Layout>
  );
};

export default Review;