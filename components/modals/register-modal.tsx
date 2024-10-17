"use client"
import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "@/components/ui/modal";
import {Dispatch, SetStateAction, useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {registerStep1Scheme, registerStep2Scheme} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Button from "@/components/ui/button";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

export default function RegisterModal(){
    const [step , setStep] = useState(1);
    const [data, setData] = useState({name:"" , email:""});

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const onToggle = useCallback(() => {
        loginModal.onOpen()
        registerModal.onClose();
    }, [loginModal,registerModal]);

    const body = step === 1 ? <RegisterStep1 setData={setData} setStep={setStep} /> : <RegisterStep2 data={data} />;
    const footer = (
        <div className={"text-neutral-400 text-center mb-4"}>
            <p>
                Already have an account?{" "}
                <span onClick={onToggle} className={"text-white cursor-pointer hover:underline"}>
                    Sign in
                </span>
            </p>
        </div>
    );
    return(
        <Modal
            body={body}
            footer={footer}
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            step={step}
            totalStep={2}
        />
    )
}

function RegisterStep1({setData,setStep}:{setData:Dispatch<SetStateAction<{name:string, email:string}>>; setStep:Dispatch<SetStateAction<number>>;}) {
    const [error , setError] = useState("");
    const form = useForm<z.infer<typeof registerStep1Scheme>>({
        resolver: zodResolver(registerStep1Scheme),
        defaultValues: {
            email:"",
            name:"",
        },
    })

    async function onSubmit(values: z.infer<typeof registerStep1Scheme>) {
    
        try{
            const {data}  = await axios.post("api/auth/register?step=1" , values)
            console.log(data);
        
            if(data.success){
                setData(values);
                setStep(2);
            }
        }catch(error:unknown){
            if(axios.isAxiosError(error) && error.response?.data?.error){
                setError(error.response.data.error)
            }else{
                setError("Something went wrong.Please try again later")
            }
            console.log(error)
        }
    }

    const {isSubmitting} = form.formState;

    return(
    <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12 ">
            {error && (
                   <Alert variant="destructive">
                   <AlertCircle className="h-4 w-4" />
                   <AlertTitle>Error</AlertTitle>
                   <AlertDescription>
                     {error}
                   </AlertDescription>
                 </Alert> 
            )}
            <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <Button
               label={"Next"}
               type="submit"
               secondary
               fullWidth
               large
               disabled={isSubmitting}
            />
        </form>
    </Form>  )
}


function RegisterStep2({data}:{data:{name:string; email:string}}) {
    const [error , setError] = useState("");
    const registerModal = useRegisterModal();
    const form = useForm<z.infer<typeof registerStep2Scheme>>({
        resolver: zodResolver(registerStep2Scheme),
        defaultValues: {
            password: "",
            username: "",
        },
    })

    async function  onSubmit(values: z.infer<typeof registerStep2Scheme>) {
        try{
            const {data:response} = await axios.post("api/auth/register?step=2" , {...data , ...values}) 
            if(response.success){
                registerModal.onClose();
            }
        }catch(error:unknown){
            if(axios.isAxiosError(error) && error.response?.data?.error){
                setError(error.response.data.error)
            }else{
                setError("Something went wrong.Please try again later")
            }
        }
    }

    const {isSubmitting} = form.formState;


    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12 ">
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Your session has expired. Please log in again.
                        </AlertDescription>
                    </Alert>
                )}
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="UserName" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" type={"password"} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button
                    label={"Register"}
                    type="submit"
                    secondary
                    fullWidth
                    large
                    disabled={isSubmitting}
                />
            </form>
        </Form>
    )
}

