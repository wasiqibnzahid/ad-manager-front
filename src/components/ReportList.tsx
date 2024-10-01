import { useState } from "react";
import Navbar from "./Navbar.jsx";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useDeleteReport,
  useListReports,
  useAssignReport,
} from "../hooks/data.js";
import { useUsers } from "../hooks/auth.js";

export default function ReportList() {
  const [showModal, setShowModal] = useState(false);

  const [reportData, setReportData] = useState({
    selectedUser: null as number,
    selectedReport: null as number,
    status: "Pending",
  });

  const navigate = useNavigate();

  const { reports } = useListReports();
  console.log("RARARA", reports);
  // const reports: any[] = [];
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
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const { assignReport } = useAssignReport();
  const { users } = useUsers();
  async function handleReportAssign() {
    try {
      await assignReport({
        report_id: reportData.selectedReport,
        user_id: reportData.selectedUser,
      });

      handleCloseModal();
    } catch (e) {
      console.error(e);
      alert("Please select valid options");
    }
  }
  function handleCreateReport() {
    navigate("/create-report-admin");
  }
  const { deleteReport } = useDeleteReport();
  async function removeReport(report_id: number) {
    await deleteReport(report_id);
  }
  return (
    <>
      <Navbar />
      {/* [Leads] start */}
      <div
        className="col-xxl-8 d-flex flex-column justify-content-center align-items-center mt-5"
        style={{ margin: "auto" }}
      >
        <div className="card stretch stretch-full"
         style={{ width: "80vw", fontFamily: "Inter,sans-serif", }}>
          <div className="card-header">
            <h1
              className="card-title mb-5 text-center"
              style={{ fontSize: "22px", fontFamily: "Inter,sans-serif" }}
            >
              Admin Report Panel
            </h1>
          </div>
          <div className="card-body custom-card-action p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr className="border-b">
                    <th scope="row" style={{ fontSize: "11px" }}>
                      Report Name
                    </th>
                    <th style={{ fontSize: "11px" }}>Start Date</th>
                    <th style={{ fontSize: "11px" }}>End Date</th>
                    <th style={{ fontSize: "11px" }}>CPM</th>
                    <th style={{ fontSize: "11px" }}>Status</th>
                    {/* <th style={{ fontSize: "14px" }}>Edit</th> */}
                  </tr>
                </thead>
                {reports.length !== 0 ? (
                  reports.map((report, index) => (
                    <tbody style={{fontSize: "0.9rem"}}>
                      <tr key={index}>
                        <td className="text-primary">{report.name}</td>
                        <td className="text-success">
                          {formatDate(report.start_date)}
                        </td>
                        <td className="text-danger">
                          {formatDate(report.end_date)}
                        </td>
                        <td className={"text-success"}>{report?.cpm_rate}</td>
                        <td
                          className={
                            report?.status !== "Done"
                              ? "text-danger"
                              : "text-success"
                          }
                        >
                          {report?.status || "Processed"}
                        </td>
                        <td className="text-end d-flex align-items-center justify-content-center">
                          <button
                            className="btn btn-light"
                            onClick={() =>
                              navigate(`/report-list-user/${report.id}`)
                            }
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>
                          <button
                            className="mx-2 btn btn-light"
                            onClick={() => removeReport(report.id)}
                          >
                            <i className="fa-solid fa-trash"></i>
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
          <div className="d-flex justify-content-center flex-col-750px align-items-center gap-3" style={{marginTop: "7rem"}}>
            <Button
              className="btn btn-primary "
              style={{ width: "300px", aspectRatio: "3/0.5" }}
              onClick={handleShowModal}
            >
              Assign Report
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Reports</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formReports">
              <Form.Label>Reports:</Form.Label>
              <Form.Control
                as="select"
                name="selectedReport"
                value={reportData.selectedReport}
                onChange={(e) =>
                  setReportData({
                    ...reportData,
                    selectedReport: Number(e.target.value),
                  })
                }
                required
              >
                <option value="">Select a report</option>
                {reports.map((report, index) => (
                  <option key={index} value={report.id}>
                    {report.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formReports">
              <Form.Label>Users:</Form.Label>
              <Form.Control
                as="select"
                required
                name="selectedUser"
                value={reportData.selectedUser}
                onChange={(e) =>
                  setReportData({
                    ...reportData,
                    selectedUser: Number(e.target.value),
                  })
                }
              >
                <option value="">Select a user</option>
                {users.map((user, index) => (
                  <option key={index} value={user.id}>
                    {user.username}
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
              Assign Report
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
