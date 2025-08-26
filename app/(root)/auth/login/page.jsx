"use client";

import { WEBSITE_REGISTER } from "@/routes/WebsiteRoute";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import ButtonLoading from "@/components/Application/ButtonLoading";
import Logo from "@/public/assets/images/logo-black.png";
import { zSchema } from "@/lib/zodSchema";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  // State for toggling password visibility
  const [isTypePassword, setIsTypePassword] = useState(true);

  // Zod schema for form validation (email and password)
  const formSchema = zSchema.pick({
    email: true,
  }).extend({
    password: z
      .string()
      .min(3, { message: "Password must be at least 3 characters." }),
  });

  // Initialize react-hook-form with zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submission handler
  const handleLoginSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Card className="w-[450px] mx-auto shadow-lg rounded-xl">
      <CardContent>
        {/* Logo Section */}
        <div className="flex justify-center py-4">
          <Image
            src={Logo.src}
            width={Logo.width}
            height={Logo.height}
            alt="logo"
            className="max-w-[150px]"
          />
        </div>

        {/* Heading Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Login Into Account</h1>
          <p className="text-sm text-gray-600">
            Login into your account by filling out the form below.
          </p>
        </div>

        {/* Form Section */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLoginSubmit)}
            className="space-y-4"
          >
            {/* Email Input Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Input Field with Toggle Visibility */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      {/* Password Input */}
                      <Input
                        type={isTypePassword ? "password" : "text"}
                        placeholder="********"
                        {...field}
                      />
                      {/* Password Visibility Toggle Button */}
                      <button
                        type="button"
                        className="absolute right-2 top-2 cursor-pointer"
                        onClick={() => setIsTypePassword(!isTypePassword)}
                      >
                        {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="mb-3">
              <ButtonLoading
                type="submit"
                text="Login"
                className="w-full cursor-pointer"
                loading={form.formState.isSubmitting}
              />
            </div>

            {/* Additional Links (Sign Up / Forgot Password) */}
            <div className="text-center">
              <div className="flex justify-center items-center gap-2">
                <p>Don't have an account?</p>
     <Link href={WEBSITE_REGISTER}
className="text-primary underline">
                  Create account!
                </Link>
              </div>
              <div className="mt-3">
                <Link href="" className="text-primary underline">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;