import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import app_config from '../../config'
import { motion } from "framer-motion";
// import Reloader from "./Reloader";

const ComparePlatform = () => {

    const [name, setName] = useState("");
    const url = app_config.api_url;
    const [platformList, setPlatformList] = useState([]);
    const [filterList, setFilterList] = useState([])
    const [nameList, setNameList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(0);

    const getDataFromBackend = (cb) => {
        setIsLoading(true)
        fetch(url + 'platform/getall').then(res => res.json())
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

        return <div className='container-fluid mt-5'>
            <div className='row'>
                {filterList.map(({ _id, title, heroimage, description, plan, offer, category },) => (
                    <div className='col-md-4 mb-4' key={_id}>
                        <div className='card'>
                        <div className='card-body'>
                        <div className=''>
                            <button className='btn btn-outline-danger' onClick={() => removeItem(_id)}><i className="fas fa-times text-red-500"></i></button>
                        </div>
                        <img src={url+'/'+heroimage} />
                        <div className='text-lg my-2  hover:transition hover:duration-500 hover:translate-x-2'><strong className='text-gray-800 text-xl'>Name:</strong> &nbsp;{title}</div>
                        <div className='my-2 '><strong className='text-gray-800'>Description:</strong> &nbsp;{description}</div>
                        <div className='my-2'><strong className='text-gray-800'>Plan:</strong> &nbsp;{plan}</div>
                        <div className='my-2'><strong className='text-gray-800'>Offer:</strong> &nbsp;{offer}</div>
                        <div className='my-2'><strong className='text-gray-800'>Category:</strong> &nbsp;{category}</div>
                    </div>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    }







    return (
        <div>
            <div className='col-md-10 mx-auto py-5'>
                <div className=''>

                    <div className=''>

                        <input type="search" list="nameList" className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder='Search Here' accept='text'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter')
                                    searchByName();
                            }}
                        />
                    </div>
                    <div className="d-flex">

                    <button className='btn btn-primary' onClick={searchByName}>

                        <i class="fa fa-search text-2xl" aria-hidden="true"></i>
                    </button>
                    <button className="btn btn-danger ms-3" onClick={removeAll}><i className="fas fa-thin fa-trash"></i> Remove All</button>
                    </div>
                    
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
                                {/* <Reloader /> */}
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ComparePlatform