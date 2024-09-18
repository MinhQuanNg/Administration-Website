import * as React from "react";
import { NOUN, VERB } from 'common/constants/translation.js'
import { STATUS, ROLE, DATA_ENTRY_DURATION } from 'common/constants/database.js'

import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckIcon from '@mui/icons-material/Check';

import { visuallyHidden } from "@mui/utils";
import * as dataApi from "../../app/services/data/dataService";
import { Chip } from "@mui/material";
import { Avatar } from "@mui/material";
import { useState, useEffect, useMemo } from "react";

import MultiSelect from "../MultiSelect";
import CustomPopup from "../CustomPopup";
import StatusChip from "./StatusChip";
import CustomDatePicker from "../dossier/CustomDatePicker";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDossier, setCurrentTask, setNewDossierData, setNewTaskData } from '../../app/features/dossier/dossierSlice';
import AcceptTaskButton from "./AcceptTaskButton";
import ProgressCircle from "./ProgressCircle";
import Countdown from "./Countdown";
import ExportToExcel from "../ExportToExcel";
import { DATE_FIELDS } from "./constants";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
};

function EnhancedTableToolbar(props) {
  const { selected, setSelected, tableTitle, 
    isDossier, existingAssignees } = props;
  const dispatch = useDispatch();
  const currentDossier = useSelector(state => state.dossier.currentDossier);
  const dossierView = useSelector(state => state.dossier.currentView) === 'dossier';
  const name = useSelector(state => `${state.auth.userInfo.lastName} ${state.auth.userInfo.firstName}`);

  // Extract column IDs
  const columnIds = props.columns?.map(column => column.id);

  // Filter rows to only include attributes that are in columns
  const filteredRows = props.rows?.map(row => {
    const filteredRow = {};
    columnIds.forEach(id => {
      if (row.hasOwnProperty(id)) {
        if (DATE_FIELDS.includes(id)) {
          filteredRow[id] = row[id]?.format('DD/MM/YYYY HH:mm');
        } else {
          filteredRow[id] = row[id];
        }
      }
    });
    return filteredRow;
  });

  const numSelected = selected.length;

  const [deleteDossier, {isError, error}] = dataApi.useDeleteDossierMutation();

  const handleDeleteRows = async () => {
    if(isDossier) {
      await Promise.all(selected.map(async (row) => {
        await deleteDossier(row);
      }));

      console.log('deleted all');

      setSelected([]);
      dispatch(setCurrentDossier(-1));
      dispatch(setNewDossierData(true));
    }
  }

  useEffect(() => {
    if (isError && error.response && error.response.status === 101) {
      dispatch(setCurrentDossier(-1));
      dispatch(setNewDossierData(true));
    }
  }, [isError]);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Đã chọn {numSelected} {tableTitle.toLowerCase()}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableTitle}
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title={VERB.ASSIGN}>
            <div>
              <Assign isDossier={isDossier} rowId={selected} existingAssignees={existingAssignees}
                    setSelected={setSelected} />
            </div>
          </Tooltip>
          <Tooltip title={VERB.DELETE}>
            <IconButton onClick={() => handleDeleteRows()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
        <Tooltip title={VERB.FILTER}>
          <IconButton onClick={() => console.log('filter')}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        {!!props.canExportToExcel && 
        <ExportToExcel 
          fileName={`${NOUN.RESULTS} ${dossierView ? `${NOUN.DOSSIER} ID ${currentDossier}` : ` - ${name}`}.xlsx`}
          sheetName={`${NOUN.RESULTS}`}
          jsonData={filteredRows}/> }
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  tableTitle: PropTypes.string.isRequired,
};

const useIsAdmin = () => {
  return useSelector(state => state.auth.userInfo.role) === ROLE.ADMIN.name;
};

