import Message from "@components/message";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { ChatMessages, ChatRoom, User } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface ChatRoomWithMessages extends ChatRoom {
  chatMessages: ChatMessages[];
  host: User;
  invited: User;
}

interface ChatMessagesResponse {
  ok: boolean;
  chatRoom: ChatRoomWithMessages;
}

interface MessageForm {
  message: string;
}

const ChatDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const {
    data: messageData,
    mutate
  } = useSWR<ChatMessagesResponse>(
    router.query.id ? `/api/chats/${router.query.id}` : null
  );
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const [sendMessage, { data, loading }] = useMutation(`/api/chats/${router.query.id}/messages`);
  const onValid = (form: MessageForm) => {
    if (!messageData) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...messageData,
          chatRoom: {
            ...messageData.chatRoom,
            chatMessages: [
              {
                message: form,
                createdAt: Date.now(),
                userId: user?.id,
              },
              ...messageData.chatRoom.chatMessages,
            ],
          },
        } as any),
      false
    );
    console.log(...messageData.chatRoom.chatMessages);
    if (loading) return;
    sendMessage(form);
  };
  return (
    <div className="py-10 px-4 space-y-4">
      <>
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