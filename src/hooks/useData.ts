import { OpenAIClient, AzureKeyCredential, ChatMessage } from "@azure/openai";
import { useState, useMemo, useEffect } from "react";
import { ChatNode, persons, PersonId } from "../types";

const client = new OpenAIClient(
  "https://hackathon-group1-openai.openai.azure.com/",
  new AzureKeyCredential("6fe5dccc9efd4298b9287f44100df5f5")
);

export const useData = () => {

 const [messages, setMessages] = useState<ChatNode[]>([{
    id: 'root',
    parentId: null,
    personId: null,
    title: 'Jordbær',
    text: 'Jordbær',
  }]);

  const [selectedId, setSelectedId] = useState<string>('root');

  const selectedNode = useMemo(() => {
    return messages.find(m => m.id === selectedId);
  }, [messages, selectedId])

  const nodeChildren = useMemo(() => {
    return messages.filter(m => m.parentId === selectedId);
  }, [messages, selectedId]);

  /** Get full text for node based on title */
  const getText = async (message: ChatNode) => {
    if (message.parentId === null) return;
    if (message.personId === null) return;
    const history: string[] = [];
    let current: ChatNode | undefined = message;
    while(current && current.parentId !== null) {
      current.text && history.push(current.text);
      current = messages.find(m => m.id === current?.parentId);
    }
    const promptHistory = history.map((h): ChatMessage => ({content: h, role: 'assistant'}));
    const { choices } = await client.getChatCompletions(
      "exploring-for-kids", [
        {content: persons[message.personId].contentPrompt, role: 'system'},
        { content: current?.text ?? null, role: 'user'},
        ...promptHistory,
        {content: `Tell me more about "${message.title}"`, role: 'user'}
    ]);
    setMessages(m => m.map((mm) => (
      mm.id === message.id
        ? {...mm, text: choices?.[0]?.message?.content ?? null}
        : mm
      )));
  }

  /** Get and set child nodes of current node with given user */
  const getNextTitles = (message: ChatNode, userId: PersonId) => {
    return null;
  }

  const getPrompt = async () => {
    const { id, created, choices, usage } = await client.getChatCompletions(
      "exploring-for-kids", [
      { content: 'Test', role: 'system' }
    ]);
    console.log({ id, created, choices, usage });
  }

  useEffect(() => {
    getPrompt();
  }, []);

  return {
    /** Full list of nodes */
    messages,
    /** Active node */
    selectedNode,
    /** Children of active node */
    nodeChildren,
    /** Get the text for a given node */
    getText,
    /** Get the three options for the given node with the given person */
    getNextTitles,
  };

}
