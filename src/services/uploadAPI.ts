import axios from "axios";

export interface ImageData {
    _id: string;
    publicId: string;
    url: string;
    originalName: string;
    folder: string;
    format: string;
    width: number;
    height: number;
    bytes: number;
    createdAt: string;
    updatedAt: string;
}

export interface UploadRequest {
    file: File;
    folder: string;
}

export const uploadImage = async (request: UploadRequest) => {
    const formData = new FormData();
    formData.append('file', request.file);
    formData.append('folder', request.folder);

    try {
        const response = await axios.post(
            'http://localhost:3000/api/upload/image', 
            formData,
            // {
            //     headers: {
            //         'Content-Type': 'multipart/form-data', 
            //     }
            // }
        );
        return response.data.image as ImageData;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Upload failed');
    }
}

export const deleteImage = async (publicId: string) => {
    try {
        const response = await axios.delete(
            `/api/upload/${publicId}`
        );
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error? error.message : 'Delete failed');
    }
}