import { ChatNode, PersonId } from '@/types';
import { Avatar, Typography } from '@mui/joy';
import { personAvatars } from '@/constants/userAvatars';
import styled from '@emotion/styled';
import { personIdToImageSrc } from '@/constants/personIdToSrc';
import { FC } from 'react';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 5rem;

    gap: 3rem;
`;

type Props = {
    personId: PersonId;
    onPress: (node: ChatNode) => void;
    childrenNode: ChatNode[];
    disabled?: boolean;
};

export const TextChoice: FC<Props> = ({
    personId,
    onPress,
    childrenNode,
    disabled,
}) => {
    return (
        <>
            <Typography level="h1">Select something</Typography>
            <Avatar src={personIdToImageSrc[personId]} />

            <FlexRow>
                {childrenNode.map((node) => (
                    <button
                        key={node.id}
                        onClick={() => onPress(node)}
                        disabled={disabled}
                    >
                        {node.title || 'Test'}
                    </button>
                ))}
            </FlexRow>
        </>
    );
};
