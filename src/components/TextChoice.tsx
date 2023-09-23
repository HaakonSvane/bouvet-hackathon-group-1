import { ChatNode, PersonId } from '@/types';
import { Avatar, Card, Button, Typography } from '@mui/joy';
import { personAvatars } from '@/constants/userAvatars';
import { personIdToImageSrc } from '@/constants/personIdToSrc';
import { FC } from 'react';

type Props = {
    personId: PersonId;
    onPress: (node: ChatNode) => void;
    childrenNode: ChatNode[];
    disabled?: boolean;
    selectedNodeChildren: ChatNode[];
};

export const TextChoice: FC<Props> = ({
    personId,
    onPress,
    childrenNode,
    disabled,
    selectedNodeChildren,
}) => {
    const lastChild = childrenNode[childrenNode.length - 1];
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-8">
                <Typography level="h3">Select an interest</Typography>
                <Avatar
                    size="sm"
                    src={personIdToImageSrc[lastChild.personId ?? 'teacher']}
                />
            </div>
            <div className="flex flex-row gap-2">
                {childrenNode.map((node) => (
                    <Button
                        key={node.id}
                        onClick={() => onPress(node)}
                        disabled={disabled}
                    >
                        {node.title || 'Test'}
                    </Button>
                ))}
            </div>
        </div>
    );
};
