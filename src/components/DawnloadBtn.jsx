import appwriteService from "../appwrite/configAppWrite";
import React from "react";
import { Button } from "./index";
import { CloudDownloadOutlined, LikeOutlined, DislikeOutlined } from "@ant-design/icons";

function DownloadButton({ fileId, fileName }) {

    const handleDownload = () => {
        try {
            const fileUrl = appwriteService.getFileDownload(fileId);

            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = fileName;
            link.click();

            link.remove();
            window.URL.revokeObjectURL(fileUrl);
        } catch (error) {
            console.log("error downloading file", error);

        }
    };

    return (
        <button
            onClick={handleDownload}
            className=" text-2xl text-gray-100 hover:text-blue-500 transition py-2 px-4  ml-20"
        >
            <CloudDownloadOutlined />

        </button>


    );
}

export default DownloadButton;
