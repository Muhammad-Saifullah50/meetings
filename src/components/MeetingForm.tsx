"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from "./ui/form"
import { Button } from "./ui/button"
import { meetingFormSchema } from "@/validations"
import { Input } from "./ui/input"
import { createNewMeeting } from "@/actions/meeting.actions"
import { useRouter } from "next/navigation"

interface MeetingFormProps {
    title: string
    type: 'new' | 'join' | 'schedule' | 'recordings'
    userId?: string
    email?: string
}

const MeetingForm = ({ type, title, userId, email }: MeetingFormProps) => {
    const router = useRouter();
    const form = useForm();

    // todo: have to correct the types
    async function onSubmit(values: any) {
        if (type === 'new') {
            const meeting = await createNewMeeting(email!, userId!, title);
            if (meeting) router.push(`/meetings/${meeting.id}`);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <Button
                    type="submit"
                    className="bg-blue w-full hover:bg-blue/90 text-base font-semibold" >
                    {type === 'new' ? 'Start an instant meeting' :
                        type === 'join' ? 'Join a meeting' :
                            type === 'schedule' ? 'Schedule a meeting' : 'View recordings'}
                </Button>
            </form>
        </Form>
    )
}

export default MeetingForm
