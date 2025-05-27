import CreateModal from './CreateModal';
import ListData from './ListData';
import { HashLoader } from 'react-spinners';

const List = ({
  id,
  loading,
  handleSubmit,
  handleChange,
  handleAssignedLeads,
  handleOpenLeadModal,
  members,
  count,
  page,
  handleDelete,
  newItem,
  leadAgents,
  setNewItem,
  loadScreen,
  openModal,
  groupSelect,
  setGroupSelect,
  setOpenModal,
  handleOpenModal,
  openAssignedLeadModal,
  handleCloseMenu,
  countriesList,
  handleSnackbarClose,
  showCreateForm,
  handleLeadDistribution,
  paginationHandler,
  handleCreateEdit,
  groups,
  status,
  locations,
  setPaginationModel,
  openSnackbar,
  alert,
}) => {
  return (
    <div>
      <CreateModal
        id={id}
        loading={loading}
        handleSubmit={handleSubmit}
        alert={alert}
        openSnackbar={openSnackbar}
        setNewItem={setNewItem}
        newItem={newItem}
        groupSelect={groupSelect}
        setGroupSelect={setGroupSelect}
        showCreateForm={showCreateForm}
        groups={groups}
        status={status}
        locations={locations}
        members={members}
        countriesList={countriesList}
        handleCreateEdit={handleCreateEdit}
        handleSnackbarClose={handleSnackbarClose}
      />

      {!loadScreen ? (
        <ListData
          newItem={newItem}
          handleAssignedLeads={handleAssignedLeads}
          handleDelete={handleDelete}
          handleChange={handleChange}
          openAssignedLeadModal={openAssignedLeadModal}
          handleLeadDistribution={handleLeadDistribution}
          leadAgents={leadAgents}
          paginationHandler={paginationHandler}
          count={count}
          handleOpenModal={handleOpenModal}
          page={page} // Ensure correct page is passed
          setPaginationModel={setPaginationModel}
          alert={alert}
          members={members}
          openSnackbar={openSnackbar}
          handleSnackbarClose={handleSnackbarClose}
          handleCreateEdit={handleCreateEdit}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setNewItem={setNewItem}
          handleCloseMenu={handleCloseMenu}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      ) : (
        <div style={{ marginRight: '5px', textAlign: 'center' }}>
          <HashLoader size={20} color="#1b98e0" loading className="mx-auto" />
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default List;
