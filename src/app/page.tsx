'use client';
import { useData } from '../hooks/useData';
import { Fragment } from 'react';
import NodeRenderer from '@/components/NodeRenderer';
import { CurrentTopic } from '@/components/CurrentTopic';

export default function Home() {
    const {
        getNextTitles,
        getText,
        nodes,
        selectedNode,
        selectedNodeChildren,
        nodeChain,
    } = useData();

    const rootNode = nodes.at(0);
    return (
        <main>
            <div className="flex min-h-screen py-10 justify-center">
                <div className="flex flex-col items-center justify-between w-96">
                    {rootNode && <CurrentTopic topic={rootNode?.title} />}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            justifyContent: 'center',
                        }}
                    >
                        {[...nodeChain].map((node, i) => {
                            return (
                                <Fragment key={node.id}>
                                    <NodeRenderer
                                        index={i}
                                        node={node}
                                        selectedNode={selectedNode}
                                        selectedNodeChildren={
                                            selectedNodeChildren
                                        }
                                        getNextTitles={getNextTitles}
                                        getText={getText}
                                    />
                                </Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}
