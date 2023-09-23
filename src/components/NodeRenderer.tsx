import { ChatNode, PersonId } from '@/types';
import React, { FC, Fragment } from 'react';
import styled from '@emotion/styled';
import { Message } from './Message';
import { PersonChoice } from './PersonChoice';
import { TextChoice } from './TextChoice';

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

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
    const isCurrent = node.id === selectedNode?.id;
    const hasChildren = selectedNodeChildren.length > 0;

    return (
        <>
            <FlexColumn>
                <Message chatNode={node} />
                {!isCurrent && node.text}
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
            </FlexColumn>
        </>
    );
};

export default NodeRenderer;
