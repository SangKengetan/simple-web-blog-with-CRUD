import { Box, Button, TextField, Typography, InputLabel, Select, MenuItem } from '@mui/material'
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



const EditUser = () => {

    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

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
            email,
            password: '',
            role
        },

        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            updateUser(values);
            //alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });


    //show user by Id
    const singleUserById = async () => {
        // console.log(id)
        try {
            const { data } = await axios.get(`/api/user/${id}`);
            setName(data.user.name);
            setEmail(data.user.email);
            setPassword(data.user.password);
            setRole(data.user.role);
            console.log('single data user', data.user)

        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    }

    useEffect(() => {
        singleUserById()
    }, [])

    const updateUser = async (values) => {
        try {
            const { data } = await axios.put(`/api/update/user/${id}`, values);
            if (data.success === true) {
                toast.success('user updated');
                navigate('/admin/users')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }


    return (
        <>
            <Box sx={{ bgcolor: "white", padding: "20px 200px" }}>
                <Typography variant='h5' sx={{ pb: 4 }}> Edit User </Typography>
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
                        Update user
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default EditUser