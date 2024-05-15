import { useCallback } from 'react';
import { Button, Badge } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Api from '../../components/Services/api';
import List from './List';
import { useNavigate } from 'react-router-dom';
import { Alert, IconButton,Snackbar } from '@mui/material';


const LeadCapture = () => {
  const navigate = useNavigate();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [count, setCount] = useState(0);
  const [newItem, setNewItem] = useState({
    firstName: '',
    location: '',
    status: '',
    group: '',
        maritalStatus: '',
    occupation: '',
    placeOfWork: '',
    digitalAddress: '',
        phoneNumber: '',
    secondaryPhoneNumber: '',
    baptismalDate: '',
    email: '',
        otherName: '',
    lastName: '',
  });
  const [loadScreen, setLoadScreen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [locations, setLocations] = useState([]);
  const [status, setStatus] = useState([]);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [groupSelect, setGroupSelect] = useState([]);

  const handleOpenModal = (value, selected_id) => {
    setOpenModal(value);
    setId(selected_id);
  };

  const handleChange = (value) => {
    setPage(value);
  };

  const handleDetail = (val, selected_id) => {
    if (val && selected_id !== 0) {
      getDetail(selected_id);
    }
    setOpenDetailModal(val);
  };

  function formatDate(date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}


  const handleSubmit = async (e) => {
    const data = {
     ...e,
     group: e.group.map(item => item.id),
     baptismalDate:e.baptismalDate ? formatDate(e.baptismalDate) : formatDate(new Date())
    };

    if (id === 0) {
      setLoading(true);
      await Api()
        .post('/members/', data)
        .then((res) => {
          let result = res.data.data;
          setLoading(false);
          const newItemList = [result, ...members];
          setMembers(newItemList);
          setOpenSnackbar(true);
          setAlert({
            open: true,
            message: 'Member added successfully',
            severity: 'success',
          });
          setShowCreateForm(false);
          setGroupSelect([]);
        })
        .catch((error) => {
          setLoading(false);
          setOpenSnackbar(true);
          setAlert({
            open: true,
            message: `Error adding member`,
            severity: 'error',
          });
          setShowCreateForm(false);
          setGroupSelect([]);
        });
    } else {
      setLoading(true);
      await Api()
        .patch(`/members/${id}/`, data)
        .then((res) => {
          let result = res.data.data;
          setLoading(false);

          let filteredList = members.filter((item) => item.id !== id);

          const newItemList = [result, ...filteredList];
          setMembers(newItemList);
          setOpenSnackbar(true);
          setAlert({
            open: true,
            message: 'Member edited successfully',
            severity: 'success',
          });
          setShowCreateForm(false);
        })
        .catch((error) => {
          setLoading(false);
          setId(0);
          setOpenSnackbar(true);
          setAlert({
            open: true,
            message: `${error?.response?.data?.error}`,
            severity: 'error',
          });
          setShowCreateForm(false);
        });
    }
  };

  const handleDelete = () => {
    setLoading(true);
    Api()
      .delete(`/members/${id}`)
      .then(() => {
        setLoading(false);
        let newItemList = members.filter((user) => user.id !== id);
        setMembers(newItemList);
        setOpenSnackbar(true);
        setAlert({
          open: true,
          message: 'Member deleted successfully',
          severity: 'success',
        });
        handleOpenModal(false);
        setId(0);
      })
      .catch(() => {
        setLoading(false);
        setOpenSnackbar(true);
        setAlert({
          open: true,
          message: 'Error deleting member',
          severity: 'success',
        });
        handleOpenModal(false);
        setId(0);
      });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const FarmData = useCallback(async () => {
    await Api()
      .get(`/members?page=${paginationModel.page + 1}`)
      .then((res) => {
        setMembers(res.data.data.results);
        setCount(res.data.data.count);
        setLoadScreen(false);
      })
      .catch(() => {
        setLoadScreen(false);
        setOpenSnackbar(true);
        setAlert({
          open: true,
          message: 'Error in fetching',
          severity: 'error',
        });
      });
  }, [paginationModel.page]);

  const Literals = async () => {
    await Api()
      .get(`/literals/all`)
      .then((res) => {
        setGroups(res.data.data.groups);
        setStatus(res.data.data.statuses)
        setLocations(res.data.data.locations)
      })
      .catch(() => {
        setOpenSnackbar(true);
        setAlert({
          open: true,
          message: 'Error in fetching literaks',
          severity: 'error',
        });
      });
  };


  const getDetail = (val) => {
    let selectedItem = members.find((item) => item?.id === val);
console.log(selectedItem);
    setNewItem(selectedItem);
  };

  console.log(newItem);

  const handleCreateEdit = (val, selected_id) => {
    setShowCreateForm(val);
    setNewItem({
      firstName: '',
      location: '',
      status: '',
      group: '',
          maritalStatus: '',
      occupation: '',
      placeOfWork: '',
      digitalAddress: '',
          phoneNumber: '',
      secondaryPhoneNumber: '',
      baptismalDate: '',
      email: '',
          otherName: '',
      lastName: '',
    });

    if (val && selected_id) {
      getDetail(selected_id);
    }
  };

  const handleSectors = () => {
    navigate('/app/farming/sectors');
  };

  useEffect(() => {
    let active = true;

    (async () => {
      setLoadScreen(true);
      FarmData();
      Literals();
      localStorage.removeItem('leadId');
      localStorage.removeItem('leadIds');
      if (!active) {
        return;
      }

      setLoadScreen(false);
    })();

    return () => {
      active = false;
    };
  }, [paginationModel.page, FarmData]);

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => handleSnackbarClose(false)}
      >
        <Alert
          severity={`${alert.severity}`}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert({
                  open: false,
                  message: '',
                  severity: '',
                });
              }}
            ></IconButton>
          }
        >
          {alert.message}
        </Alert>
      </Snackbar>

    <div>
     

       <div className="h-16 p-2 bg-[#FCFCFD] w-full mt-2 flex items-center">
        <h3 className="text-left text-[#475467] font-bold m-auto ml-4 text-xl  leading-8 lato-bold">
          {' '}
          All Members
        </h3>
      </div>
      <hr className="w-full h-px  bg-gray-200 border-0" />

      <div className=" flex mt-4">
        <Button.Group className="">
          <Button size="xs" color="gray" className="capitalize font-bold">
            Total Members
            <Badge color="gray" className="ml-2">
              1
            </Badge>
          </Button>
          <Button size="xs" color="gray" className="capitalize font-bold">
            Status
            <Badge color="gray" className="ml-2">
              8
            </Badge>
          </Button>
          <Button size="xs" color="gray" className="capitalize font-bold">
            Location
            <Badge color="gray" className="ml-2">
              1
            </Badge>
          </Button>
        </Button.Group>

        <Button.Group className="ml-5">
          <Button size="xs" color="gray" className="capitalize font-bold">
            total members
            <Badge color="gray" className="ml-2">
              173,097
            </Badge>
          </Button>
          <Button size="xs" color="gray" className="capitalize font-bold">
            baptized members
            <Badge color="gray" className="ml-2">
              1,097
            </Badge>
          </Button>
          <Button size="xs" color="gray" className="capitalize font-bold">
            occupation 
            <Badge color="gray" className="ml-2">
              172,000
            </Badge>
          </Button>
        </Button.Group>

        <Button.Group className="ml-6">
          <Button size="xs" color="gray" className="capitalize font-bold">
            active members
            <Badge color="gray" className="ml-2">
              1
            </Badge>
          </Button>
        </Button.Group>
      </div>
      <hr className=" h-[1.5px]  bg-gray-200 border-0  mt-4" />
      <div className="h-[71px] p-2 bg-[#F9FAFB] mt-4 mb-4 flex items-center justify-between w-full">
  <div className="flex items-center">
    <p className="text-left text-[#1D2939] text-base font-medium mt-auto mb-auto ml-2 leading-8">
      All Members
    </p>
  </div>
  <div className="flex items-center">
    <div className="relative mr-24">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          fill="none"
          stroke="#667085"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
        >
          <path d="M19 11 A8 8 0 0 1 11 19 A8 8 0 0 1 3 11 A8 8 0 0 1 19 11 z" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </div>
      <input
        type="text"
        id="email-address-icon"
        className="listInput"
        placeholder="Search by First Name / Last Name / Location"
      />
    </div>
    <button
      type="button"
      className="create-button ml-2"
      onClick={() => handleCreateEdit(true)}
    >
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        height="1.2em"
        width="2em"
      >
        <defs>
          <style />
        </defs>
        <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
        <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
      </svg>
      Add New Member
    </button>
  </div>
</div>

      <div>

        <List
          loadScreen={loadScreen}
          anchor={anchor}
          setAnchor={setAnchor}
          newItem={newItem}
          showCreateForm={showCreateForm}
          handleSnackbarClose={handleSnackbarClose}
          setAlert={setAlert}
          handleSectors={handleSectors}
          handleOpenModal={handleOpenModal}
          handleChange={handleChange}
          handleDetail={handleDetail}
          handleSubmit={handleSubmit}
          setNewItem={setNewItem}
          openModal={openModal}
          setOpenModal={setOpenModal}
          paginationModel={paginationModel}
          count={count}
          setPaginationModel={setPaginationModel}
          handleCreateEdit={handleCreateEdit}
          members={members}
          groups={groups}
          groupSelect={groupSelect}
          setGroupSelect={setGroupSelect}
          status={status}
          locations={locations}
          openSnackbar={openSnackbar}
          loading={loading}
          handleDelete={handleDelete}
          openDetailModal={openDetailModal}
          page={page}
          alert={alert}
        />
      </div>
    </div>
    </>
  );
};

export default LeadCapture;
