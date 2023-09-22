import { ChatNode } from "@/types"

export const Message = (props: {chatNode: ChatNode}) => {
    return (
        <div className="px-4 py-2 bg-green">
            <p>{props.chatNode.text}</p>
        </div>
    )
}