import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader.js';
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container
  fluid
  className='d-flex align-items-center justify-content-center min-vh-100 p-0'
  style={{ overflow: 'hidden' }}
>
      <Row className='w-100 justify-content-center m-0 p-0'>
        <Col xs={12} sm={10} md={8} lg={5}>
          <div className='bg-light p-4 p-sm-5 rounded-4 shadow login-wrapper'>
            <h1 className='mb-4 text-center fw-bold'>Sign In</h1>

            <Form onSubmit={submitHandler} className='login-form'>
              <Form.Group controlId='email' className='mb-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='password' className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                type='submit'
                variant='primary'
                className='w-100 mt-3 py-2 rounded-pill fw-semibold'
                disabled={isLoading}
              >
                Sign In
              </Button>

              {isLoading && <Loader />}
            </Form>

            <Row className='py-3'>
              <Col className='text-center'>
                New Customer?{' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                  Register
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
