import Image from "next/image";
import Button from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";

export default function Auth(){
    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen">
                <Image
                    src={"/images/x.svg"}
                    alt={"X"}
                    width={450}
                    height={450}
                    className={"justify-self-center hidden md:block"}
                />
                <div className={"flex flex-col justify-center md:justify-between gap-6 h-full md:h-[70vh] "}>
                    <div  className={"block md:hidden"}>
                        <Image
                            src={"/images/x.svg"}
                            alt={"X"}
                            width={50}
                            height={50}
                        />
                    </div>
                    <h1 className={"text-6xl font-bold "}>Happening now</h1>
                    <div className={" w-full md:w-[60%]"}>
                        <h2 className={"font-bold text-3xl mb-4"}>Join today.</h2>
                        <div className={"flex flex-col space-y-2"}>
                            <Button label={
                                <div className={"flex gap-2 items-center justify-center"}>
                                    <FcGoogle/>
                                    Sign up with Google
                                </div>
                            } fullWidth={true} secondary={true} />
                            <Button label={
                                <div className={"flex gap-2 items-center justify-center"}>
                                    <AiFillGithub/>
                                    Sign up with GitHub
                                </div>
                            } fullWidth={true} secondary={true}/>
                            <div className={"flex items-center justify-center"}>
                                <div className={"h-px bg-gray-700 w-1/2"}/>
                                    <p className={"mx-4"}>or</p>
                                <div className={"h-px bg-gray-700 w-1/2"}/>
                            </div>
                            <Button label={"Create account"} fullWidth={true} />
                        </div>
                    </div>
                    <div className={"w-full  md:w-[60%]"} >
                        <h3 className={"font-medium text-xl mb-4"}>
                            Already have an account?
                        </h3>
                        <Button label={"Sign in"} fullWidth={true} outline={true} />
                    </div>
                </div>
            </div>
        </>
    )
}