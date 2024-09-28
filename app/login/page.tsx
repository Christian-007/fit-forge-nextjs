"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  function onSubmit(data: LoginFormInputs): void {
    console.log("Form Data: ", data);
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <img
        className="my-2"
        src="fit_forge_logo.png"
        alt="Fit Forge Logo"
        width="150"
        height="150"
      />
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="my-2 block text-slate-700 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="ring-1 ring-slate-400 appearance-none rounded-md px-4 py-2 w-full"
            />
            <p className="text-red-500 text-sm mt-1 h-4">
              {errors.email?.message}
            </p>
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="my-2 block text-slate-700 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="ring-1 ring-slate-400 appearance-none rounded-md px-4 py-2 w-full"
            />
            <p className="text-red-500 text-sm mt-1 h-4">
              {errors.password?.message}
            </p>
          </div>
          <button
            type="submit"
            className="w-full my-2 bg-slate-900 text-white font-semibold rounded-md p-2 hover:bg-slate-700"
          >
            Login to account
          </button>
        </form>
      </div>
    </div>
  );
}
