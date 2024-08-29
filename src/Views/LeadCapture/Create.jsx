import { MenuItem, TextField, Grid, Autocomplete } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Create = ({ formik, locations, groups, status, newItem }) => {
  const [imagePreview, setImagePreview] = useState(newItem.profile ? newItem.profile : null);

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue('profile', file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <div className="dialoglabel">
            <p>First Name *</p>
            <TextField
              autoFocus
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="small"
              type="text"
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              fullWidth
              helperText={formik.errors.firstName && formik.touched.firstName && String(formik.errors.firstName)}
              variant="outlined"
            />
          </div>
          <div className="dialoglabel">
            <p>Last Name *</p>
            <TextField
              autoFocus
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="small"
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.errors.lastName && formik.touched.lastName && String(formik.errors.lastName)}
              variant="outlined"
            />
          </div>

          <div className="dialoglabel">
            <p>Gender *</p>
            <TextField
              autoFocus
              select
              name="gender"
              size="small"
              value={formik.values.gender}
              onChange={formik.handleChange}
              fullWidth
              error={Boolean(formik.touched.gender && formik.errors.gender)}
              onBlur={formik.handleBlur}
              helperText={formik.errors.gender && formik.touched.gender && String(formik.errors.gender)}
              variant="outlined"
            >
              <MenuItem value="">...Choose</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </div>

          <div className="dialoglabel">
            <p>No. Children</p>
            <TextField
              autoFocus
              name="numberOfChildren"
              id="numberOfChildren"
              size="small"
              value={formik.values.numberOfChildren } 
              

              onChange={formik.handleChange}
              type="number"
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="dialoglabel">
            <p>Email</p>
            <TextField
              autoFocus
              name="email"
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="dialoglabel">
            <p>Other Name</p>
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
              size="small"
              type="text"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="dialoglabel">
            <p>Marital Status</p>
            <TextField
              autoFocus
              select
              name="maritalStatus"
              size="small"
              value={formik.values.maritalStatus}
              onChange={formik.handleChange}
              fullWidth
              error={Boolean(formik.touched.maritalStatus && formik.errors.maritalStatus)}
              onBlur={formik.handleBlur}
              helperText={formik.errors.maritalStatus && formik.touched.maritalStatus && String(formik.errors.maritalStatus)}
              variant="outlined"
            >
              <MenuItem value="">...Choose</MenuItem>
              <MenuItem value="married">Married</MenuItem>
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="divorced">Divorced</MenuItem>
              <MenuItem value="separated">Separated</MenuItem>
            </TextField>
          </div>
          <div className="dialoglabel">
            <p>Group *</p>
            <Autocomplete
              options={groupAutoComplete}
              name="group"
              multiple
              onChange={(e, value) => formik.setFieldValue('group', value)}
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
                  helperText={formik.errors.group && formik.touched.group && String(formik.errors.group)}
                  error={Boolean(formik.touched.group && formik.errors.group)}
                  onBlur={formik.handleBlur}
                  variant="outlined"
                />
              )}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="dialoglabel">
            <p>Secondary Phone Number</p>
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
            <p>Profile</p>
            <input
              type="file"
              name="profile"
              onChange={(event) => {
                handleImageChange(event);
                formik.setFieldValue("profile", event.currentTarget.files[0]);
              }}
              style={{ marginTop: '8px', marginBottom: '8px' }}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Profile Preview"
                style={{ marginTop: '8px', maxHeight: '200px' }}
              />
            )}
          </div>
          <div className="dialoglabel">
            <p>Location *</p>
            <Autocomplete
              freeSolo
              options={locations.map((item) => item.name)}
              value={formik.values.location}
              onChange={(event, newValue) => {
                formik.setFieldValue('location', newValue);
              }}
              onInputChange={(event, newInputValue) => {
                formik.setFieldValue('location', newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="location"
                  size="small"
                  fullWidth
                  variant="outlined"
                  error={Boolean(formik.touched.location && formik.errors.location)}
                  helperText={formik.errors.location && formik.touched.location && String(formik.errors.location)}
                  onBlur={formik.handleBlur}
                />
              )}
            />
          </div>

          <div className="dialoglabel">
            <p>Digital Address</p>
            <TextField
              fullWidth
              size="small"
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
            <p>Place of Work</p>
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
              type="date"
              value={formik.values.baptismalDate}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
              inputProps={{ max: getCurrentDate() }}
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
              error={Boolean(formik.touched.status && formik.errors.status)}
              onBlur={formik.handleBlur}
              fullWidth
              variant="outlined"
              helperText={formik.errors.status && formik.touched.status && String(formik.errors.status)}
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

Create.propTypes = {
  formik: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  status: PropTypes.array.isRequired,
  gender: PropTypes.string.isRequired,
  numberOfChildren: PropTypes.string.isRequired,
  newItem: PropTypes.object,

};

export default Create;
