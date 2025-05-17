import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from "react-toastify";
import { useUpdateUserMutation, useGetUserDetailsQuery, useUploadUserImageMutation } from '../../slices/usersApiSlice.js';

const UserEditScreen = () => {
    const { id: userId } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMerchant, setIsMerchant] = useState(false);
    const [image, setImage] = useState("");

    const { data: user, isLoading, error } = useGetUserDetailsQuery(userId);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
    const [uploadUserImage, { isLoading: loadingUpload }] = useUploadUserImageMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
            setIsMerchant(user.isMerchant);
            setImage(user.image || ""); // Set the current image
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId, name, email, isAdmin, isMerchant, image });
            toast.success('User updated successfully');
            navigate('/admin/userlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadUserImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image); // Update the image with the uploaded URL
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <Link to="/admin/userlist" className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}

                {isLoading ? <Loader /> : error ? <Message variant="danger" /> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name" className='my-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email" className='my-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isAdmin' className='my-2'>
                            <Form.Check
                                type='checkbox'
                                label='isAdmin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Form.Group controlId='isMerchant' className='my-2'>
                            <Form.Check
                                type='checkbox'
                                label='isMerchant'
                                checked={isMerchant}
                                onChange={(e) => setIsMerchant(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Form.Group controlId='image' className='my-2'>
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Image URL'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.Control
                                type='file'
                                label='Choose file'
                                onChange={uploadFileHandler}
                            ></Form.Control>
                        </Form.Group>
                        {loadingUpload && <Loader />}

                        <Button
                            type='submit'
                            variant='primary'
                            className='my-2'
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;
