'use client';

import * as z from 'zod';
import axios from 'axios';

import { useState } from 'react';
import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "../ui/modal";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';

const formSchema = z.object({
    name: z.string().min(2, "Name should be at least 2 characters long"),
});

export const StoreModal = () => {
    const [loading, setLoading] = useState(false);

    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/stores", values);
            console.log(response.data);
            toast.success("Store created successfully");
            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            toast.error("Failed to create store. Please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal 
        title="Create Store" 
        description="Add Store to create product and category"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}>
            <div>
                <div className='space-y-4 py-2 pb-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                        placeholder='Store Name'
                                        {...field}
                                        disabled={loading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                            </FormField>

                            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                                <Button 
                                variant='outline'
                                onClick={storeModal.onClose}
                                disabled={loading}
                                >Cancel</Button>
                                <Button type='submit' disabled={loading}>
                                    {loading ? "Loading..." : "Continue"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}
