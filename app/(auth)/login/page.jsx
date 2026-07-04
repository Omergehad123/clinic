import Image from "next/image";
import Link from "next/link";

export function Login() {
    return (
        <div className="flex items-center gap-20 min-h-screen">
            <div className="w-[500px] h-screen flex flex-col justify-center bg-(--main-color) py-8 px-16">
                <Image src="/logo.png" alt="Logo" width={50} height={50} className="mb-5" />

                <h1 className="font-semibold text-3xl mb-2">Welcome back!</h1>
                <p className="text-(--text-color) mb-8 text-lg">please enter your email and password</p>

                <form action="">
                    <input type="email" placeholder="Email" className="w-full p-3 mb-4 border-b-1 border-b-black focus:border-b-(--second-color) transition-all duration-300 outline-none" />
                    <input type="password" placeholder="Password" className="w-full p-3 mb-4 border-b-1 border-b-black focus:border-b-(--second-color) transition-all duration-300 outline-none" />
                    <button type="submit" className="cursor-pointer w-full p-3 mb-4 rounded-lg bg-(--second-color) text-white transition-all duration-300 hover:bg-gray-700">Login</button>
                </form>
                <p className="text-center text-(--text-color)">
                    dont have account? <Link href="/signup" className="text-(--second-color)">signup</Link>
                </p>
            </div>

        </div>
    )
}
export default Login;   