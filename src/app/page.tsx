"use client";
import { useGetPokemonQuery } from "@/redux/api/pokeAPi";
import { OpenAIClient, AzureKeyCredential, ChatMessage } from "@azure/openai";
import { useState, useMemo, useEffect } from "react";
import { ChatNode, persons, PersonId } from "../types";
import { Message } from "@/components/Message";
import { PersonChoice } from "@/components/PersonChoice";

const client = new OpenAIClient(
  "https://hackathon-group1-openai.openai.azure.com/",
  new AzureKeyCredential("6fe5dccc9efd4298b9287f44100df5f5")
);

export default function Home() {
 const [messages, setMessages] = useState<ChatNode[]>([{
    id: 'root',
    parentId: null,
    personId: 'root',
    title: 'Jordbær',
    text: 'Jordbær',
  }]);

  const [selectedId, setSelectedId] = useState<string>('root');

  const selectedMessage = useMemo(() => {
    return messages.find(m => m.id === selectedId);
  }, [messages, selectedId])

  /** Get full text for node based on title */
  const setMessage = async (message: ChatNode) => {
    if (message.parentId === null) return;
    const history: string[] = [];
    let current: ChatNode | undefined = message;
    while(current && current.parentId !== null) {
      current.text && history.push(current.text);
      current = messages.find(m => m.id === current?.parentId);
    }
    const promptHistory = history.map((h): ChatMessage => ({content: h, role: 'assistant'}));
    const { choices } = await client.getChatCompletions(
      "exploring-for-kids", [
        {content: persons[message.parentId].contentPrompt, role: 'system'},
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
  const getChoices = (message: ChatNode, userId: PersonId) => {

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
  const {data: pokemon, isFetching} = useGetPokemonQuery('bulbasaur');

  return (
    <main>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {messages.map(message => (
                <div key={message.id}>
                    <Message chatNode={message}/>
                    <PersonChoice personIds={["teacher", "teacher", "teacher"]} onPersonChoice={(id) => console.log(`Chose ${id}`)}/>
                </div>
            ))}
        </div>
    </main>
  )
}
