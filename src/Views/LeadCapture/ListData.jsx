import React, {  useEffect } from 'react';
import { Modal } from 'flowbite-react';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Table } from 'flowbite-react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Pagination } from '@mui/material';

const ListData = ({
  handleSectors,
  members,
  handleCreateEdit,
  count,
  handleChange,
  page,
  openModal,
  handleOpenModal,
  loading,
  handleDelete,
}) => {
  useEffect(() => {
    // Call a function to fetch data when the page changes
    // This assumes you have a function that fetches data based on the page number
    // e.g., fetchData(page);
  }, [page]);

  return (
    <>
      <Modal size={'lg'} show={openModal} onClose={() => handleOpenModal(false)}>
        <Modal.Body>
          <div className="flex">
            <img src="../images/deleteIcon.svg" alt="deleteIcon" />
            <p className="font-semibold leading-7 mt-4 ml-4">Delete Member</p>
          </div>

          <p className="text-sm text-left leading-28 ml-16 mb-8">
            Are you sure you want to delete this entry? This action cannot be undone
          </p>
          <div className="flex justify-between">
            <div className="ml-16 mt-2"></div>
            <div className="flex">
              <button type="button" className="light-button" onClick={() => handleOpenModal(false)}>
                Cancel
              </button>
              <button type="submit" className="warning-button" onClick={() => handleDelete()}>
                Delete
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="">
        {members.length > 0 ? (
          <Table hoverable className="overflow-x-auto">
            <Table.Head className="border bottom">
              <Table.HeadCell className="capitalize text-sm bg-white text-left sticky top-0">ID</Table.HeadCell>
              <Table.HeadCell className="capitalize text-sm bg-white text-left sticky top-0">first name</Table.HeadCell>
              <Table.HeadCell className="capitalize font-normal bg-white text-sm text-center sticky top-0">last name</Table.HeadCell>
              <Table.HeadCell className="capitalize font-normal bg-white text-sm text-center sticky top-0">gender</Table.HeadCell>
              <Table.HeadCell className="capitalize font-normal bg-white text-sm text-center sticky top-0">No.Children</Table.HeadCell>
              <Table.HeadCell className="capitalize font-normal bg-white text-sm text-center sticky top-0">marital status</Table.HeadCell>
              <Table.HeadCell className="capitalize font-normal bg-white text-sm text-center sticky top-0">phone number</Table.HeadCell>
              <Table.HeadCell className="capitalize font-normal bg-white text-sm text-center sticky top-0">baptismal date</Table.HeadCell>
              <Table.HeadCell className="capitalize font-normal bg-white text-sm text-center sticky top-0">group</Table.HeadCell>
              <Table.HeadCell className="capitalize font-normal bg-white text-sm text-center sticky top-0">location</Table.HeadCell>
              <Table.HeadCell className="capitalize font-normal bg-white text-sm text-center sticky top-0">digital address</Table.HeadCell>
              <Table.HeadCell className="capitalize font-normal bg-white text-sm text-center sticky top-0">profile</Table.HeadCell>
              <Table.HeadCell className="capitalize font-normal bg-white text-sm text-center sticky top-0">actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {members.map((item) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.id}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 text-sm cursor-pointer text-left" onClick={() => handleCreateEdit(true, item.id)}>
                    {item.uniqueId}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 text-sm cursor-pointer text-left" onClick={() => handleCreateEdit(true, item.id)}>
                    {item.firstName}
                  </Table.Cell>
                  <Table.Cell onClick={() => handleCreateEdit(true, item.id)} className="text-sm cursor-pointer text-center">
                    {item.lastName}
                  </Table.Cell>
                  <Table.Cell onClick={() => handleCreateEdit(true, item.id)} className="text-sm cursor-pointer text-center">
                    {item.gender}
                  </Table.Cell>
                  <Table.Cell onClick={() => handleCreateEdit(true, item.id)} className="text-sm cursor-pointer text-center">
                    {item.numberOfChildren > 0 ? item.numberOfChildren : '-'}
                  </Table.Cell>
                  <Table.Cell onClick={() => handleCreateEdit(true, item.id)} className="text-sm cursor-pointer text-center">
                    {item.maritalStatus}
                  </Table.Cell>
                  <Table.Cell onClick={() => handleCreateEdit(true, item.id)} className="text-sm cursor-pointer text-center">
                    {item.phoneNumber}
                  </Table.Cell>
                  <Table.Cell onClick={() => handleCreateEdit(true, item.id)} className="text-sm cursor-pointer text-center">
                    {item.baptismalDate}
                  </Table.Cell>
                  <Table.Cell onClick={() => handleCreateEdit(true, item.id)} className="text-sm cursor-pointer text-center">
                    {item.groupObj?.map((group) => group.name).join(', ')}
                  </Table.Cell>
                  <Table.Cell onClick={() => handleCreateEdit(true, item.id)} className="text-sm cursor-pointer text-center">
                    {item.locationName}
                  </Table.Cell>
                  <Table.Cell onClick={() => handleCreateEdit(true, item.id)} className="text-sm cursor-pointer text-center">
                    {item.digitalAddress}
                  </Table.Cell>
                  <Table.Cell onClick={() => handleCreateEdit(true, item.id)} className="text-sm cursor-pointer text-center">
                    {item.profile ? (
                      <img src={item.profile} alt="Profile" className="h-10 w-10 rounded-full profile-image" />
                    ) : (
                      <span>No Image</span>
                    )}
                  </Table.Cell>
                  <Table.Cell className="flex justify-center items-center text-sm">
                    <RiDeleteBin6Line onClick={() => handleOpenModal(true, item.id)} />
                    <FiEdit2 className="ml-4" onClick={() => handleCreateEdit(true, item.id)} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <div>
            <Player src="https://lottie.host/5cf625e5-3dea-419f-8815-339aa533aa8d/yb6ZA0nz5Q.json" loop autoplay className="w-64 h-48" />
            <p className="text-center">You haven’t created any member yet</p>
          </div>
        )}
      </div>

      {members.length > 0 && (
        <div className="flex justify-center mt-6 mb-8">
          <Pagination
            count={Math.ceil(count / 15)} // Use 15 per page to match backend and UI
            page={page} // page is 1-based, synced from parent
            shape="rounded"
            color="primary"
            size="medium" // Increased from small to medium
            onChange={(event, value) => handleChange(value)} 
          />
        </div>
      )}
    </>
  );
};

export default ListData;
