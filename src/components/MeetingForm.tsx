"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from "./ui/form"
import { Button } from "./ui/button"
import { getMeetingSchema } from "@/validations"
import { Input } from "./ui/input"
import { createNewMeeting, scheduleMeeting } from "@/actions/meeting.actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Loader from "./Loader"
import { Textarea } from "./ui/textarea"
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from 'uuid'

import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image"
import { DialogTrigger } from "./ui/dialog"

interface MeetingFormProps {
    title: string
    type: 'new' | 'join' | 'schedule' | 'recordings'
    userId?: string
    email?: string
}

const MeetingForm = ({ type, title, userId, email }: MeetingFormProps) => {
    const router = useRouter();
    const formSchema = getMeetingSchema(type);
    const form = useForm({
        resolver: zodResolver(formSchema!),
    });

    const [isLoading, setIsLoading] = useState(false);
    const [meetingScheduled, setMeetingScheduled] = useState(false);
    const [meetingId, setMeetingId] = useState('');
    const [callId, setCallId] = useState('');
    const [copied, setCopied] = useState(false);


    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        if (type === 'join') {
            //@ts-ignore
            router.push(values.url)
        } else if (type === 'schedule') {
            const meetingData = {
                ...values,
                hostId: userId,
                status: 'scheduled',
                callId: uuidv4()
            };
            //@ts-ignore
            const meeting = await scheduleMeeting(meetingData);
            if (meeting) setMeetingScheduled(true);
            setMeetingId(meeting.id);
            setCallId(meeting.callId)
        } else {
            router.push('/recordings')
        }
        setIsLoading(false)
    };

    const handleNewMeeting = async () => {
        try {
            setIsLoading(true);
            const meeting = await createNewMeeting(email!, userId!, title);
            if (meeting) router.push(`/meetings/${meeting.id}`);
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }

    }
    const copyLink = () => {
        const serverUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SERVERURL : process.env.NEXT_PUBLIC_LOCALSERVERURL
        const link = `${serverUrl}/meetings/${meetingId}?callType=default&callId=${callId}`

        navigator.clipboard.writeText(link);

        setCopied(true);
    }
    return (
        <Form {...form} >
            {!meetingScheduled &&
                <h2 className="text-white font-bold text-3xl">
                    {title}
                </h2>
            }
            {type !== 'new' && (
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 py-4">
                    {type === 'join' && (
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-light">Meeting Link</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Meeting Link"
                                            className="bg-dark-tertiary"
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your meeting link
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    {type === 'schedule' && !meetingScheduled && (
                        <>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-light"> Meeting Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Add a title"
                                                className="bg-dark-tertiary"
                                                {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your meeting title
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-light"> Meeting Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={5}
                                                placeholder="Add a description"
                                                className="bg-dark-tertiary"
                                                {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your meeting description
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-light"> Meeting Date and Time</FormLabel>
                                        <div className="flex  w-full">
                                            <Image
                                                src={'/calendar.svg'}
                                                width={20}
                                                height={20}
                                                alt="icon"
                                                className="mx-2"
                                            />

                                            <FormControl>
                                                <DatePicker
                                                    selected={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                    dateFormat="MMMM d, yyyy h:mm aa"
                                                    showTimeSelect={true}
                                                    timeInputLabel="Time:"
                                                    wrapperClassName="date-picker"
                                                    className="bg-dark-tertiary w-full py-1 px-4 rounded-md text-light"

                                                />
                                            </FormControl>
                                        </div>

                                        <FormDescription>
                                            Select meeting date and time                                    </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </>)}

                    {
                        type === 'schedule' && meetingScheduled && (
                            <div className="flex flex-col gap-10 items-center justify-center">
                                <div className="flex flex-col items-center justify-center text-2xl font-extrabold text-white">
                                    <Image
                                        src={'/tick.svg'}
                                        width={72}
                                        height={72}
                                        alt="tick"
                                    />
                                    Meeting Created
                                </div>

                                <div className="flex flex-col w-full gap-2 text-light">
                                    <Button
                                        className="flex gap-2 font-bold"
                                        onClick={copyLink}>
                                        {!copied && <Image
                                            src={'/copy.svg'}
                                            width={20}
                                            height={20}
                                            alt="copy"
                                        />}
                                        {copied ? 'Invitation Link Copied' : "Copy Invitation Link"}</Button>
                                    <DialogTrigger
                                        className="font-bold">Close</DialogTrigger>
                                </div>
                            </div>

                        )

                    }


                    <Button
                        disabled={isLoading}
                        type="submit"
                        className={` w-full text-base font-semibold ${meetingScheduled && 'hidden'}`} >
                        {isLoading ? <Loader size={20} /> : (
                            type === 'join' ? 'Join meeting' :
                                type === 'schedule' ? 'Schedule meeting' : 'View recordings'
                        )}

                    </Button>
                </form>
            )}

            {type === 'new' && !meetingScheduled && (

                <Button
                    onClick={handleNewMeeting}
                    disabled={isLoading}
                    className="w-full text-base font-semibold "
                >
                     {isLoading ? <Loader size={20} /> : (
                            'Start an instant meeting'
                        )}
                </Button>
            )}
        </Form>
    )
}

export default MeetingForm


