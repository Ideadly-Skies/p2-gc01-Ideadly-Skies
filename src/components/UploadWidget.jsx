import { useEffect, useRef, useState } from 'react';

const UploadWidget = ({ setImageUrl }) => {
    const [setPublicId] = useState(null);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dljbml0rx',
            uploadPreset: 'P2-GC01-IDEADLY-SKIES'
        }, function(error, result) {
            console.log(result);
            // Handle the result or error here
            if (!error && result && result.event === 'success') {
                console.log('Upload successful:', result.info.secure_url);
                setImageUrl(result.info.secure_url)
                setPublicId(result.info.public_id);
            }
        });
    }, []);

    return (
        <div>
            <button onClick={(e) => { e.preventDefault(); widgetRef.current.open() }}   className="mt-2 w-full flex justify-center items-center gap-2 px-4 py-2 border border-dashed border-indigo-500 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 hover:border-indigo-700 transition">
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                    />
                </svg> 
                Upload 
            </button>
        </div>
    );

};

export default UploadWidget;