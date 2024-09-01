import { Alert } from "antd";

interface IErrorProps {
    error: string,
}

export default function ErrorMessage({ error }: IErrorProps) {
    return (
        <div className='message__container'>
            <Alert message={error} type='error' />
        </div>
    );
}