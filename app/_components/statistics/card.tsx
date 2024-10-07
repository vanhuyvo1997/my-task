export default function Card({ title, children }: Readonly<{ title: React.ReactNode, children: React.ReactNode }>) {
    return <div className="bg-gray-200 py-1 px-2 rounded-md w-full">
        <div className="text-lg p-1 text-left">
            {title}
        </div>
        <div className="bg-gray-100 rounded-md p-2 text-center text-lg">
            {children}
        </div>
    </div>
}