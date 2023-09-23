import { ChatNode, PersonId } from '@/types';
import React, { FC } from 'react';
import { Message } from './Message';
import { PersonChoice } from './PersonChoice';
import { TextChoice } from './TextChoice';

interface Props {
    index: number;
    node: ChatNode;
    selectedNode: ChatNode | undefined;
    selectedNodeChildren: ChatNode[];
    getNextTitles: (node: ChatNode, userId: PersonId) => void;
    getText: (node: ChatNode) => void;
}

const NodeRenderer: FC<Props> = ({
    index,
    node,
    selectedNode,
    selectedNodeChildren,
    getNextTitles,
    getText,
}) => {
    // * state  ------------------------------------------------------------------------
    const isRoot = node.parentId === null;
    const isCurrent = node.id === selectedNode?.id;
    const hasChildren = selectedNodeChildren.length > 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {!isRoot && <Message chatNode={node} index={index} />}
            {isCurrent && !hasChildren && (
                <PersonChoice
                    onPress={(id) => {
                        getNextTitles(node, id);
                    }}
                    disabled={!isCurrent}
                />
            )}
            {isCurrent && hasChildren && (
                <TextChoice
                    personId={node.personId ?? 'teacher'}
                    onPress={(n) => getText(n)}
                    childrenNode={selectedNodeChildren}
                    disabled={!isCurrent}
                    selectedNodeChildren={selectedNodeChildren}
                />
            )}
        </div>
    );
};

export default NodeRenderer;
