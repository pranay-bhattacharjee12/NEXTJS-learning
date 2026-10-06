export default function ({ children }: {
    children: React.ReactNode
}) {
    return <div>
        <div className="border-b text-center bg-gray-100 px-4">
            20% off for next 5 days    
        </div>
        {children}
    </div>
}

//this layout is worked as header for the auth route.
//under auth what the folder avilable in all route this thing will render at top under main header layout.