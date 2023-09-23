import { PersonId, persons } from '@/types';
import { Avatar, Typography } from '@mui/joy';
import { personIdToImageSrc } from '@/constants/personIdToSrc';

type PersonChoiceProps = {
    onPress: (personId: PersonId) => void;
    disabled?: boolean;
};

export const PersonChoice = (props: PersonChoiceProps) => {
    const personKeys = Object.keys(persons) as PersonId[];
    return (
        <div className="flex flex-col gap-4">
            <>
                <Typography level="h3">Select person to explain</Typography>
            </>
            <div
                className="flex flex-row gap-6"
                style={{ justifyContent: 'center' }}
            >
                {personKeys.map((personId) => {
                    return (
                        <button
                            title={persons[personId].name}
                            key={personId}
                            onClick={() => {
                                props.onPress(personId);
                            } }
                            disabled={props.disabled}
                        >
                            <Avatar size="lg" src={personIdToImageSrc[personId]} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
