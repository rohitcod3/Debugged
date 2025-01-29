"use client";

import RTE from "@/components/RTE";
import Meteors from "@/components/magicui/meteors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/Auth";
import { cn } from "@/lib/utils";
import slugify from "@/utils/slugify";
import { IconX } from "@tabler/icons-react";
import { Models, ID } from "appwrite";
import { useRouter } from "next/navigation";
import React from "react";
import { databases, storage } from "@/models/client/config";
import { db, questionAttachmentBucket, questionCollection } from "@/models/name";
import { Confetti } from "@/components/magicui/confetti";
import { IM_Fell_Great_Primer } from "next/font/google";

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
        className={cn("relative flex w-full flex-col space-y-2 overflow-hidden rounded-xl border border-white/20 bg-slate-950 p-4",className )}  
        >
        <Meteors number={30}/>
        {children}
        </div>
    )
}


const QuestionForm = ({question} : {question?:Models.Document}) => {
    const {user} = useAuthStore();
    const [tag, setTag] = React.useState("");
    const router = useRouter();

    const[formData, setFormData] = React.useState({
        title:String(question?.title|| ""),
            content: String(question?.content || ""),
            authorId: user?.$id,
            tags: new Set((question?.tags || []) as string[]),
            attachment: null as File | null,
        
    });

    const [loading, setingLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const loadConfetti = (timeInMS = 3000) => {
        const end = Date.now() + timeInMS; //this totals to 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

        const frame = () => {
            if(Date.now() > end) return;

            Confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
                colors: colors,
            });
            Confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
                colors: colors,
            });

            requestAnimationFrame(frame);
        };
        frame();
    };

    const create = async () => {
        if(!formData.attachment) throw new Error("Please upload an image");

        const storageResponse = await storage.createFile(questionAttachmentBucket,
        ID.unique(),
        formData.attachment

        )

        const response = await databases.createDocument(db, questionCollection, ID.unique(),{
            title: formData.title,
            content: formData.content,
            authorId: formData.authorId,
            tags: Array.from(formData.tags),
            attachmentId: storageResponse.$id,
        });

        loadConfetti();

        return response;
    };


    const update = async () => {
        if(!question) throw new Error("Please provide a question");

        const attachmentId = await (async () => {
            if(!formData.attachment)return question?.attachmentId as string;

            await storage.deleteFile(questionAttachmentBucket, question?.attachmentId);

            const file = await storage.createFile(questionAttachmentBucket,
            ID.unique(),
            formData.attachment
            );

            return file.$id;
        })();

        const response = await databases.updateDocument(db, questionCollection, question.$id, {
            title: formData.title,
            content: formData.content,
            authorId: formData.authorId,
            tags: Array.from(formData.tags),
            attachmentId: attachmentId,
        });
        return response;
    }

    const submit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!formData.title || !formData.content || !formData.authorId)
        {
            setError(() => "Please fill out all fields");
            return;
        }

        setingLoading(() => true);
        setError(() => "");

        try{
        const response = question? await update():await create();
        await create();
        router.push(`/questions/${response.$id}/${slugify(formData.title)}`);
        }catch(error:any){
        setError(() => error.message);
        }

        setingLoading(() => false);
    }

    return(
        <form className="space-y-4" onSubmit={submit}>
            {error && (
                <LabelInputContainer>
                    <div className="text-center">
                        <span className="text-red-500">{error}</span>
                    </div>
                </LabelInputContainer>
            )}
            <LabelInputContainer>
                <Label htmlFor="title">
                    Title Address
                    <br/>
                    <small>
                    Be specific and imagine you&apos;re asking a question to another person.
                    </small>
                </Label>
                <Input
                id="title"
                name="title"
                placeholder="e.g. What does (() => {...})() experession mean in js? "
                type="text"
                value={formData.title}
                onChange={e => setFormData(prev =>({...prev, title: e.target.value}))}
                />
            </LabelInputContainer>
            <LabelInputContainer>
                <Label htmlFor="content">
                What are the details of your problem?
                    <br />
                    <small>
                        Introduce the problem and expand on what you put in the title. Minimum 20
                        characters.
                    </small>

                </Label>
                <RTE
                value={formData.content}
                onChange={value => setFormData(prev => ({...prev, content: value || ""}))}
                />
            </LabelInputContainer>

        </form>
    )
}