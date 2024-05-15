import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Alert } from "@mui/material";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import Api from "../../components/Services/api";
import List from "./List";
import { useNavigate } from "react-router-dom";

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
}
const LeadCapture = () => {

  const navigate = useNavigate()

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [leadSources, setLeadSources] = useState([]);
  const [leadTypes, setLeadTypes] = useState([]);
  const [leadCaptures, setLeadCaptures] = useState([]);
  const [loading, setLoading] = useState(false);
  const[count,setCount] = useState(0)
  const [newItem, setNewItem] = useState({});
  const [id, setId] = useState(0);
  const [loadScreen, setLoadScreen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openLeadStatus, setOpenLeadStatus] = useState(false);
  const [leadStatusData, setLeadStatusData] = useState();
  const [leadStatus, setLeadStatus] = useState("cold");
  const [noteEditorValue, setNoteEditorValue] = useState("");

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [anchor, setAnchor] = useState(null);

  const openAnchor = Boolean(anchor);

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  const navigateImport = () => {
navigate('/app/importLead')
  }

  const handleOpenModal = (value, item) => {
    setOpenModal(value);
  };

  const handleLeadStatus = (value, item) => {
    setOpenLeadStatus(value);
    setLeadStatusData(item);
    setNoteEditorValue(item?.note);
  };

  const handleLeadStatusSubmission = async (value) => {
    if (leadStatus === "cold") {
      setOpenSnackbar(true);
      setAlert({
        open: true,
        message: `Only hot and warm leads can be saved`,
        severity: "error",
      });
    }


    await Api()
      .patch(`/lead-captures/${value}/`, {
        note: noteEditorValue,
        leadStatus,
      })
      .then((res) => {
        let result = res.data.data;
        setLoading(false);
        let filteredList = leadCaptures.filter((user) => user.id !== id);

        const newItemList = [result, ...filteredList];
        setLeadCaptures(newItemList);
        setOpenSnackbar(true);
        setAlert({
          open: true,
          message: `Lead edited successfully`,
          severity: "success",
        });
        setOpenLeadStatus(false);
      })
      .catch((error) => {
        setLoading(false);
        setOpenSnackbar(true);
        setAlert({
          open: true,
          message: `${error?.response?.data?.error}`,
          severity: "error",
        });
        setOpenLeadStatus(false);
      });
  };

  const handleSubmit = async (e) => {
    const data = {
      firstName: e.first_name,
      lastName: e.last_name,
      email: e.email,
      phoneNumber: e.phone_number,
      note: e.notes,
      leadSource: e.lead_source,
      leadType: e.lead_type,
    };

    if (id === 0) {
      setLoading(true);
      await Api()
        .post("/lead-captures/", data)
        .then((res) => {
          let result = res.data.data;
          setLoading(false);
          const newItemList = [result, ...leadCaptures];
          setLeadCaptures(newItemList);
          setCount(count + 1);
          setOpenSnackbar(true);
          setAlert({
            open: true,
            message: `Lead added successfully`,
            severity: "success",
          });
          setShowCreateForm(false);
          handleCloseMenu();
        })
        .catch((error) => {
          setLoading(false);
          setOpenSnackbar(true);
          setAlert({
            open: true,
            message: `${error?.response?.data?.error}`,
            severity: "error",
          });
          setShowCreateForm(false);
          handleCloseMenu();
        });
    } else {
      setLoading(true);
      await Api()
        .patch(`/lead-captures/${id}/`, data)
        .then((res) => {
          let result = res.data.data;
          setLoading(false);
          let filteredList = leadCaptures.filter((item) => item.id !== id);

          const newItemList = [result, ...filteredList];
          setLeadCaptures(newItemList);
          setOpenSnackbar(true);
          setAlert({
            open: true,
            message: `Lead edited successfully`,
            severity: "success",
          });
          setShowCreateForm(false);
          handleCloseMenu();
        })
        .catch((error) => {
          setLoading(false);
          setOpenSnackbar(true);
          setAlert({
            open: true,
            message: `${error?.response?.data?.error}`,
            severity: "error",
          });
          setShowCreateForm(false);
          handleCloseMenu();
        });
    }
  };

  const handleSnackbarClose = (value) => {
    setOpenSnackbar(false);
  };

  const LeadSourceData = async () => {
    await Api()
      .get("/partials/lead-sources")
      .then((res) => {
        setLeadSources(res.data.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const LeadTypeData = async () => {
    await Api()
      .get("/partials/lead-types")
      .then((res) => {
        setLeadTypes(res.data.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const LeadCaptures = async () => {
    await Api()
      .get(`/lead-captures?lead_status=${"Cold"}`)
      .then((res) => {
        setLoadScreen(false);
        setLeadCaptures(res.data.data.results);
        setCount(res.data.data.count)
      })
      .catch((err) => {
        setLoadScreen(true);
        console.log(err.message);
      });
  };

  const handleDelete = () => {
    setLoading(true);
    Api()
      .delete(`/lead-captures/${newItem.id}`)
      .then((res) => {
        setLoading(false);
        let newItemList = leadCaptures.filter((user) => user.id !== newItem.id);
        setLeadCaptures(newItemList);
        setOpenSnackbar(true);
        setAlert({
          open: true,
          message: `Lead deleted successfully`,
          severity: "success",
        });
        handleOpenModal(false);
        handleCloseMenu();
      })
      .catch((err) => {
        setLoading(false);
        setOpenSnackbar(true);
        setAlert({
          open: true,
          message: `${err.response.data.data}`,
          severity: "success",
        });
        handleOpenModal(false);
        handleCloseMenu();
      });
  };
  const getDetail = (val) => {
    let selectedItem = leadCaptures.results?.find((item) => item.id === val);
    setNewItem(selectedItem);
    setId(selectedItem.id);
  };
  const handleCreateEdit = (val, selected_id) => {
    setShowCreateForm(val);
    setNewItem({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      leadSource: "",
      leadCapture: "",
      note: "",
    });

    if (val && selected_id) {
      getDetail(selected_id);
    }
  };
  useEffect(() => {
    LeadSourceData();
    LeadTypeData();
    LeadCaptures();
  }, []);

  return (
    <div>
      <Alert severity="info" className="mt-2">
        Add/Manage leads in your organization.{" "}
        <span className="text-orange-400">
          Learn more about setting up Leads.
        </span>
      </Alert>
      <div className="flex justify-between mt-4">
        <div>
          <h3>Users({count})</h3>
        </div>
        <div className=" flex mr-4">
          <div className="mr-4">
            <Button variant="contained" onClick={navigateImport}>
              Import Leads
            </Button>
          </div>

          <Button variant="contained" onClick={() => handleCreateEdit(true)}>
            Add Leads
          </Button>
        </div>
      </div>

      <div className="flex mt-6">
        <p className="text-[#8F95B2] text-sm">
          This page shows a list of all leads
        </p>
      </div>
      <div className="">
        <List
          leadCaptures={leadCaptures}
          loadScreen={loadScreen}
          anchor={anchor}
          setAnchor={setAnchor}
          openAnchor={openAnchor}
          handleCloseMenu={handleCloseMenu}
          newItem={newItem}
          handleDelete={handleDelete}
          showCreateForm={showCreateForm}
          handleSnackbarClose={handleSnackbarClose}
          leadTypes={leadTypes}
          leadSources={leadSources}
          setAlert={setAlert}
          noteEditorValue={noteEditorValue}
          setNoteEditorValue={setNoteEditorValue}
          openLeadStatus={openLeadStatus}
          setLeadStatus={setLeadStatus}
          handleOpenModal={handleOpenModal}
          loading={loading}
          handleLeadStatus={handleLeadStatus}
          handleSubmit={handleSubmit}
          setNewItem={setNewItem}
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleLeadStatusSubmission={handleLeadStatusSubmission}
          leadStatusData={leadStatusData}
          handleCreateEdit={handleCreateEdit}
          openSnackbar={openSnackbar}
          leadStatus={leadStatus}
          alert={alert}
          QuickSearchToolbar={QuickSearchToolbar}
        />
      </div>
    </div>
  );
};

export default LeadCapture;
