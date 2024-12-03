"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";
export default function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [retypePassword, setRetypePassword] = useState("");
	const router = useRouter();

	async function formSubmission(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			if (password !== retypePassword)
				return console.log("passwords doesn't match");
			else {
				const res = await axios.post("/api/signup", {
					name,
					email,
					password,
				});

				console.log(res.data.message);
				if (res.data.status === 200) {
                              console.log(res.data.status)
                              router.push('/');				}
			}
		} catch (error) {
			console.error("server error", error);
		}
            // if(redirect) router.push('/');
	}
	return (
		<form
			onSubmit={formSubmission}
			className="p-6 border border-gray-400 rounded-lg gap-2 text-gray-900 flex flex-col justify-center items-center"
		>
			<label htmlFor="email" className="text-sm">
				Name
			</label>
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				// className = "text-sm"
			/>
			<label htmlFor="email" className="text-sm">
				Email
			</label>
			<input
				type="email"
				placeholder="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				// className = "text-sm"
			/>
			<label htmlFor="email" className="text-sm">
				Password
			</label>
			<input
				type="password"
				placeholder="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				// className = "text-sm"
			/>
			<label htmlFor="email" className="text-sm">
				Re type Password
			</label>
			<input
				type="password"
				placeholder=" Re type password"
				value={retypePassword}
				onChange={(e) => setRetypePassword(e.target.value)}
				// className = "text-sm"
			/>
			<button
				className="px-4 py-2 border border-gray-400 rounded-lg"
				type="submit"
			>
				Submit
			</button>
		</form>
	);
}
