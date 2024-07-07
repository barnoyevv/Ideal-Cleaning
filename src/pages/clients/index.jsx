import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import { ClientsTable } from '@ui';
import { useEffect, useState } from 'react';
import {clients} from "@service"

export default function Index() {
	const [data, setData] = useState([])
	const [count, setCount] = useState(0)
	const [params, setParams] = useState({
		limit: 5,
		page: 1
	})
	const getData = async ()=>{
		const responce = await clients.get(params)
		if (responce.status === 200 && responce?.data?.clients_list) {
			setData(responce?.data?.clients_list)
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
		<div className='mb-3'>
		<TextField id="fullWidth" label="Search" variant="outlined"/>
		</div>
		<ClientsTable data={data} />
		<Pagination count={count} page={params.page} onChange={handleChange} className='mt-4'/>
		</>
	);
}
