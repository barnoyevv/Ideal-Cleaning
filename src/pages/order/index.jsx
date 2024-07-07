import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import { OrdersTable } from '@ui';
import { OrdersModal } from '@modal';
import {order} from "@service"

export default function Index() {
	const [open, setOpen] = useState(false)
	const [data, setData] = useState([])
	const [count, setCount] = useState(0)
	const [params, setParams] = useState({
		limit: 5,
		page: 1
	})
	const getData = async ()=>{
		const responce = await order.get(params)
		if (responce.status === 200 && responce?.data?.orders_list) {
			setData(responce?.data?.orders_list)
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
		<OrdersModal open={open} handleClose={()=>setOpen(false)}/>
		<div className='w-full flex justify-between mb-3'>
		<TextField id="fullWidth" label="Search" variant="outlined" />
		<Button variant="contained" onClick={()=>setOpen(true)}>Buyurtma qo'shish</Button>
		</div>
		<OrdersTable data={data}/>
		<Pagination count={count} page={params.page} onChange={handleChange} />
		</>
	);
}
