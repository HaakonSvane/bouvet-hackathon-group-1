import { PersonId } from "@/types"
import { Avatar, Typography } from "@mui/joy";
import { userAvatars } from "@/constants/userAvatars";


const PersondIdToImageSrc: Record<PersonId, string> = {
    "teacher": userAvatars.user1.src,
}

type PersonChoiceProps = {
    personIds: PersonId[];
    onPersonChoice: (personId: PersonId) => void;
}

export const PersonChoice = (props: PersonChoiceProps) => {
    return (
        <>
        <Typography level="h1">Select something</Typography>
        <div className="flex flex-row">
            {props.personIds.map((personId) => (
                <button
                    key={personId}
                    className="px-4 py-2 bg-green"
                    onClick={() => props.onPersonChoice(personId)}
                >
                    <Avatar src={PersondIdToImageSrc[personId]}/>
                </button>
            ))}
        </div>
        </>
    )
};