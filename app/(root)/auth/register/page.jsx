"use client";

import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";

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

const RegisterPage = () => {
  // State for toggling password visibility
  const [isTypePassword, setIsTypePassword] = useState(true);
  // State for loading
  const [loading, setLoading] = useState(false);

  // Zod schema for form validation
  const formSchema = zSchema
    .pick({
      name: true,
      email: true,
      password: true,
    })
    .extend({
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  // Initialize react-hook-form with zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Form submission handler
  const handleRegisterSubmit = async (values) => {
    try {
      
      setLoading(true)
      
      const { data: registerResponse } = await axios.post('/api/auth/register', values)

if (!registerResponse.success){
throw new Error (registerResponse.message)
}
      form.reset()
   alert(registerResponse.message)
      
      
      
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm text-gray-600">
            Create new account by filling out the form below.
          </p>
        </div>

        {/* Form Section */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegisterSubmit)}
            className="space-y-4"
          >
            {/* Full Name Input Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          <Input
            type={isTypePassword ? "password" : "text"}
            placeholder="********"
            {...field}
          />
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

            {/* Confirm Password Input Field */}
            <FormField
  control={form.control}
  name="confirmPassword"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Confirm Password</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            type={isTypePassword ? "password" : "text"}
            placeholder="********"
            {...field}
          />
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
                text="Create Account"
                className="w-full cursor-pointer"
                loading={loading}
              />
            </div>

            {/* Additional Links */}
            <div className="text-center">
              <div className="flex justify-center items-center gap-2">
                <p>Already have an account?</p>
                <Link href={WEBSITE_LOGIN} className="text-primary underline">
                  Login!
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;