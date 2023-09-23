'use client';
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { Message } from '@/components/Message';
import { PersonChoice } from '@/components/PersonChoice';
import { useData } from '../hooks/useData';
import styled from '@emotion/styled';
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

    console.log(nodes);
    console.log(selectedNodeChildren)
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
