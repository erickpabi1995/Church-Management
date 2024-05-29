import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh',
  overflowY: 'auto',
};

const sectionHeaderStyle = {
  backgroundColor: 'rgba(91 111 127)',
  color: '#fff',
  padding: '8px',
  borderRadius: '4px',
};

const MembersReportModal = ({ open, handleClose, reportData }) => {
  const [browserReady, setBrowserReady] = useState(false);

  useEffect(() => {
    // Simulate browser readiness after a short delay
    const timer = setTimeout(() => {
      setBrowserReady(true);
    }, 1000);

    // Clean up
    return () => clearTimeout(timer);
  }, []);

  if (!browserReady) {
    return null; // Render nothing if browser is not ready
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom style={sectionHeaderStyle}>
          Members Report
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="leadCapture report table">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell align="right">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Total leadCapture</TableCell>
                <TableCell align="right">{reportData.totalMembers}</TableCell>
              </TableRow>
              {/* <TableRow>
              <TableCell colSpan={2} style={sectionHeaderStyle}><strong>INFO</strong></TableCell>

              </TableRow> */}

              <TableRow>
                <TableCell>Total leadCapture Baptised</TableCell>
                <TableCell align="right">{reportData.totalMembersBaptised}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Members with Occupation</TableCell>
                <TableCell align="right">{reportData.totalMembersWithOccupation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Active Members</TableCell>
                <TableCell align="right">{reportData.activeMembers}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} style={sectionHeaderStyle}><strong>Marital Status Counts</strong></TableCell>
              </TableRow>
              {reportData.maritalStatusCounts.map((status, index) => (
                <TableRow key={index}>
                  <TableCell>{status.maritalStatus.charAt(0).toUpperCase() + status.maritalStatus.slice(1)}</TableCell>
                  <TableCell align="right">{status.count}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} style={sectionHeaderStyle}><strong>Group Counts</strong></TableCell>
              </TableRow>
              {reportData.groupCounts.map((group, index) => (
                <TableRow key={index}>
                  <TableCell>{group.group_Name}</TableCell>
                  <TableCell align="right">{group.count}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} style={sectionHeaderStyle}><strong>Gender Counts</strong></TableCell>
              </TableRow>
              {reportData.genderCounts.map((gender, index) => (
                <TableRow key={index}>
                  <TableCell>{gender.gender ? gender.gender.charAt(0).toUpperCase() + gender.gender.slice(1) : 'Not Specified'}</TableCell>
                  <TableCell align="right">{gender.count}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} style={sectionHeaderStyle}><strong>Status Counts</strong></TableCell>
              </TableRow>
              {reportData.statusCounts.map((status, index) => (
                <TableRow key={index}>
                  <TableCell>{status.status_Name.charAt(0).toUpperCase() + status.status_Name.slice(1)}</TableCell>
                  <TableCell align="right">{status.count}</TableCell>
                </TableRow>
              ))}
              
              
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default MembersReportModal;


