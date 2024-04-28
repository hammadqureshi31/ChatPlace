import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setChatDisplay } from '../../Redux/slices/displaySlice';
import { db } from '../../firebase/Firebase';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useUserStore } from '../../zustand/userStore';
import { useChatStore } from '../../zustand/chatStore';

const ChatList = () => {
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const [seen, setSeen] = useState(null)

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();
  console.log("I am current user", currentUser)

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unsub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    dispatch(setChatDisplay(true));

    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;
    userChats[chatIndex].isSeen ? setSeen(true) : setSeen(false)

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className={`flex-col gap-2 overflow-y-auto pr-1`}>
      {filteredChats.map((chat) => (
        <div key={chat.chatId} onClick={() => handleSelect(chat)}>
          <div className={'flex gap-4 mb-2 mt-2'}>
            <div>
              <img
                src={chat.user.avatar || "./avatar.png"}
                alt=""
                className='w-12 h-12 rounded-full '
              />
            </div>
            <div className='mt-1'>
                <h1>{chat.user.username}</h1>
                <p className='text-xs font-extralight pt-0.5'>{chat.lastMessage}</p>
            </div>
          </div>
          <hr className='opacity-15' />
        </div>
      ))}
    </div>
  );
}

export default ChatList;
