import HomeIcon from '@mui/icons-material/Home';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const routes = [
	{
		path: "/main",
		content: "Dashboard",
		icon: <HomeIcon/>
	},
	{
		path: "/main/orders",
		content: "Orders",
		icon: <ListAltIcon/>
	},
	{
		path: "/main/services",
		content: "Services",
		icon: <DryCleaningIcon/>
	},
	{
		path: "/main/clients",
		content: "Clients",
		icon: <PersonRoundedIcon/>
	},
];

export default routes;