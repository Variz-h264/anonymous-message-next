'use client'

import axios from 'axios';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface MessageFormData {
    title: string;
    message: string;
    selectedFile: File | null;
}

export const FormMsg = ({ btnmsg }: { btnmsg: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<MessageFormData>({
        title: '',
        message: '',
        selectedFile: null,
    });

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        
        if (file) {
            const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];
            if (allowedFileTypes.includes(file.type)) {
                setFormData({
                    ...formData,
                    selectedFile: file,
                });
            } else {
                alert("กรุณาเลือกไฟล์ที่เป็นรูปภาพเฉพาะ png, jpg, หรือ gif");
                e.target.value = '';
            }
        }
    }

    const sendMsg = () => {
        console.log('Title:', formData.title);
        console.log('Message:', formData.message);
        console.log('Selected File:', formData.selectedFile);
        
        const postData = new FormData();
        postData.append('title', formData.title);
        postData.append('message', formData.message);

        if (formData.selectedFile !== null) {
            postData.append('selectedFile', formData.selectedFile);
        }
    
        axios.post('http://localhost:3000/api/msg', postData)
        .then((response) => {
            console.log('API Response:', response.data);

            setFormData({
                title: '',
                message: '',
                selectedFile: null,
            })
            closeModal();
        })
        .catch((error) => {
            console.error('Error', error);
        })
    }

  return (
    <>
        <div className="mt-5">
            <button type="button" onClick={openModal} className="bg-white w-full h-10 rounded-md transition-all duration-200 ease-out hover:bg-white/80">
                <span className="text-xl font-bold">{btnmsg}</span>
            </button>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-[#080c11]/90" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-[#091422] p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-white">
                        <span>มาเริ่มต้นส่งข้อความสุดพิเศษกันเถอะ! <i className="fa fa-heart text-red-400 ml-1" /></span>
                    </Dialog.Title>
                    <div className="mt-2">
                        <h5 className="text-white text-md mb-2">หัวข้อ:</h5>
                        <input
                            type="text" 
                            name="title" 
                            className="bg-[#0e1c30] text-white w-full px-4 py-2 rounded-md outline-none mb-5 focus:shadow-md" 
                            placeholder="ใส่หัวข้อเรื่องที่จะบอก หรือ จะใส่ชื่ออะไรมาก็ได้" 
                            onChange={handleInputChange} 
                         />

                        <h5 className="text-white text-md mb-2">ฝากบอก:</h5>
                        <input 
                            type="text" 
                            name="message" 
                            className="bg-[#0e1c30] text-white w-full px-4 py-2 rounded-md outline-none mb-5 focus:shadow-md"
                            placeholder="ใส่เรื่องที่จะฝากบอกลงไป" 
                            onChange={handleInputChange} 
                        />

                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="img-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#111f31] border-dashed rounded-lg cursor-pointer hover:bg-[#0e1c30]">

                                {formData.selectedFile ? (
                                    <>
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="m-5">
                                                <img
                                                    src={URL.createObjectURL(formData.selectedFile)}
                                                    alt="Selected Image"
                                                    className="w-full h-64 object-cover"
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p className="mb-2 text-sm text-white">Click to upload</p>
                                            <p className="text-xs text-pink-500 dark:text-pink-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                    </>
                                )}
                                
                                <input id="img-file" type="file" className="hidden" onChange={handleFileInputChange} />
                            </label>
                        </div> 
                    </div>

                    <div className="mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center items-center rounded-md border border-transparent bg-[#0e1c30] w-full px-4 py-2 text-sm font-medium text-pink-400 hover:bg-[#111f31] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={sendMsg}
                        >
                            ส่งเลยย <i className="fa fa-arrow-right ml-1" />
                        </button>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
    </>
  );
};
