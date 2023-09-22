"use client";
import { personIdToImageSrc } from "@/constants/personIdToSrc";
import { personIdToColor } from "@/constants/personToColor"
import { ChatNode } from "@/types"
import { Avatar, Typography } from "@mui/joy"
import { useFloating, offset, arrow, FloatingArrow} from "@floating-ui/react";
import { useRef } from "react";

export const Message = (props: {chatNode: ChatNode}) => {

    const arrowRef = useRef(null);

    const {refs, floatingStyles, context} = useFloating({
        placement: "right-end",
        middleware: [
            offset(16),
            arrow({
                element: arrowRef
            })],
    });

    const personId = props.chatNode.personId ?? "teacher";
    const bubbleColor = personIdToColor[personId];

    return (
        <>
            <Avatar ref={refs.setReference} src={personIdToImageSrc[personId]}/>
            <div>
                <div ref={refs.setFloating} className="px-4 py-2 rounded-md max-w-md" style={{backgroundColor: bubbleColor, ...floatingStyles}}>
                    <Typography textColor="white">Here is some long ass text that I thought I should share with you. Here is some long ass text that I thought I should share with you.</Typography>                        
                    <FloatingArrow ref={arrowRef} fill={bubbleColor} context={context}/>
                </div>
            </div>
        </>
    )
}