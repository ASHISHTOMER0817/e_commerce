"use client";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Clothes } from "../components/datatypes";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { Order } from "../components/datatypes";

const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY ?? "");

function Checkout() {
	const [result, setResult] = useState();
	const [data, setData] = useState<Order[]>();

	useEffect(() => {
		async function getData() {
			try {
				const res = await axios.get("/api/checkout");
				console.log(res.data.message, res.data.data)
				setData(res.data.data);
			} catch (error) {
				console.error("server failed" + error);
			}
		}
		getData();
	}, []);
	async function checkout() {
		try {
			await stripePromise;
			const res = await axios.get("/api/payment");
			window.location.href = res.data.url;
			setResult(res.data.message);
		} catch {
			console.error("server failed");
		}
	}
	return (
		<>
			<table>
				<thead>
					<tr>
						<th>select</th>
						<th>Product</th>
					</tr>
				</thead>
				<tbody>
					{data
						? data.map(
								(
									{
										product,
									}: {
										product: {
											url: string;
											name: string;
											price: number;
										};
									},
									index
								) => (
									<tr key={index}>
										<td>
											<input type="checkbox" />
										</td>
										<td>
											<div>
												<Image width={200}
												height={150}
													src={
														product.url
													}
													alt={
														product.name
													}
												/>
												{
													product.name
												}
												{
													product.price
												}
												<select
													name=""
													id=""
												>
													<option value="">helo</option>
												</select>
											</div>
										</td>
									</tr>
								)
						  )
						: ""}
				</tbody>
			</table>

			<button
				onClick={checkout}
				className="p-3 border block mx-auto border-red-500 rounded-md hover:bg-gray-950"
			>
				checkout
			</button>
			<div>{result}</div>
		</>
	);
}

export default Checkout;
