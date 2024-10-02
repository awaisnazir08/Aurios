import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
    return (
        <>
            <div>
                <p>Landing Page(Protected)</p>
                <UserButton />
            </div>
        </>
    )
}

export default DashboardPage;
