"use client";
import { useGetPokemonQuery } from "@/redux/api/pokeAPi";
import { OpenAIClient, AzureKeyCredential, ChatMessage } from "@azure/openai";
import { Table, Typography } from "@mui/joy";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { ChatNode, persons, PersonId } from "../types";

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
      <Typography level="h1">Hello world</Typography>
      {isFetching && <Typography level="h2">Fetching data...</Typography>}
      {pokemon && <div className="flex justify-row items-center">
        <Typography level="h4">{pokemon?.name}</Typography>
        <Image src={pokemon?.sprites.front_default} alt="bulbasaur" width={50} height={50} />
      </div>}

      <Table aria-label="basic table">
      <thead>
        <tr>
          <th style={{ width: '40%' }}>Dessert (100g serving)</th>
          <th>Calories</th>
          <th>Fat&nbsp;(g)</th>
          <th>Carbs&nbsp;(g)</th>
          <th>Protein&nbsp;(g)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Frozen yoghurt</td>
          <td>159</td>
          <td>6</td>
          <td>24</td>
          <td>4</td>
        </tr>
        <tr>
          <td>Ice cream sandwich</td>
          <td>237</td>
          <td>9</td>
          <td>37</td>
          <td>4.3</td>
        </tr>
        <tr>
          <td>Eclair</td>
          <td>262</td>
          <td>16</td>
          <td>24</td>
          <td>6</td>
        </tr>
        <tr>
          <td>Cupcake</td>
          <td>305</td>
          <td>3.7</td>
          <td>67</td>
          <td>4.3</td>
        </tr>
        <tr>
          <td>Gingerbread</td>
          <td>356</td>
          <td>16</td>
          <td>49</td>
          <td>3.9</td>
        </tr>
      </tbody>
    </Table>

    </main>
  )
}
