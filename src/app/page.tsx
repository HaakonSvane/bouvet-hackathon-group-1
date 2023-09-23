'use client';
import { useData } from '../hooks/useData';
import { Fragment } from 'react';
import NodeRenderer from '@/components/NodeRenderer';

export default function Home() {
    const {
        getNextTitles,
        getText,
        nodes,
        selectedNode,
        selectedNodeChildren,
        nodeChain,
    } = useData();

    return (
        <main>
            <div className="flex min-h-screen py-10">
                <div className="flex flex-col items-start justify-end">
                      {[...nodeChain].map((node) => {
                        return (
                            <Fragment key={node.id}>
                                <NodeRenderer
                                    node={node}
                                    selectedNode={selectedNode}
                                    selectedNodeChildren={selectedNodeChildren}
                                    getNextTitles={getNextTitles}
                                    getText={getText}
                                    />
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