const Assignee = ({ assignee, rowId, isDossier, editable }) => {
  const id = assignee?.id;
  const [deleteTaskAssignee] = dataApi.useDeleteTaskAssigneeMutation();
  const [deleteDossierAssignee] = dataApi.useDeleteDossierAssigneeMutation();
  const dispatch = useDispatch();
  const isAdmin = useIsAdmin();

  const handleDeleteAssignee = async () => {
    if (isDossier) {
      await deleteDossierAssignee({dossierId: rowId, assignee: id});
      dispatch(setCurrentDossier(rowId));
      dispatch(setCurrentTask(-1));
    } else {
      await deleteTaskAssignee({taskId: rowId, assignee: id});
      dispatch(setCurrentTask(rowId));
    }
    dispatch(setNewDossierData(true));
    dispatch(setNewTaskData(true));

    console.log("deleted assignee", id);
  };

  return <Chip color="default" onDelete={isAdmin && editable ? 
    handleDeleteAssignee : undefined} avatar={<Avatar src={assignee?.photo}/>} 
            label={assignee?.firstName || "loading..."}
            sx={{marginX: 0.5, marginY: 0.5}}
          />
}

const Assignees = ({ assignees, rowId, isDossier, editable }) => {
  return assignees.map((assignee) => {
    return <Assignee isDossier={isDossier} key={assignee.id} 
    assignee={assignee} rowId={rowId}
    editable={editable} />
  });
}

const Assign = (props) => {
  const { existingAssignees, rowId, isDossier, setSelected, editable } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const [assigneeIds, setAssigneeIds] = useState([])
  const { data: users, isLoading } = dataApi.useGetUsersQuery(undefined, { skip: !isPopupOpen } );
  const [unassignedUsers, setUnassignedUsers] = useState([]);
  const [updateTask] = dataApi.useUpdateTaskMutation();
  const [updateDossier] = dataApi.useUpdateDossierMutation();
  const dispatch = useDispatch();
  const isAdmin = useIsAdmin();

  const handleConfirmAdd = async () => {
    closePopup();

    if (isDossier) {
      await updateDossier({ id: rowId, assignees: assigneeIds });
      console.log(`assigning all tasks in dossier ${rowId} to ${assigneeIds}`);
      dispatch(setCurrentDossier(rowId));
      dispatch(setCurrentTask(-1));
    } else {
      await updateTask({ id: rowId, assignees: assigneeIds });
      dispatch(setCurrentTask(rowId));
    }
    dispatch(setNewDossierData(true));
    dispatch(setNewTaskData(true));

    if (Array.isArray(rowId)) {
      setSelected([]);
    }
  }

  // Find unassigned users
  useEffect(() => {
    if (users) {
      setUnassignedUsers(users.filter(user => !existingAssignees.map(existingAssignee => existingAssignee.id).includes(user.id)));
    }
  }, [users]);

  return ( isAdmin && editable &&
    <>
      <IconButton color="primary" aria-label="add assignees"
              onClick={openPopup}>
        <PersonAddIcon />
      </IconButton>
      <div onClick={(e) => e.stopPropagation()}>
        <CustomPopup id={rowId}
            content={
                <div className="flex justify-center gap-[30px] px-[20px] py-[20px] relative bg-[#ffffff]">
                  <MultiSelect 
                    onChange={setAssigneeIds}
                    width={450}
                    items={unassignedUsers}
                    isLoading={isLoading}
                    itemKeys={["id", "lastName", "firstName"]}
                    itemType={NOUN.ASSIGNEES}
                    />
                  <div className="flex flex-col justify-center">
                    <IconButton color="success" aria-label="confirm add assignees"
                      onClick={handleConfirmAdd} >
                      <CheckIcon />
                    </IconButton>
                  </div>
                </div> 
                } 
            isOpen={isPopupOpen}
            onClose={closePopup}
        />
      </div>
    </>
  )
}

