import Message from "@components/message";
import useMutation from "@libs/client/useMutation";
import { ChatRoom } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface ChatMessagesResponse {
  ok: boolean;
  chatRoom: ChatRoom[];
}

interface MessageForm {
  message: string;
}

const ChatDetail: NextPage = () => {
  const router = useRouter();
  const {
    data: messageData
  } = useSWR<ChatMessagesResponse>(
    router.query.id ? `/api/chats/${router.query.id}` : null
  );
  const { register, handleSubmit } = useForm<MessageForm>();
  const [sendMessage, { data, loading }] = useMutation(`/api/chats/${router.query.id}/messages`);
  const onValid = (form: MessageForm) => {
    if (loading) return;
    sendMessage(form);
  };
  return (
    <div className="py-10 px-4 space-y-4">
      <>
        {messageData?.chatRoom?.chatMessages.map((message) => (
          <Message key={message.createdAt} message={message.message} />
        ))}
      </>
      <div className="fixed w-full mx-auto max-w-md bottom-2 inset-x-0">
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex relative items-center"
        >
          <input
            {...register("message", { minLength: 1 })}
            type="text"
            className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:border-orange-500 pr-12"
          />
          <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
            <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 text-sm text-white hover:bg-orange-600 cursor-pointer">
              &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatDetail;