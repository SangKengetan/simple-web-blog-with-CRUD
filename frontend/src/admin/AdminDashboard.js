import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';


const AdminDashboard = () => {

    return (
        <Box >
            <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
                Dashboard Admin
            </Typography>
                <Link style={{ color: 'white', textDecoration: 'none' }} to='/admin/posts'>
                    <Button variant='contained' color="success" startIcon={<PostAddIcon />} sx={{ px: 3, py:3, mr:4, my:2, width: 250}}>Manage Posts </Button>
                </Link>
                <Link style={{ color: 'white', textDecoration: 'none' }} to='/admin/categories'>
                    <Button variant='contained' color="success" startIcon={<CategoryIcon />} sx={{ px: 3, py:3, mr:4, my:2, width: 250}}>Manage Categories </Button>
                </Link>
                <Link style={{ color: 'white', textDecoration: 'none' }} to='/admin/users'>
                    <Button variant='contained' color="success" startIcon={<PersonIcon />} sx={{ px: 3, py:3, mr:4, my:2, width: 250}}>Manage Users </Button>
                </Link>
        </Box>
    )
}

export default AdminDashboard