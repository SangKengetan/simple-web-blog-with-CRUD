import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const validationSchema = yup.object({
    name: yup
        .string('Enter your complete name')
        .required('name is required'),
});

const EditCategory = () => {

    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit
        } = useFormik({
        initialValues: {
            name,
            description
        },

        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            updateCategory(values);
            //alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });


    //show category by Id
    const singleCategoryById = async () => {
        // console.log(id)
        try {
            const { data } = await axios.get(`/api/category/${id}`);
            setName(data.category.name);
            setDescription(data.category.description);
            console.log('single data category', data.category)

        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    }

    useEffect(() => {
        singleCategoryById()
    }, [])

    const updateCategory = async (values) => {
        try {
            const { data } = await axios.put(`/api/update/category/${id}`, values);
            if (data.success === true) {
                toast.success('category updated');
                navigate('/admin/categories')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }


    return (
        <>
            <Box sx={{ bgcolor: "white", padding: "20px 200px" }}>
                <Typography variant='h5' sx={{ pb: 4 }}> Edit Category </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="name"
                        label="Category Name"
                        name='name'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Enter Category Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                    />
                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="description"
                        label="Description"
                        name='description'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Enter Description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        elevation={0}
                        sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px", }}
                    // disabled={loading}
                    >
                        Update Category
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default EditCategory