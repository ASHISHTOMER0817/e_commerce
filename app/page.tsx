"use client";
import Image from "next/image";
// import Stripe from "stripe";
import axios from "axios";
import { useEffect, useState } from "react";
import { Clothes } from "./components/datatypes";
import Link from "next/link";

export default function Home() {
	const [data, setData] = useState<Clothes[]>();

	useEffect(() => {
		async function getData() {
			try {
				const res = await axios.get("/api/dashboard");
				console.log(res.data.data);
				setData(res.data.data);
			} catch (error) {
				console.log("server failed", error);
			}
		}
		getData();
	}, []);

	// async function paymentGateway() {

	// 	// Initialize Stripe with your secret key
	// 	const stripe = new Stripe(
	// 		"sk_test_51OximYSBnrUlVANBWuJnkEQqgzzybtNBnPuC3v8vtcEj475dmBLMULuRxMhb8ObPAEoweilqaQw7b5vkQlk1Hu2R00OydQNaTd"
	// 	);

	// 	// Create a session for the checkout process
	// 	const session = await stripe.checkout.sessions.create({
	// 		line_items: [
	// 			{
	// 				price: "1000", // Replace with the actual price ID
	// 				quantity: 1,
	// 			},
	// 		],
	// 		mode: "payment",
	// 		success_url: "https://example.com/success",
	// 	});

	// 	console.log(session); // You can log the session to check the response
	// }
	return (
		<div>
			<header>header</header>

			<section className="flex flex-wrap gap-5">
				{data
					? data.map(
							(
								{
									url,
									name,
									price,
								}: {
									url: string;
									name: string;
									price: number;
								},
								index
							) => {
								return (
									<Link
										key={index}
										className="flex flex-col gap-1 "
										href={"/checkout"}
									>
										<Image
											className="h-80 w-auto"
											width={150}
											height={200}
											src={url}
											alt={"img"}
										/>
										<h4>{name}</h4>
										<h5>{price}</h5>
										<button className="px-5 py-2 border border-gray-900 hover:bg-gray-800  rounded-3xl">
											Add to cart
										</button>
										<button role=""
											// onClick={
											// 	paymentGateway
											// }
											className="px-5 py-2 border border-gray-900 hover:bg-gray-800 rounded-3xl"
										>
											Buy{" "}
										</button>
									</Link>
								);
							}
					  )
					: ""}
			</section>
			<footer>footer</footer>
		</div>
	);
}
