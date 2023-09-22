"use client";
import { useGetPokemonQuery } from "@/redux/api/pokeAPi";
import { OpenAIClient, AzureKeyCredential, ChatMessage } from "@azure/openai";
import { Message } from "@/components/Message";
import { PersonChoice } from "@/components/PersonChoice";

const client = new OpenAIClient(
  "https://hackathon-group1-openai.openai.azure.com/",
  new AzureKeyCredential("6fe5dccc9efd4298b9287f44100df5f5")
);

export default function Home() {

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
