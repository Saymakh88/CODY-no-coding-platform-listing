import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import app_config from '../../config'
import { motion } from "framer-motion";
import Reloader from "./Reloader";




const ComparePlatform = () => {

    const [name, setName] = useState("");
    const url = app_config.url;
    const [platformList, setPlatformList] = useState([]);
    const [filterList, setFilterList] = useState([])
    const [nameList, setNameList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [count, setCount] = useState(0);

    const getDataFromBackend = (cb) => {
        setIsLoading(true)
        fetch(url + '/platform/showall').then(res => res.json())
            .then(data => {
                cb(data);
                setIsLoading(false)
            })
    };

    console.log(filterList);

    const searchByName = () => {
        if (count == 3) {
            toast.error("You can only compare 3 platforms")
            return;
        }
        else {
            if (!name) {
                getDataFromBackend(() => { });
                toast.error("Please enter a platform name");
                return;
            }
            getDataFromBackend((data) => {
                const filteredData = data.filter((item) => item.title.toLowerCase().includes(name.toLowerCase()));
                if (filteredData.length) {
                    if (filterList.find(obj => obj.title === filteredData[0].title)) {
                        toast.error("Already added")
                    }
                    else if (!filterList.find(obj => obj.title === filteredData[0].title)) {
                        setFilterList([...filterList, filteredData[0]])
                        setCount(count + 1);
                    }
                    else {
                        toast.error("No platform found");
                    }
                }
                else {
                    toast.error("No platform found");
                }
            })
        }
    }


    useEffect(() => {
        getDataFromBackend((data) => {
            console.log(data);
            setPlatformList(data);
            setNameList(data.map((item) => item.title));
            console.log(data.map((item) => item.title));
        });
    }, []);

    console.log(nameList);

    const removeAll = (id) => {
        if (filterList.length === 0) {
            toast.error("No Platform to remove")
        }
        else if (filterList.length > 0) {
            setFilterList([])
            toast.success("Removed All Platforms")
        }
        else {
            setFilterList(filterList.filter((item) => item._id !== id))
            toast.success("Removed Platform")
        }
    }

    const removeItem = (id) => {
        setFilterList(filterList.filter((item) => item._id !== id))
        toast.success("Removed")
    }

    const displayData = () => {

        return <div className='container-fluid h-max w-fit mx-5 mt-10'>
            <div className='grid grid-cols-3 gap-5'>
                {filterList.map(({ _id, title, describe, plan, offer, category },) => (
                    <div className='bg-white rounded-xl px-5 py-2 shadow-xl hover:cursor-pointer' key={_id}>
                        <div className='flex justify-end'>
                            <button className='focus:outline-none' onClick={() => removeItem(_id)}><i className="fas fa-times text-red-500"></i></button>
                        </div>
                        <div className='text-lg my-2  hover:transition hover:duration-500 hover:translate-x-2'><strong className='text-gray-800 text-xl'>Name:</strong> &nbsp;{title}</div>
                        <div className='my-2 '><strong className='text-gray-800'>Description:</strong> &nbsp;{describe}</div>
                        <div className='my-2'><strong className='text-gray-800'>Plan:</strong> &nbsp;{plan}</div>
                        <div className='my-2'><strong className='text-gray-800'>Offer:</strong> &nbsp;{offer}</div>
                        <div className='my-2'><strong className='text-gray-800'>Category:</strong> &nbsp;{category}</div>
                    </div>
                ))}
            </div>
        </div>
    }







    return (
        <div className='container-fluid p-0 m-0'>
            <div className='flex justify-center'>
                <input type="search" list="nameList" className="w-1/3 mt-2 py-2 placeholder:text-stone-500 active:outline-none transition-all  rounded-full shadow-md shadow-slate-400  pl-5" value={name} onChange={e => setName(e.target.value)} placeholder='Search Here' accept='text'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter')
                            searchByName();
                    }}
                />
                <i class="fa fa-search text-2xl mt-3 ml-2" aria-hidden="true" onClick={searchByName}></i>
                <motion.div whileTap={{ scale: 0.8 }} className="bg-gray-50 px-2 ml-8 mt-2 rounded-md  shadow-md shadow-slate-500 flex flex-col justify-center items-center">
                    <button className=" text-red-500 text-md `" onClick={removeAll}><i className="fas fa-thin fa-trash"></i></button>
                </motion.div>
                <datalist id="nameList">
                    {nameList.map((item) => (
                        <option value={item} />
                    ))}
                </datalist>
            </div>
            <div className='flex w-full' >
                {
                    !isLoading ?
                        <div className='mx-auto'>
                            {displayData()}
                        </div>
                        :
                        <div className='mx-auto'>
                            <Reloader />
                        </div>
                }
            </div>
        </div>
    )
}

export default ComparePlatform