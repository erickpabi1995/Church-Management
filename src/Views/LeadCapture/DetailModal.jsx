import {
  Dialog,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  Button,
  IconButton,
  Alert, Snackbar 
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import Detail from "./Detail";

const DetailModal = ({
  openLeadStatus,
  leadStatus,
  handleLeadStatusSubmission,
  setLeadStatus,
  alert, 
  openSnackbar,
  noteEditorValue,
  setNoteEditorValue,
  handleNoteEdit,
  handleSnackbarClose,
  setAlert,
  handleLeadStatus,
  leadStatusData,
  leadStatusCounter,
}) => {
  console.log(leadStatusCounter);
  return (
    <div>
       <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={()=>handleSnackbarClose(false)}
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
                  message: "",
                  severity: "",
                });
              }}
            ></IconButton>
          }
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
    <div>
   
    </div>
      <Dialog
        maxWidth="sm"
        fullWidth="sm"
        open={openLeadStatus}
        onClose={() => handleLeadStatus(false)}
      >
        <div className="h-[60px] bg-[#0C4767] ">
         
        
          <IconButton onClick={() => handleLeadStatus(false)} className="float-right">
            <CloseIcon  />
          </IconButton>
          <h3 className="text-white text-center text-xl mt-4">
            Set Lead Status
          </h3>
         
        </div>
        <DialogContent>
          <div className="flex p-2">
          <p className="w-32">First Name:  </p> 
          <div className=""><p >{leadStatusData?.firstName}</p></div>
          </div>
         
        <div className="flex p-2">
        <p className="w-32">Last Name: </p>
        <p className="">{leadStatusData?.lastName}</p>
        </div>
          <div className="flex p-2">
         <p className="w-32">E-mail: </p>
         <p className="">{leadStatusData?.email}</p>
         </div>
         <div className="flex p-2">
         <p className="w-32">LeadType: </p>
         <p className="">{leadStatusData?.leadTypeName}</p>
         </div>
         <div className="flex p-2">
         <p className="w-32">LeadSource: </p>
         <p className="">{leadStatusData?.leadSourceName}</p>
         </div>
         <div className="flex p-2">
         <p className="w-32">Notes: </p>
         <div className=""> <Detail  noteEditorValue={ noteEditorValue}  setNoteEditorValue = {setNoteEditorValue}/></div>
         </div>
         <div className="flex p-2">
         <p className="w-32">Status: </p>
         <div className=""> <TextField
                autoFocus
                select
                name="lead_source"
                size="small"
                style={{ width: "200px" }}
                value={leadStatus}
                onChange={(e) => setLeadStatus(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="Hot">Hot</MenuItem>
                <MenuItem value="Warm">Warm</MenuItem>

                <MenuItem value="Cold">Cold</MenuItem>
              </TextField></div>
         </div>
      
         
         
        </DialogContent>
        <DialogActions className="mt-4">
          <Button onClick={() => handleLeadStatus(false)}>Cancel</Button>
          <Button variant="contained" onClick={()=>handleLeadStatusSubmission(leadStatusData?.id)}>
            {" "}
            Save{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DetailModal;
