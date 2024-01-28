import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment'
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';


const ManageCategories = () => {

    const [categories, setCategories] = useState([]);
    const [ctg, setCtg] = useState([]);

    const displayCategories = async () => {
        try {
            const { data } = await axios.get('/api/categories/show');
            setCategories(data.categories);
            setCtg(data.ctg);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        displayCategories()
    }, [])


    //delete category by Id
    const deleteCategoryById = async (e, id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                const { data } = await axios.delete(`/api/delete/category/${id}`);
                if (data.success === true) {
                    toast.success(data.message);
                    displayCategories();
                }
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
        }
    }

    const columns = [
        {
            field: '_id',
            headerName: 'Category ID',
            width: 150,
            editable: true,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 120,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 250,
        },
        {
            field: 'count',
            headerName: 'Posts',
            width: 100,
            valueGetter: (data) => data.row.count === undefined ? 0 : data.row.count
        },
        {
            field: 'createdBy',
            headerName: 'Created By',
            width: 150,
            valueGetter: (data) => data.row.createdBy.name
        },
        {
            field: 'createdAt',
            headerName: 'Create At',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )
        },
        {
            field: "Actions",
            width: 100,
            renderCell: (value) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Link to={`/admin/category/edit/${value.row._id}`}>
                        <IconButton aria-label="edit" >
                            <EditIcon sx={{ color: '#1976d2' }} />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="delete" onClick={(e) => deleteCategoryById(e, value.row._id)} >
                        <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>

                </Box>
            )
        }
    ];

    const mergeArrays = (arr1 = [], arr2 = []) => {
        let res = [];
        res = arr1.map(obj => {
           const index = arr2.findIndex(el => el["_id"] === obj["_id"]);
           const { count } = index !== -1 ? arr2[index] : {};
           return {
              ...obj,
              count
           };
        });
        return res;
     };
    let uiCategories = mergeArrays(categories,ctg)
    return (
        <Box >
            <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
                Categories
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
            <Link style={{ color: 'white', textDecoration: 'none' }} to='/admin/category/create'>
                <Button variant='contained' color="success" startIcon={<AddIcon />}>Add Category</Button>
            </Link>
            </Box>
            <Paper sx={{ bgcolor: "white" }} >
                <Box sx={{ height: 420, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{

                            '& .MuiTablePagination-displayedRows': {
                                color: 'black',
                            },
                            color: 'black',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: "white"
                            },

                        }}
                        rows={uiCategories}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        checkboxSelection
                    />
                </Box>
            </Paper>

        </Box>
    )
}

export default ManageCategories