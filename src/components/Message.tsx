'use client';
import { personIdToImageSrc } from '@/constants/personIdToSrc';
import { personIdToColor } from '@/constants/personToColor';
import { ChatNode } from '@/types';
import { Avatar } from '@mui/joy';
import styled from '@emotion/styled';

const MessageBox = styled.div<{ backgroundColor: string }>`
    padding: 0.5rem;
    background-color: ${(props) => props.backgroundColor};
    border-radius: 4px;
    color: white;
`;

export const Message = (props: { chatNode: ChatNode; index: number }) => {
    const isNodeIdAPair = props.index % 2 === 0;

    const personId = props.chatNode.personId ?? 'teacher';
    const bubbleColor = personIdToColor[personId];

    return (
        <div className="w-full" style={{ display: 'flex' }}>
            {isNodeIdAPair && (
                <MessageBox
                    backgroundColor={bubbleColor}
                    style={{ marginRight: '0.5rem' }}
                >
                    {props.chatNode.text}
                </MessageBox>
            )}
            <Avatar src={personIdToImageSrc[personId]} />
            {!isNodeIdAPair && (
                <MessageBox
                    backgroundColor={bubbleColor}
                    style={{ marginLeft: '0.5rem' }}
                >
                    {props.chatNode.text}
                </MessageBox>
            )}
        </div>
    );
};
