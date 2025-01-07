"use client";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Clothes } from "../components/datatypes";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { Order } from "../components/datatypes";

// const stripePromise = ;

function Checkout() {
	const [result, setResult] = useState();
	const [data, setData] = useState<Order[]>();
	// const [selectedProduct, setSelectedProduct] = useState<string[]>([]);
	const [checkedArr, setCheckedArr] = useState<{objectId:string,option:boolean}[]>([]);

	useEffect(() => {
		async function getData() {
			try {
				const res = await axios.get("/api/checkout");
				console.log(res.data.message, res.data.data);
				setData(res.data.data);
				setCheckedArr(
					new Array(res.data.data.length).fill({objectId:'', option:false})
				);
			} catch (error) {
				console.error("server failed" + error);
			}
		}
		getData();
	}, []);
	async function checkout() {
		try {
			await loadStripe("pk_test_51OximYSBnrUlVANBpDrKw2qt87nI89sTE14IwAH8YZnUVC3EHGrfVHE0UzeGq7II2b8BwukuLb95xp4XbInmp8by00ytlJHqHP");
			console.log('this is product arr',checkedArr)
			const res = await axios.post("/api/payment", checkedArr);
			window.location.href = res.data.url;
			setResult(res.data.message);
		} catch(error) {
			console.error("server failed" + error);
		}
	}

	function StateOfCheckbox(index:number, option:boolean, objectId:string){
		const CheckedArrCopy = [...checkedArr]
		CheckedArrCopy[index] = {objectId, option};
		setCheckedArr(CheckedArrCopy)
		console.log(checkedArr)
	}
	return (
		<div>
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
											_id:string,
											imgUrl:string,
											name:string,
											price:number,
										};
									},
									index
								) => (
									<tr key={index}>
										<td>
											<input
												type="checkbox"
												checked={
													checkedArr[index].option
												}
												onChange={(
													e
												) =>StateOfCheckbox(index, e.target.checked, product._id) }
											/>
										</td>
										<td>
											<div>
												<Image
													width={
														200
													}
													height={
														150
													}
													src={
														product.imgUrl
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
													className="text-black"
													name=""
													id=""
												>
													{[
														1,
														2,
														3,
														4,
														5,
														6,
														7,
														8,
														9,
														10,
													].map(
														(
															count,
															index
														) => {
															return (
																<option
																	key={
																		index
																	}
																	value=""
																>
																	{
																		count
																	}
																</option>
															);
														}
													)}
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
		</div>
	);
}

export default Checkout;
