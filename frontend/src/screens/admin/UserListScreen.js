import React from 'react'
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Image } from "react-bootstrap"
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa"
import Message from "../../components/Message.js"
import Loader from "../../components/Loader.js"
import { toast } from 'react-toastify'
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice.js'

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery()
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id)
        toast.success('User deleted')
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <>
      <h1 className='mt-5'>Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
        (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th> {/* Added Image column */}
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>MERCHANT</th> {/* Added Merchant column */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>
                    {user.image ? (
                      <Image
                        src={user.image} // Assuming the image URL is stored in 'user.image'
                        alt="User"
                        roundedCircle
                        width={40}
                        height={40}
                      />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {user.isMerchant ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}>
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </>
  )
}

export default UserListScreen
