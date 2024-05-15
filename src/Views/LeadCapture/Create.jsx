import { MenuItem, TextField, Grid, Autocomplete } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
const Create = ({
  formik,
  locations,
  groups,
  status,
}) => {
  const groupAutoComplete = [
    ...groups.map((item) => ({
      label: `${item.name}`,
      id: item.id,
    })),
  ];

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

console.log(formik.values.group);
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <div className="dialoglabel">
            <p>First Name *</p>
            <TextField
              autoFocus
              name="firstName"
              invalid={!!formik.errors.firstName}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="small"
              type="text"
              error={Boolean(
                formik.touched.firstName && formik.errors.firstName
              )}
              fullWidth
              helperText={
                formik.errors.firstName &&
                formik.touched.firstName &&
                String(formik.errors.firstName)
              }
              variant="outlined"
            />
          </div>
          <div className="dialoglabel">
            <p>Last Name *</p>
            <TextField
              autoFocus
              name="lastName"
              invalid={!!formik.errors.lastName}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="small"
              error={Boolean(
                formik.touched.lastName && formik.errors.lastName
              )}
              helperText={
                formik.errors.lastName &&
                formik.touched.lastName &&
                String(formik.errors.lastName)
              }
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="dialoglabel">
            <p>Email </p>
            <TextField
              autoFocus
              name="email"
              id="name"
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="dialoglabel">
            <p>Other Name </p>
            <TextField
              autoFocus
              name="otherName"
              size="small"
              value={formik.values.otherName}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
            />
          </div>

          <div className="dialoglabel">
            <p>Phone Number</p>
            <TextField
              autoFocus
              name="phoneNumber"
              id="phoneNumber"
              size="small"
              type="text"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
            />
          </div>

          <div className="dialoglabel">
            <p>Marital Status </p>
            <TextField
              autoFocus
              select
              name="maritalStatus"
              size="small"
              value={formik.values.maritalStatus}
              onChange={formik.handleChange}
              fullWidth
              invalid={!!formik.errors.maritalStatus}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.maritalStatus && formik.errors.maritalStatus
              )}
              helperText={
                formik.errors.maritalStatus &&
                formik.touched.maritalStatus &&
                String(formik.errors.maritalStatus)
              }
              variant="outlined"
            >
                <MenuItem value="">...Choose</MenuItem>
                <MenuItem value="married">Married</MenuItem>
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="divorced">Divorced</MenuItem>
                <MenuItem value="seperated">Seperated</MenuItem>
           
              </TextField>
          </div>
          <div className="dialoglabel">
            <p>Group *</p>
            <Autocomplete
                options={groupAutoComplete}
                name="group"
                multiple
                onChange={(e, value) => {
                    formik.setFieldValue('group', value);
                }}
                value={formik.values.group}
                renderOption={(props, item) => (
                    <li {...props} key={item.id}>
                        <MenuItem>{item.label}</MenuItem>
                    </li>
                )}
                size="small"
                className="shadow-sm"
                style={{ background: 'white' }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        helperText={
                            formik.errors.group &&
                            formik.touched.group &&
                            String(formik.errors.group)
                        }
                        error={Boolean(
                            formik.touched.group && formik.errors.group
                        )}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                    />
                )}
            />
    
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="dialoglabel">
            <p>Secondary Phone Number </p>
            <TextField
              autoFocus
              name="secondaryPhoneNumber"
              size="small"
              type="number"
              value={formik.values.secondaryPhoneNumber}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
            />
          </div>

          <div className="dialoglabel">
            <p>Location *</p>
            <TextField
              autoFocus
              name="location"
              select
              size="small"
              value={formik.values.location}
              onChange={formik.handleChange}
              invalid={!!formik.errors.location}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.location && formik.errors.location
              )}
              fullWidth
              variant="outlined"
              helperText={
                formik.errors.location &&
                formik.touched.location &&
                String(formik.errors.location)
              }
            >
               <MenuItem value="">...Choose</MenuItem>
              {locations?.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
              </TextField>
          </div>

          <div className="dialoglabel">
            <p>Digital Address</p>
            <TextField
              fullWidth
              size='small'
              name="digitalAddress"
              value={formik.values.digitalAddress}
              onChange={formik.handleChange}
            />
          </div>

          <div className="dialoglabel">
            <p>Occupation</p>
            <TextField
              autoFocus
              name="occupation"
              size="small"
              value={formik.values.occupation}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
            />
          </div>

          <div className="dialoglabel">
            <p>Place of Work </p>
            <TextField
              autoFocus
              name="placeOfWork"
              size="small"
              value={formik.values.placeOfWork}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
            />
          </div>

          <div className="dialoglabel">
            <p>Baptismal Date</p>
            <TextField
              autoFocus
              name="baptismalDate"
              size="small"
              type='date'
              value={formik.values.baptismalDate}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
              inputProps={{
                max: getCurrentDate(),
            }}
            />
          </div>
          <div className="dialoglabel">
            <p>Status *</p>
            <TextField
              autoFocus
              name="status"
              select
              size="small"
              value={formik.values.status}
              onChange={formik.handleChange}
              invalid={!!formik.errors.status}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.status && formik.errors.status
              )}
              fullWidth
              variant="outlined"
              helperText={
                formik.errors.status &&
                formik.touched.status &&
                String(formik.errors.status)
              }
            >
               <MenuItem value="">...Choose</MenuItem>
              {status?.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
              </TextField>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Create;

Create.propTypes = {
  formik: PropTypes.func.isRequired,
  leadSources: PropTypes.array.isRequired,
  leadTypes: PropTypes.array.isRequired,
  stateList: PropTypes.array.isRequired,
  setCityList: PropTypes.func.isRequired,
  setStateList: PropTypes.func.isRequired,
  setStateId: PropTypes.func.isRequired,
  stateId: PropTypes.string.isRequired,
  cityId: PropTypes.string.isRequired,
  setCityName: PropTypes.func.isRequired,
  setStateName: PropTypes.func.isRequired,
  GetCity: PropTypes.func.isRequired,
  setCityId: PropTypes.func.isRequired,
  cityList: PropTypes.array.isRequired,
};
