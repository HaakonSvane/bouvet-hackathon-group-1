import { PersonId } from "@/types"

type PersonChoiceProps = {
    personIds: PersonId[];
    onPersonChoice: (personId: PersonId) => void;
}

export const PersonChoiceProps = (props: PersonChoiceProps) => {
    return (
        <div className="flex flex-col">
            {props.personIds.map((personId) => (
                <button
                    key={personId}
                    className="px-4 py-2 bg-green"
                    onClick={() => props.onPersonChoice(personId)}
                >
                    {personId}
                </button>
            ))}
        </div>
    )
};