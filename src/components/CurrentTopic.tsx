import { Divider, Typography, Card } from "@mui/joy";

type CurrentTopicProps = {
    topic: string;
}

export const CurrentTopic = ({
    topic
}: CurrentTopicProps) => {
    return (
        <Card variant="plain" color="primary" className="z-10 fixed">
            <Typography>Current Topic:</Typography>
            <Typography level="h2">{topic}</Typography>
        </Card>
    )
}