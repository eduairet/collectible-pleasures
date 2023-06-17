interface ErrorProps {
    errorMessage: string;
}

export default function ErrorDialog(props: ErrorProps) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{props.errorMessage}</span>
        </div>
    )
};