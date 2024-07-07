import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ToastContainer } from 'react-toastify';
import {clients} from "@service"
import Notification from "@notification"
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		backgroundColor: theme.palette.common.white,
		color: theme.palette.text.primary,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

export default function Index({ data }) {
	const deleteItem = async({id, owner_id}) =>{
		try {
			const responce = await clients.delete(id, owner_id)
		if (responce.status === 200) {
			setTimeout(() => {
				window.location.reload();
			}, 500);
			Notification({ title: "Client deleted", type: 'success' });
		}
		} catch (error) {
			console.log(error);
			Notification({ title: "Error", type: 'error' });
		}
	}
	return (
		<>
		<ToastContainer/>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>#</StyledTableCell>
							<StyledTableCell align="center">Fullname</StyledTableCell>
							<StyledTableCell align="center">Phone number</StyledTableCell>
							<StyledTableCell align="center">Action</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((item, index) => (
							<StyledTableRow key={item.id}>
								<StyledTableCell component="th" scope="row">
									{index + 1}
								</StyledTableCell>
								<StyledTableCell align="center">{item.full_name}</StyledTableCell>
								<StyledTableCell align="center">{item.phone_number}</StyledTableCell>
								<StyledTableCell align="center">
										<Button
											variant='contained'
											sx={{ bgcolor: 'red', '&:hover': { bgcolor: 'darkred' } }}
											onClick={()=>deleteItem({id: item.id, owner_id: item.owner_id})}
										>
											<DeleteOutlineOutlinedIcon />
										</Button>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
