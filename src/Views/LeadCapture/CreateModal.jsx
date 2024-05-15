import { Button, Dialog, DialogActions, DialogContent, IconButton } from "@mui/material";
import { ClipLoader } from "react-spinners";
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Snackbar } from '@mui/material';
import Create from "./Create";
import {  useFormik } from "formik";
import * as Yup from 'yup'


const CreateModal = ({handleCreateEdit,
    handleSnackbarClose,
    setAlert, loading, handleSubmit, alert, openSnackbar,newItem,
    leadSources,leadTypes, showCreateForm,setNewItem
}) => {


  const formik = useFormik({
    enableReinitialize:true,
    initialValues:{
    
      first_name:newItem.firstName,
      last_name:newItem?.lastName,
      lead_source:newItem?.leadSource,
      email:newItem?.email,
      phone_number:newItem?.phoneNumber,
      notes:newItem?.note,
      lead_type:newItem?.leadType

    

    },
    validationSchema: Yup.object({
      
       first_name:Yup.string()
       .required('Required'),
       last_name:Yup.string()
       .required('Required'),
       email:Yup.string().email('Invalid email address').required('Required'),
       phone_number:Yup.string()
       .required('Required'),
       notes:Yup.string()
       .required('Required'),
       lead_type:Yup.string()
       .required('Required'),
       
       
    }),
    onSubmit:(values,{resetForm}) => {
      handleSubmit(values);
      resetForm()
    }
   
  })
return(

    <>
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
      
    <Dialog open={showCreateForm} onClose={()=>handleCreateEdit(false)} maxWidth='sm'    fullWidth>
      <div className='flex justify-between'>
    
    <div>
    <h3 className='dialoglabel ml-6'>Add Lead</h3>
    </div>
    <IconButton onClick={()=>handleCreateEdit(false)}>
        <CloseIcon />
    </IconButton>

      </div>
 

    <form onSubmit={formik.handleSubmit}>
      <DialogContent style={{ paddingTop: "0.625rem" }} >
     
<Create  leadTypes={leadTypes} leadSources = {leadSources} newItem={newItem}
formik={formik}
setNewItem={setNewItem}
/>
     
      </DialogContent>
      <DialogActions className='mt-4'>
        <Button onClick={()=>handleCreateEdit(false)}>Cancel</Button>
        <Button type='submit' variant='contained' disabled={loading}
       
        >  {loading && (
          <div>
            <ClipLoader size={15} color="#1b98e0" loading />
          </div>
        )}
        {loading ? "Adding ..." : "Add"} </Button>
      </DialogActions>
      </form>
    </Dialog>
    
  </>
)
}

export default CreateModal