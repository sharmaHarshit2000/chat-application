import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const ChatPage = () => {
    const [chats, setChats] = useState([])

    const fetchChats = async () => {
        const { data } = await axios.get("/api/chat");
        setChats(data);
    }

    useEffect(() => {
        fetchChats()
    }, [])

    return (
        <>
            {
                chats.map((chat) => (
                    <div key={chat._id}>
                        {chat.chatName}
                    </div>
                ))
            }
        </>
    )
}

export default ChatPage;