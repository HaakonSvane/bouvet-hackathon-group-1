import { PersonId } from '@/types';
import { Avatar, Typography } from '@mui/joy';
import { personAvatars } from '@/constants/userAvatars';
import styled from '@emotion/styled';
import { personIdToImageSrc } from '@/constants/personIdToSrc';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 5rem;

    gap: 3rem;

    button {
        scale: 1.8;
    }
`;

type PersonChoiceProps = {
    personIds: PersonId[];
    onPress: (personId: PersonId) => void;
    disabled?: boolean;
};

export const PersonChoice = (props: PersonChoiceProps) => {
    console.log("PersonChoice")
    return (
        <>
            <Typography level="h1">Select something</Typography>
            <FlexRow>
                {props.personIds.map((personId) => (
                    <button
                        key={personId}
                        onClick={() => {
                            props.onPress(personId);
                        }}
                        disabled={props.disabled}
                    >
                        <Avatar src={personIdToImageSrc[personId]} />
                    </button>
                ))}
            </FlexRow>
        </>
    );
};
