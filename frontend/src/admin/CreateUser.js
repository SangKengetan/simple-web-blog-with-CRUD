import { Box, Button, TextField, Typography, Select, MenuItem, InputLabel } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';



const validationSchema = yup.object({
    name: yup
        .string('Enter your complete name')
        .required('name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    role: yup
        .string('Select role')
        .min(2, 'role must be selected')
        .required('role must be selected'),
});



const CreateUser = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue
        } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: 'user'
        },

        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            createNewUser(values);
            //alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });




    const createNewUser = async (values) => {
        try {
            const { data } = await axios.post('/api/user/create', values);
            if (data.success === true) {
                toast.success('user created');
                navigate('/admin/users')
            }
        } catch (error) {
            toast.error(error.response.data);
            console.log(error);
        }
    }


    return (
        <>
            <Box sx={{ bgcolor: "white", padding: "20px 200px" }}>
                <Typography variant='h5' sx={{ pb: 4 }}> Create User </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <InputLabel id="role-label" sx={{ fontSize: 12, mx:2 }}>
                        Role
                    </InputLabel>
                    <Select sx={{ mb: 3, width: '50%' }}
                        id="role"
                        labelId="role-label"
                        value={values.role}
                        label="Role"
                        name='role'
                        onChange={handleChange}
                    >
                        <MenuItem value={"user"}>User</MenuItem>
                        <MenuItem value={"admin"}>Admin</MenuItem>
                    </Select>
                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="name"
                        label="Name"
                        name='name'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Enter Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                    />
                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="email"
                        label="Email"
                        name='email'
                        type={"email"}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Enter Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="password"
                        label="Password"
                        name='password'
                        type={"password"}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        elevation={0}
                        sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px", }}
                    // disabled={loading}
                    >
                        Create User
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default CreateUser