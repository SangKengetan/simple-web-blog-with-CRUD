import { Box, Button, TextField, Typography, Select, MenuItem, InputLabel } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';



const validationSchema = yup.object({
    name: yup
        .string('Enter category name')
        .required('category name is required'),
    description: yup
        .string('Enter description')
        .required('description is required'),
});



const CreateUser = () => {
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
            name: '',
            description: ''
        },

        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            createNewCategory(values);
            //alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });

    const createNewCategory = async (values) => {
        try {
            const { data } = await axios.post('/api/category/create', values);
            if (data.success === true) {
                toast.success('new category created');
                navigate('/admin/categories')
            }
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    return (
        <>
            <Box sx={{ bgcolor: "white", padding: "20px 200px" }}>
                <Typography variant='h5' sx={{ pb: 4 }}> Add New Category </Typography>
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
                        Add Category
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default CreateUser