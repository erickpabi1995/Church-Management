import { MenuItem, TextField } from "@mui/material";

const Create = ({
 
  formik,
  leadSources,
  leadTypes,
}) => {
  return (
    <>
      <div className="dialoglabel">
        <p>First Name *</p>
        <TextField
          autoFocus
          name="first_name"
          invalid={!!formik.errors.first_name}
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          size="small"
          type="text"
          error={Boolean(formik.touched.first_name && formik.errors.first_name)}
          fullWidth
          helperText={
            formik.errors.first_name &&
            formik.touched.first_name &&
            String(formik.errors.first_name)
          }
          variant="outlined"
        />
        <div></div>
      </div>
      <div className="dialoglabel">
        <p>Last Name *</p>
        <TextField
          autoFocus
          name="last_name"
          invalid={!!formik.errors.last_name}
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          size="small"
          error={Boolean(formik.touched.last_name && formik.errors.last_name)}
          helperText={
            formik.errors.last_name &&
            formik.touched.last_name &&
            String(formik.errors.last_name)
          }
          fullWidth
          variant="outlined"
        />
      </div>

      <div className="dialoglabel">
        <p>Email *</p>
        <TextField
          autoFocus
          name="email"
          id="name"
          size="small"
          invalid={!!formik.errors.email}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            formik.errors.email &&
            formik.touched.email &&
            String(formik.errors.email)
          }
          type="email"
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          variant="outlined"
        />
      </div>
      <div className="dialoglabel">
        <p>Phone Number *</p>
        <TextField
          autoFocus
          name="phone_number"
          id="name"
          size="small"
          type="number"
          invalid={!!formik.errors.phone_number}
          value={formik.values.phone_number}
          helperText={
            formik.errors.phone_number &&
            formik.touched.phone_number &&
            String(formik.errors.phone_number)
          }
          onChange={formik.handleChange}
          error={Boolean(
            formik.touched.phone_number && formik.errors.phone_number
          )}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
        />
      </div>
      <div className="dialoglabel">
        <p>Lead Source </p>
        <TextField
          autoFocus
          select
          name="lead_source"
          size="small"
          value={formik.values.lead_source}
          onChange={formik.handleChange}
          fullWidth
          variant="outlined"
        >
          {leadSources?.map((item) => (
            <MenuItem value={item.id} key={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="dialoglabel">
        <p>Notes *</p>
        <TextField
          id="outlined-multiline-static"
          fullWidth
          name="notes"
          multiline
          value={formik.values.notes}
          onChange={formik.handleChange}
          invalid={!!formik.errors.notes}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.notes && formik.errors.notes)}
          rows={2}
          helperText={
            formik.errors.notes &&
            formik.touched.notes &&
            String(formik.errors.notes)
          }
        />
      </div>

      <div className="dialoglabel">
        <p>Lead Type *</p>
        <TextField
          autoFocus
          select
          name="lead_type"
          size="small"
          invalid={!!formik.errors.lead_type}
          value={formik.values.lead_type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          variant="outlined"
          error={Boolean(formik.touched.lead_type && formik.errors.lead_type)}
          helperText={
            formik.errors.lead_type &&
            formik.touched.lead_type &&
            String(formik.errors.lead_type)
          }
        >
          {leadTypes?.map((item) => (
            <MenuItem value={item.id} key={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </>
  );
};

export default Create;
