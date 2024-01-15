import { FC } from 'react';

interface LoggerProps {
    message?: string;
}

const LoggerHOC = <T extends object>(WrappedComponent: FC<T>): FC<T & LoggerProps> => {
    return ({ message, ...props }) => {
        console.log(`${message ? message : 'Hello from'} ${WrappedComponent.name}`);
        return <WrappedComponent {...props as T} />;
    };
};

export default LoggerHOC;
