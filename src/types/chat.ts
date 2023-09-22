export type ChatNode = {
    id: string;
    parentId: string;
    text: string;
    personId: PersonId;
}

export const Persons = {
    "pirate" : "The scary pirate",
};

export type PersonId = keyof typeof Persons;