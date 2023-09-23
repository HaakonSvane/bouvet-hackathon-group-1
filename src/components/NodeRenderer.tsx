import { ChatNode, PersonId } from '@/types';
import React, { FC } from 'react';
import { Message } from './Message';
import { PersonChoice } from './PersonChoice';
import { TextChoice } from './TextChoice';
import { CurrentTopic } from './CurrentTopic';

interface Props {
    node: ChatNode;
    selectedNode: ChatNode | undefined;
    selectedNodeChildren: ChatNode[];
    getNextTitles: (node: ChatNode, userId: PersonId) => void;
    getText: (node: ChatNode) => void;
}

const NodeRenderer: FC<Props> = ({
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
        <div>
            <div>
                {!isRoot && <Message chatNode={node} />}
                {isCurrent && !hasChildren && (
                    <PersonChoice
                        personIds={['teacher', 'dad', 'fakeNews']}
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
                    />
                )}
        
            </div>      
        </div>
    );
};

export default NodeRenderer;
