export default function AdminPageSection({ children, title }: Readonly<{ children: React.ReactNode, title: string }>) {
    return <div className="flex flex-col gap-3">
        <div>
            <h1 className="text-2xl font-semibold text-orange-400">{title}</h1>
        </div>
        <div>
            {children}
        </div>
    </div>
}