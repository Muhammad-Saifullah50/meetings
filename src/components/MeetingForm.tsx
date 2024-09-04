"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from "./ui/form"
import { Button } from "./ui/button"
import { meetingFormSchema } from "@/validations"
import { Input } from "./ui/input"

const MeetingForm = ({ type }: { type: 'new' | 'join' | 'schedule' | 'recordings' }) => {

    const form = useForm<z.infer<typeof meetingFormSchema>>({
        resolver: zodResolver(meetingFormSchema),
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(values: z.infer<typeof meetingFormSchema>) {

        console.log(values)
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
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
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default MeetingForm
