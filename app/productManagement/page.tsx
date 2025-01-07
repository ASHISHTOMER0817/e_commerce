"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../components/datatypes";
import Image from "next/image";
const ProductManagament = () => {
	const [products, setProducts] = useState<Product[]>();

	useEffect(() => {
		async function getData() {
			try {
				const res = await axios.get("/api/allProducts");
				console.log(res.data.data);
				setProducts(res.data.data);
			} catch (err) {
				console.error(err);
			}
		}
		getData();
	}, []);

	return (
		<div className="px-8 py-12">
			<div className="font-bold text-2xl">Product Management</div>
			<div className="w-full px-8 py-8 rounded-2xl bg-gray-500">
				{products?.map(
					(
						{
							name,
							price,
							imgUrl,
							selectedTags,
							colors,
						},
						index
					) => {
						return (
							<div
								className=" bg-white flex "
								key={index}
							>
								<Image
									width={300}
									height={50}
									src={imgUrl}
									alt=""
									className="w-32 h-auto"
								/>
								<div className="flex flex-col items-center justify-between ">
									<div className="flex items-center">
										<div>price:</div>
										<div>{price}</div>
									</div>
                                                      <div className="flex items-center">

									<div>Name:</div>
									<div>{name}</div>
                                                      </div>
								</div>
								<div className="flex flex-col items-center justify-between ">
									<div className="flex items-center">
										<div>Colors:</div>
										<div>
											{colors.map(
												(
													color
												) => {
													return (
														<div
															key={
																index
															}
														>
															{
																color
															}

															,
														</div>
													);
												}
											)}
										</div>
									</div>
									<div className="flex items-center ">
										<div>Tags:</div>
										{/* <div> */}
										{selectedTags.map(
											(
												tags,
												index
											) => {
												return (
													<div
														key={
															index
														}
													>
														{
															tags
														}

														,
													</div>
												);
											}
										)}
										{/* </div> */}
									</div>
								</div>
							</div>
						);
					}
				)}
			</div>
		</div>
	);
};

export default ProductManagament;
