'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CustomForm from './CustomForm';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';

function AuthForm({ type }: { type: string }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      if (type === 'sign-up') {
        const newUser = await signUp(data);
        setUser(newUser);
      } else if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        setUser(response);
        if (response) {
          router.push('/');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="welathnest logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            WelathNest
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign in' : 'Sign up'}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? 'Link Your Account to get started'
              : 'Please enter your detail'}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4"></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomForm
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                      control={form.control}
                    />

                    <CustomForm
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                      control={form.control}
                    />
                  </div>

                  <CustomForm
                    name="address1"
                    label="Address"
                    placeholder="Enter your specific address"
                    control={form.control}
                  />

                  <CustomForm
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                    control={form.control}
                  />

                  <div className="flex gap-4">
                    <CustomForm
                      name="state"
                      label="State"
                      placeholder="ex: NY"
                      control={form.control}
                    />

                    <CustomForm
                      name="postalCode"
                      label="Postal Code"
                      placeholder="ex: 11101"
                      control={form.control}
                    />
                  </div>

                  <div className="flex gap-4">
                    <CustomForm
                      name="dob"
                      label="Date of Birth"
                      placeholder="yyyy-mm-dd"
                      control={form.control}
                    />

                    <CustomForm
                      name="ssn"
                      label="SSN"
                      placeholder="ex: 1234"
                      control={form.control}
                    />
                  </div>
                </>
              )}

              <CustomForm
                name="email"
                label="Email"
                placeholder="Enter your email"
                control={form.control}
              />
              <CustomForm
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                control={form.control}
              />

              <div className="flex flex-col gap-4">
                <Button className="form-btn" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading...
                    </>
                  ) : type === 'sign-in' ? (
                    ' Sign in'
                  ) : (
                    'Sign up'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
                ? "Don't have an account?"
                : 'Already have an account'}
            </p>
            <Link
              href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
              className="form-link"
            >
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
}

export default AuthForm;