export const EnhancedTable = (props) => {
  const { tableTitle, rows, columns, handleRowClick,
    currentTab, setCurrentTab, tabs
   } = props;
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState(!!props.mytasks ? "assignedAt" : "id");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const mytasks = useSelector(state => state.dossier.currentView) === 'mytasks';
  const userId = useSelector(state => state.auth.userInfo.id);
  const myRole = useSelector(state => state.auth.userInfo.role);
  const trainedTaskCount = useSelector(state => state.dossier.trainedTaskCount);
  const untrainedTaskCount = useSelector(state => state.dossier.untrainedTaskCount);
  const isResults = currentTab !== undefined && currentTab === tabs?.find(tab => tab.label === NOUN.RESULTS).index;

  // useEffect(() => {
  //   console.log('trained task count', trainedTaskCount);
  //   console.log('untrained task count', untrainedTaskCount);
  // }, [trainedTaskCount, untrainedTaskCount]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowSelect = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      rows.slice().sort(getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const renderTableCell = (key, row, labelId, isDossier) => {
    const value = row[key];
    const rowId = row.id;
    const isAssigned = row.assignees.some(assignee => assignee.id === userId);

    const checkCanAccept = () => {
      if (isDossier || isResults) {
        return;
      }

      if (isAssigned) {
        return { canAccept: true };
      }

      if (myRole !== ROLE.ADMIN.name) {
        // check if task is full
        if (row.assignees.length >= row.criterionSpecs.maxAssignees) {
          return { canAccept: false, reason: 'Đã đủ người' }
        }

        // check if trained user can accept task based on trained/untrained task count
        // trained users can only accept up to the same number of untrained tasks as trained tasks
        if (myRole === ROLE.TRAINED.name && (row.criterionSpecs.equipment === null ||
            row.criterionSpecs.equipment.minRole === ROLE.UNTRAINED.name) && 
            untrainedTaskCount >= trainedTaskCount) {
          return { canAccept: false, reason: 'Đã nhận đủ nhiệm vụ dễ, hãy chọn nhiệm vụ khó' };
        }

        // check if user can accept task based on role
        const minRole = row.criterionSpecs.equipment?.minRole || null;
        const myRoleLevel = Object.values(ROLE).find(role => role.name === myRole).level;
        const minRoleLevel = minRole === null ? null : Object.values(ROLE).find(role => role.name === minRole).level;
        const canAccept = minRole === null || myRoleLevel <= minRoleLevel;
        const reason = canAccept ? null : 'Cần được đào tạo';

        return { canAccept, reason };
      }

      return { canAccept: true };
    }

    switch (key) {
      case 'id':
        return <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          // align="center"
          key={key}
        >
          {value}
        </TableCell>
      case 'assignedAt':
      case 'startedAt':
      case 'completedAt':
        return <TableCell key={key}>{value?.format('DD/MM/YYYY HH:mm')}</TableCell>;
      case 'status':
        return  <TableCell key={key}>
              <StatusChip status={value} id={rowId} isDossier={isDossier} 
                {...(!isDossier && { isActive: row.isActive, isAssigned: isAssigned, row: row })}
              />
          </TableCell>;
      case 'assignees':
        const result = checkCanAccept();

        return  <TableCell key={key} {...(!isResults ? { style: { width: '100%' } } : {})}>
                  <div className="expand-row flex items-center justify-between">
                    <div className="expand-row flex flex-wrap">
                      {/* If assigning to dossier, list all users in popup */}
                      <div>
                        <Assign isDossier={isDossier} rowId={rowId} editable={!isResults}
                        existingAssignees={isDossier ? [] : value} />
                      </div>

                      <Assignees isDossier={isDossier} rowId={rowId} assignees={value} editable={!isResults} />
                    </div>
                    {!isDossier && !isResults && <AcceptTaskButton isAssigned={isAssigned}
                                                      taskId={rowId} 
                                                      canAccept={result.canAccept}
                                                      reason={result.reason} 
                                                      trainedTask={row.criterionSpecs.equipment?.minRole === ROLE.TRAINED.name}
                                                      /> }
                  </div>
                </TableCell>;
      case 'deadline':
        return <TableCell key={key}>
                  <div className="expand-row flex flex-row items-center gap-5">
                    <CustomDatePicker isDossier={isDossier} id={rowId} deadline={value} />
                    {!isDossier && mytasks && row.status === STATUS.PENDING && 
                    value && <Countdown deadline={value} initialRemainingTime={row.criterionSpecs.duration + DATA_ENTRY_DURATION}/>}
                  </div>
                </TableCell>
      case 'action':
        return <TableCell key={key} >
                <div className="expand-row flex justify-end">
                  <AcceptTaskButton isAssigned={true} taskId={rowId} mytasks dossierId={row.dossierId}/>
                </div>
              </TableCell>;
      case 'productId':
      case 'criterionId':
        return (
          <TableCell key={key}>
            <Chip label={value.length > 30 ? `${value.slice(0, 23)}...` : value} 
              className="expand-row"
              classes={{
                root: 'expand-row',
                label: 'expand-row',
              }}/>
          </TableCell>
        );
      case 'progress':
        return <TableCell key={key}>
          <div className="expand-row flex justify-end">
            <ProgressCircle totalParts={value.taskCount} completedParts={value.completedTaskCount} 
            pendingParts={value.pendingTaskCount} className="expand-row"/>
          </div>
          </TableCell>;
      case 'notes':
        return <TableCell key={key}>{value}</TableCell>;
      default:
        return <TableCell key={key}>{value}</TableCell>;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <div className="flex flex-col">
          <EnhancedTableToolbar 
            selected={selected} 
            setSelected={setSelected}
            tableTitle={tableTitle}
            existingAssignees={[]}
            isDossier={!!props.isDossier}
            {...(isResults ? { canExportToExcel: true, rows : rows, columns : columns } : {})}
          />
          {!props.isDossier &&
            <Tabs value={currentTab} onChange={(event, newCurrentTab) => setCurrentTab(newCurrentTab)}>
                {tabs.map((tab) => (
                  <Tab disableRipple key={tab.label} label={tab.label} value={tab.index} />
                ))}
            </Tabs>
          }
        </div>
        <TableContainer>
          <Table
            sx={{
              minWidth: 750,
              tableLayout: 'auto',
              // no resizing when last column is too wide
              '& thead th:not(:last-child)': { whiteSpace: 'nowrap' },
              '& tbody td:not(:last-child)': { whiteSpace: 'nowrap' },
              '& thead th:last-child': { width: '100%' },
              '& tbody td:last-child': { width: '100%' }
            }}
            aria-labelledby="tableTitle"
            // size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              columns={columns}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(e) => {
                        // Expand row if clicked on expand-row regions
                      if (e.target instanceof HTMLTableCellElement ||
                        (typeof e.target === 'object' && 
                          (e.target.className.baseVal?.includes("expand-row") || 
                          (e.target.className.baseVal === undefined && e.target.className.includes("expand-row")))) ||
                        (typeof e.target === 'string' && e.target.className.includes("expand-row"))
                      ) {
                        handleRowClick(row.id);
                      }
                    }}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ 
                      cursor: "pointer",
                      ...(row.hasOwnProperty('isActive') && !isResults && { 
                          backgroundColor: row.isActive ? 'white' : '#f7f7f7', 
                          opacity: row.isActive ? 1 : 0.6, // Grayed-out effect for inactive tasks
                          '&:hover': {
                            backgroundColor: row.isActive ?
                              '#f0f0f0 !important' // Adjust hover color for active tasks
                            : '#e7e7e7 !important', // Adjust hover color for inactive tasks
                          },
                        }),
                      ...(!props.isDossier && isResults && row.status === STATUS.COMPLETED && 
                      { backgroundColor: '#f6fff5', // Green background for completed tasks
                        '&:hover': {
                          backgroundColor: '#ebffe8 !important', // Adjust hover color for completed tasks
                        }
                      }),
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={() => handleRowSelect(row.id)}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    {columns.map((column) => {
                      const key = column.id;
                      return renderTableCell(key, row, labelId, !!props.isDossier);
                    })}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    // height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}