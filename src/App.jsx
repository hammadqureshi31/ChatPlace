import Details from "./components/detail/Details";
import List from "./components/list/List";
import useWindowResize from "./custom hooks/WindowResize";
import Chat from "./components/chats/Chat.jsx";
import Login from "./components/authentication/Login.jsx";
import Signup from "./components/authentication/Signup.jsx";
import { firebaseAuth, useFirebase } from "./firebase/Firebase.jsx";
import { useUserStore } from "./zustand/userStore.js";
import { useChatStore } from "./zustand/chatStore.js";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Notification from "./components/notification/Notification.jsx";

const App = () => {
  const { width } = useWindowResize();
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();
  const firebase = useFirebase();
  const [showChat, setShowChat] = useState(false);
  const [showDetail, setShowDetail] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showList, setShowList] = useState(false);
  const chat = useSelector(state => state)
  const detail = useSelector(state => state)
  const sign = useSelector(state => state)
  const login = useSelector(state => state)
  const maxW = (width - 25);
  console.log(maxW)
  const maxMD = (width - 100);



  useEffect(() => {
    console.log(firebase.user)
    if (sign.signupPage || firebase.user) {
      console.log("firebase user")
      setShowLogin(true)
      if (login.loginPage) {
        setShowList(true)
        if (chat.display) {
          setShowChat(true)
          if (detail.details) {
            setShowDetail(true)
          }
          else {
            setShowDetail(false)
          }
        }
        else {
          setShowChat(false)
        }
      }
      else {
        setShowList(false)
      }
    }
    else {
      setShowLogin(false)
    }
  }, [sign.signupPage, login.loginPage, chat.display, detail.details, firebase.user]);


  return (
    <>
      <div className={`${width < 640 ? 'flex justify-center pt-7 h-full w-full' : 'flex justify-center text-center h-full w-full mt-8'}`}>
        <div className={`container h-[580px] flex flex-col md:w-[w${maxMD}px]`}
          style={{ width: `${maxW}px`, ...(width > 786 && { maxWidth: `${maxMD}px` }) }}>
          {(width <= 768) ? showLogin ?
            (showList ?
              (showChat ?
                (showDetail ? <Details /> : <Chat />)
                :
                <List />
              )
              :
              <Login />
            )
            :
            (<Signup />)
            :
            showLogin ?
              (showList ?
                <div className="flex justify-between">
                  <List className='flex flex-1' />
                  <Chat className='flex flex-2' />
                  <Details className='flex flex-1' />
                </div>
                :
                <Login />
              )
              :
              (<Signup />)
          }
          <Notification />
        </div>
      </div>
    </>
  );
}

export default App;

