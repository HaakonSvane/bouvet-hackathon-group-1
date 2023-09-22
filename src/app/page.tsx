'use client';
import styled from '@emotion/styled';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Avatar,
    MessageModel,
} from '@chatscope/chat-ui-kit-react';
import { userAvatars } from '@/constants/userAvatars';
import { useCallback, useState } from 'react';

const MainWrp = styled.main`
    padding: 1rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

interface ExtendedMessageModel extends MessageModel {
    avatarSrc: string;
}

export default function Home() {
    // * store -------------------------------------------------------------------------

    // * state  ------------------------------------------------------------------------
    const [messages, setMessages] = useState<ExtendedMessageModel[]>([]);

    // * functions ---------------------------------------------------------------------
    const handleOnSend = useCallback((message: string) => {
        setMessages((messages) => [
            ...messages,
            {
                message,
                sentTime: new Date().toLocaleTimeString(),
                sender: 'me',
                direction: 'outgoing',
                position: 'single',
                avatarSrc: userAvatars.user1.src,
            },
        ]);
    }, []);

    // * effects -----------------------------------------------------------------------

    return (
        <MainWrp>
            <div style={{ position: 'relative', height: '500px', flex: 1 }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList>
                            {messages.map((message, index) => (
                                <Message key={index} model={message}>
                                    <Avatar
                                        src={message.avatarSrc}
                                        name={message.sender}
                                        status="available"
                                    />
                                </Message>
                            ))}
                        </MessageList>
                        <MessageInput
                            placeholder="Type message here"
                            onSend={handleOnSend}
                        />
                    </ChatContainer>
                </MainContainer>
            </div>
        </MainWrp>
    );
}
