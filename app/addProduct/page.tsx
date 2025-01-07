"use client";
import axios from "axios";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Inputs from "../components/input";

export default function AddProduct() {
	const [name, setName] = useState("");
	const [price, setPrice] = useState<number>(0);
	const [description, setDescription] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const [colors, setColors] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	console.log(selectedTags);

	async function sendData() {
		const data = {
			name,
			price,
			description,
			imgUrl,
			colors,
			tags: selectedTags,
		};
		try {
			console.log(data)
			const res = await axios.post("/api/addProduct", data);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	}
	function removeTag(index: number) {
		const tempTags: string[] = [...selectedTags];
		if (index === selectedTags.length - 1) {
			tempTags.pop();
		} else {
			tempTags.splice(index, 1);
		}
		setSelectedTags([...tempTags]);
	}
	return (
		<div>
			<div className="text-center" >
				Add Product
			</div>
			<form onSubmit={sendData}>
				<div className="grid grid-flow-row gap-5 grid-cols-3">
					<Inputs
						id="product_name"
						type="text"
						label="Name"
						value={name}
						onchange={(e) => setName(e.target.value)}
					/>
					<Inputs
						id="product_price"
						type="number"
						label="Price"
						value={price}
						onchange={(e) =>
							setPrice(Number(e.target.value))
						}
					/>
					<Inputs
						id="product_description"
						type="text"
						label="description"
						value={description}
						onchange={(e) =>
							setDescription(e.target.value)
						}
					/>
					<Inputs
						id="product_img"
						type="text"
						label="Image url"
						value={imgUrl}
						onchange={(e) => setImgUrl(e.target.value)}
					/>
					<Inputs
						id="product_colors"
						type="text"
						label="colors"
						value={colors}
						onchange={(e) => setColors(e.target.value)}
					/>
					<div className="flex flex-col gap-1 items-start">
						<div className="flex gap-1 items-center border text-white border-gray-50">
							{selectedTags.map((tag, index) => {
								return (
									<div
										key={index}
										className="flex gap-1 items-center border border-gray-500"
									>
										<div>{tag}</div>
										<RxCross2
											onClick={() =>
												removeTag(
													index
												)
											}
										/>
									</div>
								);
							})}
						</div>
						<select
							name="tags"
							id="tags"
							// value={tag}
							onChange={(e) =>
								!selectedTags.includes(
									e.target.value
								) &&
								setSelectedTags([
									...selectedTags,
									e.target.value,
								])
							}
						>
							<option value="men">men</option>
							<option value="women">women</option>
							<option value="children">
								children
							</option>
							<option value="winter">winter</option>
							<option value="summer">summer</option>
						</select>
					</div>
				</div>
				<button
					type="submit"
					className="block mx-auto w-2/12 border border-gray-500 mt-5"
				>
					Add
				</button>
			</form>
		</div>
	);
}
