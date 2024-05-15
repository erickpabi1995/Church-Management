import { DataGrid } from "@mui/x-data-grid";
import { Dialog, DialogContent, Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ClipLoader } from "react-spinners";
import { Button } from "@mui/material";
import DetailModal from "./DetailModal";
import { Player } from '@lottiefiles/react-lottie-player';

const ListData = ({
  QuickSearchToolbar,
  anchor,
  setAnchor,
  handleLeadStatus,
  setLeadStatus,
  setNoteEditorValue,
  noteEditorValue,
  handleLeadStatusSubmission,
  handleLeadStatusChange,
  openAnchor,
  handleSnackbarClose,
  setAlert,
  alert,
  openSnackbar,
  openLeadStatus,
  leadStatusCounter,
  newItem,
  openModal,
  leadStatusData,
  handleOpenModal,
  loading,
  leadStatus,
  leadCaptures,
  setNewItem,
  handleCreateEdit,
  handleCloseMenu,
  handleDelete,
}) => {
  const handleClick = (event, params) => {
    setNewItem(params.row);
    setAnchor(event.currentTarget);
  };

console.log(leadCaptures);

  const columns = [
    { field: "firstName", headerName: "First name", width: 100,  renderCell: (params)=>{
      return(
          <p onClick={()=>handleLeadStatus(true,params.row)}>
          
          {params.row.firstName}
          </p>
      )
    } },
    { field: "lastName", headerName: "Last name", width: 130,  renderCell: (params)=>{
      return(
          <p onClick={()=>handleLeadStatus(true,params.row)}>
          
          {params.row.lastName}
          </p>
      )
    } },
    { field: "email", headerName: "E-mail", width: 130,  renderCell: (params)=>{
      return(
          <p onClick={()=>handleLeadStatus(true,params.row)}>
          
          {params.row.email}
          </p>
      )
    } },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 100,
      renderCell: (params)=>{
        return(
            <p onClick={()=>handleLeadStatus(true,params.row)}>
            
            {params.row.phoneNumber}
            </p>
        )
      }
    },
    {
      field: "leadSourceName",
      headerName: "Lead Source",
      width: 130,
      renderCell: (params)=>{
        return(
            <p onClick={()=>handleLeadStatus(true,params.row)}>
            
            {params.row.leadSourceName}
            </p>
        )
      }
    },
    {
      field: "leadTypeName",
      headerName: "Lead Type",
      width: 130,
      renderCell: (params)=>{
        return(
            <p onClick={()=>handleLeadStatus(true,params.row)}>
            
            {params.row.leadTypeName}
            </p>
        )
      }
    },
    {
      field: "note",
      headerName: "Notes",
      width: 130,
      renderCell: (params)=>{
        return(
            <p onClick={()=>handleLeadStatus(true,params.row)}>
            
            {params.row.note}
            </p>
        )
      }
     
    },
    
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return <MoreVertIcon onClick={(e) => handleClick(e, params)} />;
      },
    },
  ];

  return (
    <>
      <Dialog
        maxWidth="xs"
        fullWidth
        open={openModal}
        onClose={() => handleOpenModal(false)}
      >
        <DialogContent>
          <p className="mb-6">Are you sure you want to delete this record?</p>
          <div className="flex justify-between">
            <div>
              <Button
                variant="contained"
                className="cursor-pointer"
                color="primary"
                onClick={() => handleOpenModal(false)}
              >
                No
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                className="cursor-pointer bg-red-500"
                color="error"
                type="submit"
                onClick={handleDelete}
              >
                {loading && (
                  <div style={{ marginRight: "5px" }}>
                    <ClipLoader size={20} color="#1b98e0" loading />
                  </div>
                )}
                Yes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div>
        <DetailModal openLeadStatus={openLeadStatus} 
        setLeadStatus={setLeadStatus}
        alert={alert}
        setNoteEditorValue = {setNoteEditorValue}
        handleSnackbarClose={handleSnackbarClose}
        noteEditorValue = { noteEditorValue}
        setAlert={setAlert}
        openSnackbar={openSnackbar}
        handleLeadStatusSubmission={handleLeadStatusSubmission}
        handleLeadStatus={handleLeadStatus} leadStatusCounter={leadStatusCounter}
        leadStatusData = {leadStatusData} handleLeadStatusChange = {handleLeadStatusChange} leadStatus = {leadStatus}
        />
      </div>
      {leadCaptures.length > 0 ? (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={leadCaptures}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            slots={{ toolbar: QuickSearchToolbar }}
            
            pageSizeOptions={[5, 10]}
          />

          <Menu
            id="basic-menu"
            anchorEl={anchor}
            open={openAnchor}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleCreateEdit(true, newItem.id)}>
              <EditIcon className="mr-2" color="primary" /> Edit
            </MenuItem>
            <MenuItem onClick={() => handleOpenModal(true, newItem)}>
              <DeleteIcon className="mr-2" color="warning" /> Delete
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <div>
           <Player src='https://lottie.host/5cf625e5-3dea-419f-8815-339aa533aa8d/yb6ZA0nz5Q.json' loop autoplay className="w-64 h-64"/> 
           <p>You haven’t created any leads yet :(</p>
        </div>
      )}
    </>
  );
};

export default ListData;
