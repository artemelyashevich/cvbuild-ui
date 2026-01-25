'use client';

import {Button} from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'sonner';
import {AuthRequest, IAuthForm} from "@/entities";
import {AuthService} from "@/service/AuthService";
import {LoginButton} from "@/widgets";

export function Auth() {
    const form = useForm<IAuthForm>();

    const [isLogin, setIsLogin] = useState<boolean>(false);

    const {push} = useRouter();

    const {mutate, isPending, isError, error} = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: AuthRequest) => {
            return isLogin
                ? AuthService.login(data)
                : AuthService.register(data);
        },
        onSuccess: () => {
            toast.success(isLogin ? 'Successfully logged in!' : 'Successfully registered!');
            form.reset();
            push("/profile");
        },
        onError: (error) => {
            toast.error("Authentication failed");
            console.error(error);
        }
    });

    const onSubmit: SubmitHandler<AuthRequest> = data => {
        mutate(data);
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-lg text-center">
                        {isLogin ? 'Login' : 'Register'}
                    </h1>
                    <Form {...form}>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            {
                                !isLogin && <>
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>First name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg "
                                                        placeholder="First name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Last name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg "
                                                        placeholder="Last name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </>
                            }
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg "
                                                placeholder="Email"
                                                {...field}
                                            />
                                        </FormControl>
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
                                            <Input
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg "
                                                placeholder="Password"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="w-full font-medium"
                                type="submit"
                            >
                                {isPending ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
                            </Button>
                            <p
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-sm font-light text-gray-500 dark:text-gray-400"
                            >
                                Don’t have an account yet?
                                <span
                                    className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    {isLogin ? ' Register' : ' Login'}
                                </span>
                            </p>
                            <LoginButton/>
                        </form>
                        {
                            isError && <p className={'text-red'}>{error.message}</p>
                        }
                    </Form>
                </div>
            </div>
        </div>
    );
}