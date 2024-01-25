"use client";
import FormData from "form-data";
import React, { useState } from "react";
export default function Page() {
  const [image, setImage] = useState(null);

  const [bgremove, setBgremove] = useState(null);
  console.log(image);

  const handleChangeBG = () => {
    const apiKey = "WawNToGfqmr3kkhWirWFwxj6";
    const url = "https://api.remove.bg/v1.0/removebg";
    const formData = new FormData();
    formData.append("image_file", image, image.name);
    formData.append("size", "auto");

    fetch(url, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: formData,
    })
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          setBgremove(reader.result);
          
        };
        reader.readAsDataURL(blob);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center my-10">
      <div>
        <h2 className="text-lg font-semibold">Remove Background Image</h2>

        <div>
          <div className="my-4">
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
        </div>

        <button
          onClick={handleChangeBG}
          className="px-4 py-2 rounded-md border cursor-pointer bg-red-600 text-[#fff] hover:bg-red-700"
        >
          Remove Background
        </button>
      </div>
      <div>{bgremove && <img className="border border-sky-700" src={bgremove} alt="Remove Background" />}</div>
    </div>
  );
}
