'use client';
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { Message } from '@/components/Message';
import { PersonChoice } from '@/components/PersonChoice';
import { useData } from '../hooks/useData';
import styled from '@emotion/styled';
import { Fragment } from 'react';
import NodeRenderer from '@/components/NodeRenderer';

const client = new OpenAIClient(
    'https://hackathon-group1-openai.openai.azure.com/',
    new AzureKeyCredential('6fe5dccc9efd4298b9287f44100df5f5')
);

export default function Home() {
    const {
        getNextTitles,
        getText,
        nodes,
        selectedNode,
        selectedNodeChildren,
    } = useData();

    return (
        <main>
            <div className="flex min-h-screen py-10">
                <div className="flex flex-col">
                    {[...nodes].reverse().map((node) => {
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
