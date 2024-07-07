import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { ServiceTable } from '@ui';
import { ServiceModal } from '@modal';
import { useEffect, useState } from 'react';
import {service} from "@service"

export default function Index() {
	const [open, setOpen] = useState(false)
	const [data, setData] = useState([])
	const [count, setCount] = useState(0)
	const [params, setParams] = useState({
		limit: 5,
		page: 1
	})
	const getData = async ()=>{
		const responce = await service.get(params)
		console.log(responce);
		if (responce.status === 200 && responce?.data?.services) {
			setData(responce?.data?.services)
			let total = Math.ceil(responce?.data?.total / params.limit)
			setCount(total)
		}
	}
	useEffect(()=>{
		getData()
	}, [params])
	const handleChange = (event, value) => {
		setParams({
			...params,
			page: value
		})
	  };
	return (
		<>
		<ServiceModal open={open} handleClose={()=>setOpen(false)}/>
		<div className='w-full flex justify-between mb-3'>
		<TextField id="fullWidth" label="Search" variant="outlined" />
		<Button variant="contained" onClick={()=>setOpen(true)}>Buyurtma qo'shish</Button>
		</div>
		<ServiceTable data={data}/>
		<Pagination count={count} page={params.page} onChange={handleChange} className='mt-4'/>
		</>
	);
}
