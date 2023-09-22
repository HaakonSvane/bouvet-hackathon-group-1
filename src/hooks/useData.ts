import { OpenAIClient, AzureKeyCredential, ChatMessage } from '@azure/openai';
import { useState, useMemo, useEffect } from 'react';
import { ChatNode, persons, PersonId } from '../types';
import { nanoid } from 'nanoid';

const client = new OpenAIClient(
  'https://hackathon-group-1-openai.openai.azure.com/',
  new AzureKeyCredential('1eb5ccc14de64ccca44cce747d9c8c42'),
  
);

// deployment-id: exploring-for-kids

// api key: 1eb5ccc14de64ccca44cce747d9c8c42

export const useData = () => {
    const [nodes, setNodes] = useState<ChatNode[]>([
        {
            id: 'root',
            parentId: null,
            personId: null,
            title: 'Strawberry',
            text: 'Strawberry',
        },
    ]);

  const [selectedId, setSelectedId] = useState<string>('root');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectedNode = useMemo(() => {
    return nodes.find((m) => m.id === selectedId);
  }, [nodes, selectedId]);

  const selectedNodeChildren = useMemo(() => {
    return nodes.filter((m) => m.parentId === selectedId);
  }, [nodes, selectedId]);

  const getHistory = (node: ChatNode) => {
    const history: string[] = [];
    let current: ChatNode | undefined = node;
    while (current && current.parentId !== null) {
      current.text && history.push(current.text);
      current = nodes.find((m) => m.id === current?.parentId);
    }
    const promptHistory = history.map(
      (h): ChatMessage => ({ content: h, role: 'assistant' })
    );
    return [
      { content: current?.text ?? null, role: 'user' },
      ...promptHistory,
    ];
  }

  /** Get full text for node based on title */
  const getText = async (node: ChatNode) => {
    if (node.parentId === null) return;
    if (node.personId === null) return;
    setIsLoading(true);
    const promptHistory = getHistory(node);
    const { choices } = await client.getChatCompletions(
      'exploring-for-kids',
      [
        {
          content: persons[node.personId].contentPrompt,
          role: 'system',
        },
        ...promptHistory,
        {
          content: `Tell me more about "${node.title}"`,
          role: 'user',
        },
      ]
    );
    setNodes((m) =>
      m.map((mm) =>
        mm.id === node.id
          ? { ...mm, text: choices?.[0]?.message?.content ?? null }
          : mm
      )
    );
    setSelectedId(node.id);
    setIsLoading(false);
  };

  /** Get and set child nodes of current node with given user */
  const getNextTitles = async (node: ChatNode, userId: PersonId) => {
    if (node.parentId === null) return;
    if (node.personId === null) return;
    setIsLoading(true);
    const promptHistory = getHistory(node);
    let children: string[] = [];
    let retries = 0;
    while (children.length === 0 && retries++ < 3) {
      const { choices } = await client.getChatCompletions(
        'exploring-for-kids',
        [
          {
            content: persons[node.personId].childrenPrompt,
            role: 'system',
          },
          ...promptHistory,
        ]
      );
      const json = choices?.[0]?.message?.content;
      if (!json) continue;
      try {
        const obj = JSON.parse(json);
        const strings: string[] = obj.content.facts;
        if (strings.some(e => typeof e !== 'string')) continue;
        children = strings;
      } catch (e) {
        console.error(e);
      }
    }

    setNodes((m) => ([
      ...m,
      ...children.map((c): ChatNode => ({
        id: nanoid(),
        parentId: node.id,
        personId: userId,
        text: null,
        title: c,
      }))])
    );
    setIsLoading(false);
  };

  const getPrompt = async () => {
    const { id, created, choices, usage } = await client.getChatCompletions(
      'exploring-for-kids',
      [{ content: 'Test', role: 'system' }]
    );
    console.log({ id, created, choices, usage });
  };

  useEffect(() => {
    getPrompt();
  }, []);

  return {
    /** Full list of nodes */
    nodes,
    /** Active node */
    selectedNode,
    /** Children of active node */
    selectedNodeChildren,
    /** Get the text for a given node */
    getText,
    /** Get the three options for the given node with the given person */
    getNextTitles,
    /** True if fetching data from azure */
    isLoading,
  };
};
