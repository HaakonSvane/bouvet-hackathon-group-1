import { PersonId } from '@/types';
import { Avatar, Typography } from '@mui/joy';
import { personIdToImageSrc } from '@/constants/personIdToSrc';

type PersonChoiceProps = {
    personIds: PersonId[];
    onPress: (personId: PersonId) => void;
    disabled?: boolean;
};

export const PersonChoice = (props: PersonChoiceProps) => {
    return (
        <div className="flex flex-col gap-4">
            <>
                <Typography level="h3">Select person to explain</Typography>
            </>
            <div
                className="flex flex-row gap-6"
                style={{ justifyContent: 'center' }}
            >
                {props.personIds.map((personId) => (
                    <button
                        key={personId}
                        onClick={() => {
                            props.onPress(personId);
                        }}
                        disabled={props.disabled}
                    >
                        <Avatar size="lg" src={personIdToImageSrc[personId]} />
                    </button>
                ))}
            </div>
        </div>
    );
};
