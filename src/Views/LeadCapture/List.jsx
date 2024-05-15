
import CreateModal from "./CreateModal"
import ListData from "./ListData"
import { HashLoader } from "react-spinners";



const List = ({rows,columns,QuickSearchToolbar, open,
  setAlert,
  loading,
  handleSubmit,
  handleLeadStatus,
  leadStatus,
  setNoteEditorValue,
  noteEditorValue,
  handleLeadStatusSubmission,
  setLeadStatus,
  leadStatusData,
  leadSources,
  handleLeadStatusChange,
  openLeadStatus,
  newItem,
  leadTypes,
  leadStatusCounter,
  leadCaptures,
  setNewItem,
  loadScreen,
  openModal,
  setOpenModal,
  handleOpenModal,
  anchor,
  setAnchor,
  openAnchor,
  handleCloseMenu,
  handleDelete,
  handleSnackbarClose,
  showCreateForm,
  handleCreateEdit,
  openSnackbar,
  alert
}) => {
    return(
      <div>
      <CreateModal
      rows={rows} columns={columns} open={open} 
      setAlert = {setAlert} loading={loading} handleSubmit={handleSubmit} alert={alert}
      QuickSearchToolbar={QuickSearchToolbar} openSnackbar = {openSnackbar}
    leadSources = {leadSources}
    setNewItem = {setNewItem}
    newItem={newItem}
    showCreateForm = { showCreateForm}
      leadTypes={leadTypes}
      handleCreateEdit={handleCreateEdit}
      handleSnackbarClose={handleSnackbarClose}
      
      />

      {!loadScreen ? (

      <ListData rows={rows} columns={columns} open={open} 
       anchor={anchor}
       setAnchor={setAnchor}
       openAnchor={openAnchor}
       newItem = {newItem}
       setNoteEditorValue = {setNoteEditorValue}
       noteEditorValue = { noteEditorValue}
       handleLeadStatus = {handleLeadStatus}
      handleOpenModal = {handleOpenModal}
      leadStatusCounter={leadStatusCounter}
      setLeadStatus={setLeadStatus}
      alert={alert}
      handleLeadStatusSubmission={handleLeadStatusSubmission}
openLeadStatus = {openLeadStatus}
       showCreateForm = { showCreateForm}
       
       leadStatusData = {leadStatusData}
       openSnackbar = {openSnackbar}
       handleSnackbarClose={handleSnackbarClose}
       handleCreateEdit={handleCreateEdit}
       leadStatus={leadStatus}
       leadCaptures = {leadCaptures}
       handleLeadStatusChange = {handleLeadStatusChange}
       openModal={openModal}
       setOpenModal={setOpenModal}
       setNewItem={setNewItem}
       handleCloseMenu={handleCloseMenu}
       handleDelete={handleDelete}
      setAlert = {setAlert} loading={loading} handleSubmit={handleSubmit} 
      QuickSearchToolbar={QuickSearchToolbar}/>
      ):(
        <div style={{ marginRight: "5px", textAlign: "center" }}>
        <HashLoader size={20} color="#1b98e0" loading  className="mx-auto"/>
        <p>Loading...</p>
      </div>
      )}
          
    </div>
    )
}

export default List