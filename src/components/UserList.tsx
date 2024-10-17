import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar.jsx";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDeleteUser, useUpdateUser, useUsers } from "../hooks/auth";
import { useListReports } from "../hooks/data.js";
import { useCreateUser } from "../hooks/auth.js";
import { User } from "../types/auth.js";
import { Checkbox } from "rsuite";

export default function UserList() {
  const [showModal, setShowModal] = useState(false);
  const [showModalReport, setShowModalReport] = useState(false);

  const [reportData, setReportData] = useState({
    username: "",
    password: "",
    selectedReport: null as number,
    isAdmin: false,
  });

  const { reports } = useListReports();
  const navigate = useNavigate();

  //   Date Format
  const formatDate = (dateStr: string) => {
    const options = {
      year: "numeric" as const,
      month: "short" as const,
      day: "numeric" as const,
    };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };
  //   Modal functions
  const [selectedUser, setSelectedUser] = useState<
    (User & { password?: string }) | null
  >(null);
  const { updateUser } = useUpdateUser();
  async function handleUpdateUser() {
    await updateUser(selectedUser).then((res) => {
      closeEditModal();
    });
  }
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openEditModal = (user: User) => {
    setSelectedUser({ ...user, password: "" });
    setShowModalReport(true);
  };
  const closeEditModal = () => {
    setSelectedUser(null);
    setShowModalReport(false);
  };
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setShowDeleteModal(false);
  };
  const { createUser: assignReport } = useCreateUser();
  const { users } = useUsers();
  async function handleReportAssign() {
    const reportName = reportData.selectedReport;
    await assignReport({
      username: reportData.username,
      password: reportData.password,
      report_id: reportName,
      is_admin: reportData.isAdmin,
    });

    handleCloseModal();
    setReportData({
      username: "",
      password: "",
      selectedReport: null as number,
      isAdmin: false,
    });
  }
  function handleCreateReport() {
    navigate("/create-report-admin");
  }
  const mappedUsers = useMemo(() => {
    return users.map((user) => {
      const userData = {
        ...user,
        report_name:
          reports.find((report) => report.id === user.report_id)?.name || "",
      };
      return userData;
    });
  }, [users, reports]);
  const { deleteUser, isDeletingUser } = useDeleteUser();
  async function removeUser(user_id: number) {
    await deleteUser(user_id);
  }
  return (
    <>
      <Navbar />
      {/* [Leads] start */}
      <div
        className="col-xxl-8 d-flex flex-column justify-content-center align-items-center mt-5"
        style={{ margin: "auto", fontFamily: "Inter,sans-serif" }}
      >
        <div className="card stretch stretch-full" style={{ width: "80vw" }}>
          <div className="card-header">
            <h1
              className="card-title mb-5 text-center"
              style={{ fontSize: "22px", fontFamily: "Inter,sans-serif" }}
            >
              Admin User Panel{" "}
            </h1>
          </div>
          <div className="card-body custom-card-action p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr className="border-b">
                    <th scope="row" style={{ fontSize: "11px" }}>
                      Username
                    </th>
                    <th style={{ fontSize: "11px" }}>Report</th>
                    <th style={{ fontSize: "11px" }}></th>
                    {/* <th style={{ fontSize: "14px" }}>Edit</th> */}
                  </tr>
                </thead>
                {mappedUsers.length !== 0 ? (
                  mappedUsers.map((user, index) => (
                    <tbody>
                      <tr key={index}>
                        <td
                          className="text-primary"
                          style={{ minWidth: "150px", fontSize: "0.9rem" }}
                        >
                          {user.username}
                        </td>
                        <td
                          className="text-success"
                          style={{ minWidth: "300px", fontSize: "0.9rem" }}
                        >
                          {user.report_name}
                        </td>

                        <td className="text-end d-flex align-items-center justify-content-center">
                          <button
                            className="mx-2 btn btn-light  ml-auto"
                            onClick={() => openEditModal(user)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            className="btn btn-light"
                            style={{ marginRight: "2rem" }}
                            onClick={() => removeUser(user.id)}
                          >
                            <i className="fa-solid fa-trash mr-6"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))
                ) : (
                  <span
                    className="d-flex justify-content-center position-absolute mt-3 align-items-center w-full"
                    style={{ width: "90%" }}
                  >
                    <span className="text-secondary fst-italic">
                      No Reports Yet...
                    </span>
                  </span>
                )}
              </table>
            </div>
          </div>
          <div
            className="d-flex justify-content-center flex-col-750px align-items-center gap-3"
            style={{ marginTop: "7rem" }}
          >
            <Button
              className="btn btn-primary"
              style={{ width: "300px", aspectRatio: "3/0.5" }}
              onClick={handleShowModal}
            >
              Create User
            </Button>
            <button
              className=" btn btn-primary"
              style={{ width: "300px", aspectRatio: "3/0.5" }}
              onClick={handleCreateReport}
            >
              Create Report
            </button>
          </div>
        </div>
      </div>
      <div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter a username.."
                  value={reportData.username}
                  onChange={(e) =>
                    setReportData({ ...reportData, username: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter a password.."
                  value={reportData.password}
                  onChange={(e) =>
                    setReportData({ ...reportData, password: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Admin</Form.Label>
                <Checkbox
                  checked={reportData.isAdmin}
                  onChange={() =>
                    setReportData({
                      ...reportData,
                      isAdmin: !reportData.isAdmin,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formReports">
                <Form.Label>Reports:</Form.Label>
                <Form.Control
                  disabled={reportData.isAdmin}
                  as="select"
                  name="selectedReport"
                  value={!reportData.isAdmin ? reportData.selectedReport : null}
                  onChange={(e) =>
                    setReportData({
                      ...reportData,
                      selectedReport: Number(e.target.value),
                    })
                  }
                >
                  <option value="">Select a report</option>
                  {reports.map((report, index) => (
                    <option key={index} value={report.id}>
                      {report.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                style={{ marginTop: "2rem" }}
                onClick={handleReportAssign}
              >
                Create{" "}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>{" "}
        <Modal show={showModalReport} onHide={closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update User Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Update username.."
                  value={selectedUser?.username}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      username: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Update password.."
                  value={selectedUser?.password}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      password: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Admin</Form.Label>
                <Checkbox
                  checked={selectedUser?.is_admin}
                  onChange={() =>
                    setSelectedUser({
                      ...selectedUser,
                      is_admin: !selectedUser.is_admin,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formReports">
                <Form.Label>Reports:</Form.Label>
                <Form.Control
                  as="select"
                  disabled={selectedUser?.is_admin}
                  name="selectedReport"
                  value={selectedUser?.report_id}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      report_id: Number(e.target.value),
                    })
                  }
                >
                  <option value="">Select a report</option>
                  {reports.map((report, index) => (
                    <option key={index} value={report.id}>
                      {report.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                style={{ marginTop: "2rem" }}
                onClick={handleUpdateUser}
              >
                Update{" "}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal show={showDeleteModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete {selectedUser?.username}?</p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="danger"
                type="button"
                style={{ marginTop: "2rem" }}
                onClick={() => deleteUser(selectedUser.id)}
                disabled={isDeletingUser}
              >
                Delete
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
