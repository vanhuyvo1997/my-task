export default function Card({ title, children }: Readonly<{ title: React.ReactNode, children: React.ReactNode }>) {
    return <div className="bg-gray-200 dark:bg-gray-800 py-1 px-2 rounded-md w-full shadow-md border">
        <div className="text-lg p-1 text-left">
            {title}
        </div>
        <div className="bg-gray-50 dark:bg-gray-950 rounded-md p-2 text-center text-lg border">
            {children}
        </div>
    </div>
}