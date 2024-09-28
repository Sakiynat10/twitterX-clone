import Auth from "../../../components/auth";


export default function Page() {
    const user = false;
    if(!user) return(
        <div className={"container pl-4 pr-4 h-screen mx-auto max-w-7xl"}>
            <Auth/>
        </div>
    )
    return <div>Page</div>;
}