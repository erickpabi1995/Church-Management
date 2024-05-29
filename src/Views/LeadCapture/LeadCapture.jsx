import { useCallback } from 'react';
import { Button, Badge } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Api from '../../components/Services/api';
import List from './List';
// import { useNavigate } from 'react-router-dom';
import { Alert, IconButton,Snackbar } from '@mui/material';
import MembersReportModal from './MembersReportModal'; 


const LeadCapture = () => {
  // const navigate = useNavigate();
  const [maritalStatusOptions, setMaritalStatusOptions] = useState([]);
  const [MembersReport, setMembersReport] = useState([]);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [reportIsReady, SetreportIsReady] = useState(false);


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
    profile: null, 

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


const handleOpenReportModal = () => setOpenReportModal(true);
const handleCloseReportModal = () => setOpenReportModal(false);



  const handleSubmit = async (e) => {
    const data = {
     ...e,
     group: e.group.map(item => item.id),
     baptismalDate:e.baptismalDate ? formatDate(new Date(e.baptismalDate)) : formatDate(new Date())
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




  const fetchDataWithSearchParams = async () => {
    setLoadScreen(true);
    const occupation = document.getElementById('occupation_search').value;
    const location = document.getElementById('location_search').value;
    const phone_number = document.getElementById('phone_number_search').value;
    const status = document.getElementById('church_status_search').value;
    const gender = document.getElementById('gender_search').value;
    const search=document.getElementById('search').value;

    const queryParams = new URLSearchParams({
      occupation: occupation,
      location: location,
      phone_number: phone_number,
      status: status,
      gender: gender,
      search:search
    }).toString();

    try {
      const res = await Api().get(`/members?page=${paginationModel.page + 1}&${queryParams}`);

      setMembers(res.data.data.results);
      setCount(res.data.data.count);
      setLoadScreen(false);
    } catch (error) {
      setLoadScreen(false);
      setOpenSnackbar(true);
      setAlert({
        open: true,
        message: 'Error in fetching',
        severity: 'error',
      });
    }
  };

  const Literals = async () => {
    await Api()
      .get(`/literals/all`)
      .then((res) => {
        setGroups(res.data.data.groups);
        setStatus(res.data.data.statuses)
        setLocations(res.data.data.locations)
        setMaritalStatusOptions(res.data.data.statuses); 

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
  

  const MembersReports = async () => {
 
    await Api()
      .get(`/members/reports/`)
      .then((res) => {
        SetreportIsReady(true)
        setMembersReport(res.data.data); 
       ;
      })
      .catch(() => {
        SetreportIsReady(true);
        setAlert({
          open: true,
          message: 'Error in fetching members reports',
          severity: 'error',
        });
      });
  };



  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const button = document.getElementById('searchButton');
      if (button) {
        button.click();
      }
    }
  };
  
  


  const getDetail = (val) => {
    let selectedItem = members.find((item) => item?.id === val);
    setNewItem(selectedItem);
    setId(selectedItem.id)
    setGroupSelect( selectedItem?.groupObj?.map((item) => ({
      label: `${item.name}`,
      id: item.id,
    })),)
  };



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

  // const handleSectors = () => {
    // navigate('/app/farming/sectors');
  // };


  

  useEffect(() => {
    let active = true;

    (async () => {
      setLoadScreen(true);
      FarmData();
      Literals();
      MembersReports();
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
     

      
      <hr className="w-full h-px  bg-gray-200 border-0" />

      <div className=" flex mt-4">
        <Button.Group className="">
          <Button size="xs" color="gray" className="capitalize font-bold">
            Total Members 
            <Badge color="gray" className="ml-2">
            {MembersReport.totalMembers}
            </Badge>
          </Button>
          
        
        </Button.Group>

        <Button.Group className="ml-5">
          <Button size="xs" color="gray" className="capitalize font-bold">
            Working Members
            <Badge color="gray" className="ml-2">
              {MembersReport.totalMembersWithOccupation}
            </Badge>
          </Button>
          <Button size="xs" color="gray" className="capitalize font-bold">
            baptized members
            <Badge color="gray" className="ml-2">
              {MembersReport.totalMembersBaptised}
            </Badge>
          </Button>
          
        </Button.Group>

        <Button.Group className="ml-6">
          <Button size="xs" color="gray" className="capitalize font-bold">
            Active Members
            <Badge color="gray" className="ml-2">
              {MembersReport.activeMembers}
            </Badge>
          </Button>
          
        </Button.Group>

        <Button.Group className="ml-6">
        <Button
          size="xs"
          color="gray"
          className="capitalize font-bold"
          onClick={handleOpenReportModal}
        >
          View More
        </Button>
      </Button.Group>
   
   
  <MembersReportModal
    open={openReportModal}
    handleClose={handleCloseReportModal}
    reportData={MembersReport}
    reportIsReady={reportIsReady}
  />

      </div>
      <hr className=" h-[1.5px]  bg-gray-200 border-0  mt-4" />
      <div className="h-[71px] p-2 bg-[#F9FAFB] mt-4 mb-4 flex items-center justify-between w-full">
  <div className="flex items-center">
   
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
        id="occupation_search"
        className="listInput"
        placeholder="Search by Occupation"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
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
        id="location_search"
        className="listInput"
        placeholder="Search by location"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
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
        id="phone_number_search"
        className="listInput"
        placeholder="Search by phone_number"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>

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
      <select
          id="gender_search"
          className="listInput"
          defaultValue="" 
          onChange={(e) => {
          }}
          onKeyPress={handleKeyPress}
        >
          <option value="">Search by  Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
    </div>

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
      <select
          id="church_status_search"
          className="listInput"
          defaultValue="" 
          onChange={(e) => {
          }}
          onKeyPress={handleKeyPress}
        >
          <option value="">Search by  status</option>
          {maritalStatusOptions.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
    </div>

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
        id="search"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={handleKeyPress}
        className="listInput"
        placeholder="First Name / Last Name / ID"
      />
    </div>

    <button
      type="button"
      className="create-button ml-2"
      id='searchButton'
      onClick={fetchDataWithSearchParams}

      
     

      
     
    >
      <svg
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  height="1.2em"
  width="2em"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M9 3a6 6 0 114.243 10.243l5.657 5.657-1.414 1.414-5.657-5.657A6 6 0 019 3zm0 2a4 4 0 100 8 4 4 0 000-8z"
    fill="currentColor"
  />
</svg>
      Search
    </button>


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
      Add<span style={{ marginLeft: '0.5rem' }}>Member</span>

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
          // handleSectors={handleSectors}
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
