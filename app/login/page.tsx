"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
      const router = useRouter()
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const userDetails = {}
	async function verifyUser(e:FormEvent<HTMLFormElement>) {
            e.preventDefault()
		try {
			const res = await axios.post("/api/login", {
				email,
				password,
			});
			console.log(res.data.message);
                  if(res.data.status === 200) router.push('/');
		} catch (error) {
			console.error("server failed", error);
		}
	}
	return (
		<form
			className="p-6 border border-gray-400 text-gray-900 rounded-lg flex flex-col justify-center items-center "
			onSubmit={verifyUser}
		>
			<label htmlFor="email " className="text-sm">
				Email
			</label>
			<input
				type="Email"
				className="p-2 rounded-lg"
				id=""
				placeholder="email"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<label htmlFor="Password" className="text-sm">
				Password
			</label>
			<input
				type="password"
				className="p-2 rounded-lg"
				placeholder="password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit" className="p-4 border border-gray-400">
				Submit
			</button>
                  <Link href={"/signup"}>Signup</Link>
		</form>
	);
}
