import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar.js";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useListRecords } from "../hooks/data.js";
import { downloadCSV } from "../services/download-csv.js";
import { DateRangePicker } from "rsuite";
import dayjs from "dayjs";
export default function ReportListUser() {
  const [dayValue, setDayValue] = useState<[Date, Date]>([
    dayjs().startOf("year").toDate(),
    dayjs().endOf("year").toDate(),
  ]);
  const params = useParams();
  const { records: recordData } = useListRecords(params?.id || null);
  const records = useMemo(() => {
    const startTime = dayValue[0].getTime();
    const endTime = dayValue[1].getTime();
    return recordData.filter((record) => {
      const recordTime = new Date(record.date).getTime();
      return recordTime >= startTime && recordTime <= endTime;
    });
  }, [recordData, dayValue]);
  const { totalClicks, totalImpressions, totalRevenue } = useMemo(() => {
    let totalRevenue = 0,
      totalImpressions = 0,
      totalClicks = 0;
    for (const record of records) {
      totalRevenue += Number(record.revenue) || 0;
      totalImpressions += Number(record.impressions) || 0;
      totalClicks += Number(record.clicks || 0);
    }
    return {
      totalRevenue,
      totalImpressions,
      totalClicks,
    };
  }, [records]);

  return (
    <>
      <Navbar />
      <div className="main-content">
        {/* <div className="row">
          <div className="col-md-4 col-12">
            <div className="card stretch">
              <div className="card-body">
                <div className="hstack justify-content-between">
                  <div>
                    <div className="hstack gap-2 mb-4">
                      <i className="feather-dollar-sign"></i>
                      <span>Overall Revenue</span>
                    </div>
                    <h4 className="fw-bolder mb-3">
                      $
                      <span className="counter">{totalRevenue.toFixed(2)}</span>{" "}
                      USD
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="card stretch">
              <div className="card-body">
                <div className="hstack justify-content-between">
                  <div>
                    <div className="hstack gap-2 mb-4">
                      <span>Total Impressions</span>
                    </div>
                    <h4 className="fw-bolder mb-3">
                      <span className="counter">
                        {totalImpressions.toFixed(0)}
                      </span>{" "}
                      Impressions
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="card stretch">
              <div className="card-body">
                <div className="hstack justify-content-between">
                  <div>
                    <div className="hstack gap-2 mb-4">
                      <span>Total Clicks</span>
                    </div>
                    <h4 className="fw-bolder mb-3">
                      <span className="counter">{totalClicks.toFixed(0)}</span>{" "}
                      Clicks
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="container my-5">
          <div className="row">
            {/* Impressions Card */}
            <div className=" col-md-6 mb-4">
              <div
                className="stat-card d-flex px-5 py-3 align-items-center"
                style={{ borderRadius: "10px" }}
              >
                <div className="text-start d-flex flex-column">
                  <p
                    className="text-body-tertiary m-0 fw-bold"
                    style={{ color: "#8B8F98", fontSize: "14px" }}
                  >
                    Impressions
                  </p>
                  <h3
                    className="stat-title m-0 fw-bold fs-4 mb-1"
                    style={{
                      color: "#283C50",
                    }}
                  >
                    84,059
                  </h3>
                  <p
                    className="stat-title m-0 fw-bold mb-1"
                    style={{ color: "#283C50" }}
                  >
                    <span
                      className="fw-bold"
                      style={{ fontSize: "13px", color: "#8B8F98" }}
                    >
                      vs previous:
                    </span>{" "}
                    42,563
                  </p>
                </div>
                <div
                  className="stat-icon text-white d-flex justify-content-center align-items-center"
                  style={{
                    backgroundColor: "#3354CA",
                    width: "40px",
                    height: "40px",
                    borderRadius: "3px",
                  }}
                >
                  <i className="fas fa-tv" style={{ fontSize: "11px" }} />{" "}
                  {/* Font Awesome icon for TV/display */}
                </div>
              </div>
            </div>
            <div className=" col-md-6 mb-4">
              <div
                className="stat-card d-flex px-5 py-3 align-items-center"
                style={{ borderRadius: "10px" }}
              >
                <div className="text-start d-flex flex-column">
                  <p
                    className="text-body-tertiary m-0 fw-bold"
                    style={{ color: "#8B8F98", fontSize: "14px" }}
                  >
                    Revenue (BDT)
                  </p>
                  <h3
                    className="stat-title m-0 fw-bold fs-4 mb-1"
                    style={{
                      color: "#283C50",
                    }}
                  >
                    23,465
                  </h3>
                  <p
                    className="stat-title m-0 fw-bold mb-1"
                    style={{ color: "#283C50" }}
                  >
                    <span
                      className="fw-bold"
                      style={{ fontSize: "13px", color: "#8B8F98" }}
                    >
                      vs previous:
                    </span>{" "}
                    42,563
                  </p>
                </div>
                <div
                  className="stat-icon text-white d-flex justify-content-center align-items-center"
                  style={{
                    backgroundColor: "#15C666",
                    width: "40px",
                    height: "40px",
                    borderRadius: "3px",
                  }}
                >
                  <i
                    className="fas fa-chart-line"
                    style={{ fontSize: "11px" }}
                  />{" "}
                  {/* Font Awesome icon for TV/display */}
                </div>
              </div>
            </div>
            <div className=" col-md-6 mb-4">
              <div
                className="stat-card d-flex px-5 py-3 align-items-center"
                style={{ borderRadius: "10px" }}
              >
                <div className="text-start d-flex flex-column">
                  <p
                    className="text-body-tertiary m-0 fw-bold"
                    style={{ color: "#8B8F98", fontSize: "14px" }}
                  >
                    Clicks
                  </p>
                  <h3
                    className="stat-title m-0 fw-bold fs-4 mb-1"
                    style={{
                      color: "#283C50",
                    }}
                  >
                    12,545
                  </h3>
                  <p
                    className="stat-title m-0 fw-bold mb-1"
                    style={{ color: "#283C50" }}
                  >
                    <span
                      className="fw-bold"
                      style={{ fontSize: "13px", color: "#8B8F98" }}
                    >
                      vs previous:
                    </span>{" "}
                    42,563
                  </p>
                </div>
                <div
                  className="stat-icon text-white d-flex justify-content-center align-items-center"
                  style={{
                    backgroundColor: "#FFA11E",
                    width: "40px",
                    height: "40px",
                    borderRadius: "3px",
                  }}
                >
                  <i
                    className="fa-solid fa-light fa-mouse-pointer"
                    style={{ fontSize: "15px", marginLeft: "3px" }}
                  ></i>
                  {/* Font Awesome icon for TV/display */}
                </div>
              </div>
            </div>
            <div className=" col-md-6 mb-4">
              <div
                className="stat-card d-flex px-5 py-3 align-items-center"
                style={{ borderRadius: "10px" }}
              >
                <div className="text-start d-flex flex-column">
                  <p
                    className="text-body-tertiary m-0 fw-bold"
                    style={{ color: "#8B8F98", fontSize: "14px" }}
                  >
                    CPM (BDT)
                  </p>
                  <h3
                    className="stat-title m-0 fw-bold fs-4 mb-1"
                    style={{
                      color: "#283C50",
                    }}
                  >
                    12 BDT
                  </h3>
                  <p
                    className="stat-title m-0 fw-bold mb-1"
                    style={{ color: "#283C50" }}
                  >
                    <span
                      className="fw-bold"
                      style={{ fontSize: "13px", color: "#8B8F98" }}
                    >
                      vs previous:
                    </span>{" "}
                    42,563
                  </p>
                </div>
                <div
                  className="stat-icon text-white d-flex justify-content-center align-items-center"
                  style={{
                    backgroundColor: "#3AB1C3",
                    width: "40px",
                    height: "40px",
                    borderRadius: "3px",
                  }}
                >
                  <i
                    className="fas fa-chart-bar"
                    style={{ fontSize: "11px" }}
                  />{" "}
                  {/* Font Awesome icon for TV/display */}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* [Leads] start */}
      <div
        className="col-xxl-8 d-flex flex-column justify-content-center align-items-center mt-5"
        style={{ marginInline: "auto" }}
      >
        <h1
          className="card-title mb-5 text-center"
          style={{ fontSize: "52px", color: "#283c50", fontWeight: "700" }}
        >
          User Report Panel
        </h1>
        <div
          className="card stretch stretch-full"
          style={{ width: "80vw", maxWidth: "1400px" }}
        >
          <div className="card-header d-flex align-items-start">
            <h1
              className="card-title mb-5 text-center"
              style={{ fontSize: "32px" }}
            >
              Report
            </h1>
            <div className="card-header-action d-flex gap-2 px-2 ">
              <DateRangePicker />

              <Button
                className="btn btn-primary"
                onClick={() => downloadCSV(records, "report.csv")}
              >
                Download
              </Button>
            </div>
          </div>
          <div className="card-body custom-card-action p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr className="border-b">
                    <th scope="row" style={{ fontSize: "14px" }}>
                      Ad Unit Name
                    </th>
                    <th style={{ fontSize: "14px" }}>Date</th>
                    <th style={{ fontSize: "14px" }}>Ad Server Impression</th>
                    <th style={{ fontSize: "14px" }}>Ad Server Clicks</th>
                    <th style={{ fontSize: "14px" }}>Ad Server CTR</th>
                    <th style={{ fontSize: "14px" }}>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {records.length > 0 ? (
                    records.map((record) => (
                      <tr key={record.id}>
                        <td className="text-primary">{record.ad_unit_name}</td>
                        <td>{record.date}</td>
                        <td>{record.impressions}</td>
                        <td>{record.clicks}</td>
                        <td>{(record.ctr*100).toFixed(2)}</td>
                        <td>BDT {record.revenue}</td>
                      </tr>
                    ))
                  ) : (
                    <></>
                  )}
                  {records.length === 0 && (
                    <span
                      className="d-flex mt-6 justify-content-center align-items-center w-full"
                      style={{ width: "90%" }}
                    >
                      <span className="text-secondary fst-italic">
                        No Reports Yet...
                      </span>
                    </span>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
