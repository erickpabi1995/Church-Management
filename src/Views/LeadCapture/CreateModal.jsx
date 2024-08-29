import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { ClipLoader } from 'react-spinners';
import Create from './Create';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const CreateModal = ({
  handleCreateEdit,
  loading,
  handleSubmit,
  newItem,
  leadSources,
  groupSelect,
  setGroupSelect,
  leadTypes,
  showCreateForm,
  setNewItem,
  groups,
  locations,
  status,
  placeOfWork,
  id,
}) => {

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: newItem?.firstName,
      lastName: newItem?.lastName,
      maritalStatus:newItem?.maritalStatus,
      baptismalDate: newItem?.baptismalDate,
      email: newItem?.email,
      secondaryEmail: newItem?.secondaryEmail,
      phoneNumber: newItem?.phoneNumber,
      secondaryPhoneNumber: newItem?.secondaryPhoneNumber,
      occupation: newItem?.occupation,
      location: newItem?.location,
      digitalAddress: newItem?.digitalAddress,
      status:newItem.status,
      group:groupSelect,
      placeOfWork:newItem?.placeOfWork,
      otherName:newItem?.otherName,
      gender:newItem?.gender,
      numberOfChildren:newItem?.numberOfChildren,
      
    

    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      location: Yup.string().required('Required'),
      gender: Yup.string().required('Required'),
      numberOfChildren: Yup.string().required('Required'),
      
        group: Yup.array()
            .of(
                Yup.object().shape({
                    label: Yup.string().required('Label is required'),
                    id: Yup.string().required('ID is required'),
                })
            )
            .min(1, 'At least one group must be selected')
            .required('Group is required'),
      maritalStatus: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();

    
    },
  });

  return (
    <>
      <div></div>

      <Dialog
        className="bg-gradient-to-r from-[#1378A526] to-[#005EA900] border border-solid border-[#1378A54A] shadow-lg w-full"
        open={showCreateForm}
        onClose={() => handleCreateEdit(false)}
        maxWidth="md"
        fullWidth
      >
        <div className="flex justify-between">
          <div className="bg-gradient-to-r from-[#1378A526] to-[#005EA900] border border-solid border-[#1378A54A] shadow-lg w-full">
            <DialogTitle>{id ? 'Edit Member' :'Add Member' }</DialogTitle>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} >
          <DialogContent style={{ paddingTop: '0.625rem' }}>
            <Create
              leadTypes={leadTypes}
              leadSources={leadSources}
              newItem={newItem}
              formik={formik}
              groups={groups}
              status={status}
              locations={locations}
              setNewItem={setNewItem}
            />
          </DialogContent>
          <DialogActions className="mt-4 mr-4">
            <Button onClick={() => handleCreateEdit(false)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {' '}
              {loading && (
                <div>
                  <ClipLoader size={15} color="#1b98e0" loading />
                </div>
              )}
              {loading ? 'Saving ...' : 'Save'}{' '}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateModal;

CreateModal.propTypes = {
  handleCreateEdit: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  newItem: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    leadSource: PropTypes.string.isRequired,
    leadType: PropTypes.string.isRequired,
    leadStatus: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    secondaryEmail: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    secondaryPhoneNumber: PropTypes.string.isRequired,
    gener: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    numberOfChildren: PropTypes.string.isRequired,

    
  }),
  leadSources: PropTypes.array.isRequired,
  leadTypes: PropTypes.array.isRequired,
  showCreateForm: PropTypes.bool.isRequired,
  numberOfChildren: PropTypes.bool.isRequired,
  setNewItem: PropTypes.func.isRequired,
  
};
