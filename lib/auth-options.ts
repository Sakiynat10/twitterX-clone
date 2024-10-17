import { AuthOptions, Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
export const authOptions:AuthOptions = {
    providers:[
        GitHubProvider({
            clientId:process.env.GITHUB_CLIENT_ID!,
            clientSecret:process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    callbacks:{
        async session({session}:{session: Session}){
            console.log(session);
            
            return session;
        },
    },
    debug:process.env.NODE_ENV === "development",
    session:{strategy:"jwt"},
    jwt:{secret:process.env.NEXTAUTH_JWT_SECRET!},
    secret: process.env.NEXTAUTH_SECRET!,
}