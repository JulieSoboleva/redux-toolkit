interface IRatingProps {
    data: {
        Source: string,
        Value: string,
    },
}

export default function Rating({ data }: IRatingProps) {
    return (
        <>
            <span>{data.Source} : {data.Value}</span>
            <br/>
            <br/>
        </>
    );
}
