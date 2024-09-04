import clsx from "clsx";
import Button from "./button";

export default function CompletedDropMark({
    status = 'expanded',
    onClick, numOfCompleted
}: Readonly<{
    status: "expanded" | "collapsed",
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    numOfCompleted: number,
}>) {
    return <Button onClick={onClick} className="w-fit bg-showtask-button-background-light dark:bg-showtask-button-background-dark flex items-center gap-3 px-2" size="sm">
        <span className={clsx(
            "block w-2 h-2 border-r-2 border-b-2 border-solid",
            status === "expanded" ? 'rotate-45 -translate-y-1/3' : '-rotate-45'
        )} ></span>
        <span>Completed {numOfCompleted}</span>
    </Button>
}