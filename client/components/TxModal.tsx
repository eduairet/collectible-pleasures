import { MouseEventHandler } from "react";

interface ModalProps {
    title: string;
    url: `https://${string}`;
    onClose: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

export default function Modal({ title, url, onClose }: ModalProps) {
    return (
        <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="absolute w-full h-full bg-black opacity-70"></div>
            <div className="p-4 text-center bg-black border-2 border-white w-[300px] mx-auto rounded z-50 flex flex-col">
                <div className="py-4 px-6">
                    <p className="text-2xl font-bold mb-6">{title}</p>
                    <p className="mb-6">Check your transaction{' '}
                        <a href={url} target="_blank" rel="noreferrer" className="italic underline hover:underline">
                            here
                        </a>
                    </p>
                    <button className="px-4 bg-black border-2 border-white p-3 rounded-lg text-white hover:bg-white hover:text-black" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}