import { PropsWithChildren } from "react";

interface ButtonProps {
    onClick: () => void,
    type?: 'button' | 'submit' | 'reset',
}

export default function Button(props: PropsWithChildren<ButtonProps>) {
    return (
        <button
            className="border-2 border-white rounded-md px-4 py-2"
            onClick={props.onClick}
            type={props.type || 'button'}
        >
            {props.children}
        </button>
    )
}