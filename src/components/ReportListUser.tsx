import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar.js";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useListRecords, useListReports } from "../hooks/data.js";
import { downloadCSV } from "../services/download-csv.js";
import { DateRangePicker } from "rsuite";
import dayjs from "dayjs";
import { Chart } from "./chart.js";
export default function ReportListUser() {
  const [dayValue, setDayValue] = useState<[Date, Date]>([
    dayjs().startOf("week").toDate(),
    dayjs().toDate(),
  ]);
  const params = useParams();
  const { records: recordData } = useListRecords(params?.id || null);
  const records = useMemo(() => {
    const startTime = dayValue[0].getTime();
    const endTime = dayValue[1].getTime();
    const map: Record<string, (typeof recordData)[0]> = {};
    recordData.forEach((record) => {
      const recordTime = new Date(record.date).getTime();
      if (recordTime >= startTime && recordTime <= endTime) {
        if (map?.[record.date]) {
          map[record.date].impressions = (
            Number(map[record.date].impressions) + Number(record.impressions)
          ).toString();
          map[record.date].clicks = (
            Number(map[record.date].clicks) + Number(record.clicks)
          ).toFixed(2);
          map[record.date].ctr =
            Number(map[record.date].ctr) + Number(record.ctr);
          map[record.date].revenue = (
            Number(map[record.date].revenue) + Number(record.revenue)
          ).toFixed(2);
        } else {
          map[record.date] = record;
        }
      }
    });
    console.log("FAFA", map);
    return Object.values(map);
  }, [recordData, dayValue]);
  const { reports } = useListReports();
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
        <div className="container my-5">
          <div className="row" style={{ fontFamily: "Inter,sans-serif" }}>
            {/* Impressions Card */}
            <div className=" col-md-6 mb-4">
              <div
                className="stat-card d-flex px-5 py-3 align-items-center"
                style={{ borderRadius: "10px" }}
              >
                <div className="text-start d-flex flex-column">
                  <p
                    className="text-body-tertiary m-0 fw-bold"
                    style={{ color: "#8B8F98", fontSize: "12px" }}
                  >
                    Impressions
                  </p>
                  <h3
                    className="stat-title m-0 fw-bold fs-4 mb-1"
                    style={{
                      color: "#283C50",
                    }}
                  >
                    {totalImpressions.toLocaleString()}
                  </h3>
                  <p
                    className="stat-title m-0 fw-bold mb-1"
                    style={{ color: "#283C50" }}
                  >
                    {/* <span
                      className="fw-bold"
                      style={{ fontSize: "12px", color: "#8B8F98" }}
                    >
                      vs previous:
                    </span>{" "} */}
                    {/* 42,563 */}
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
                    style={{ color: "#8B8F98", fontSize: "12px" }}
                  >
                    Revenue (BDT)
                  </p>
                  <h3
                    className="stat-title m-0 fw-bold fs-4 mb-1"
                    style={{
                      color: "#283C50",
                    }}
                  >
                    {totalRevenue.toLocaleString()}
                  </h3>
                  {/* <p
                    className="stat-title m-0 fw-bold mb-1"
                    style={{ color: "#283C50" }}
                  >
                    <span
                      className="fw-bold"
                      style={{ fontSize: "12px", color: "#8B8F98" }}
                    >
                      vs previous:
                    </span>{" "}
                    42,563
                  </p> */}
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
                    style={{ color: "#8B8F98", fontSize: "12px" }}
                  >
                    Clicks
                  </p>
                  <h3
                    className="stat-title m-0 fw-bold fs-4 mb-1"
                    style={{
                      color: "#283C50",
                    }}
                  >
                    {totalClicks.toLocaleString()}
                  </h3>
                  {/* <p
                    className="stat-title m-0 fw-bold mb-1"
                    style={{ color: "#283C50" }}
                  >
                    <span
                      className="fw-bold"
                      style={{ fontSize: "12px", color: "#8B8F98" }}
                    >
                      vs previous:
                    </span>{" "}
                    42,563
                  </p> */}
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
                    style={{ color: "#8B8F98", fontSize: "12px" }}
                  >
                    CPM (BDT)
                  </p>
                  <h3
                    className="stat-title m-0 fw-bold fs-4 mb-1"
                    style={{
                      color: "#283C50",
                    }}
                    onClick={() => console.log(reports)}
                  >
                    {reports
                      ?.find((item) => item?.id == (params?.id as any))
                      ?.cpm_rate?.toLocaleString() || "-"}{" "}
                    BDT
                  </h3>
                  {/* <p
                    className="stat-title m-0 fw-bold mb-1"
                    style={{ color: "#283C50" }}
                  >
                    <span
                      className="fw-bold"
                      style={{ fontSize: "12px", color: "#8B8F98" }}
                    >
                      vs previous:
                    </span>{" "}
                    42,563
                  </p> */}
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
          <div
            className=" rounded-3 d-flex flex-column justify-content-between"
            style={{
              width: "100%",
              backgroundColor: "#3454D1",
              padding: "0",
              fontFamily: "Inter,sans-serif",
            }}
          >
            <div className="text-left mt-3 ml-3 ">
              <h3 className="stat-title fw-semibold m-0 fs-5 text-white">
                {totalImpressions.toLocaleString()}
              </h3>
              <p
                className="m-0 fw-semibold"
                style={{ color: "rgb(223, 227, 240)", fontSize: "12px" }}
                onClick={() => {
                  console.log(
                    [...records]
                      .filter(
                        (item, index, list) =>
                          list.findIndex(
                            (iteminner) => iteminner.date === item.date
                          ) === index
                      )
                      .sort(
                        (a, b) =>
                          new Date(a.date).getTime() -
                          new Date(b.date).getTime()
                      )
                      .map((item) => ({
                        x: item.date,
                        y: item.impressions,
                      }))
                  );
                }}
              >
                Impressions Served
              </p>
            </div>
            <Chart
              data={[...records]
                .filter(
                  (item, index, list) =>
                    list.findIndex(
                      (iteminner) => iteminner.date === item.date
                    ) === index
                )
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                .map((item) => ({
                  x: item.date,
                  y: item.impressions,
                }))}
            />
            {/* <img src="/chart-img.png" className="chart-img" alt="" /> */}
          </div>
        </div>
      </div>
      {/* [Leads] start */}
      <div
        className="col-xxl-8 d-flex flex-column justify-content-center align-items-center"
        style={{ marginInline: "auto", marginTop: "5rem" }}
      >
        <div
          className="card stretch stretch-full"
          style={{ width: "87vw", maxWidth: "1400px" }}
        >
          <div className="card-header pb-4 px-3 d-flex align-items-start flex-col-750px">
            <h1
              className="card-title m-3 card-title-user  text-center"
              style={{ fontSize: "22px", fontFamily: "Inter,sans-serif" }}
            >
              User Report Panel
            </h1>
            <div className="card-header-action d-flex gap-2 px-2 ">
              <DateRangePicker value={dayValue} onChange={setDayValue} />

              <Button
                className="btn btn-primary"
                onClick={() =>
                  downloadCSV(records, "report.csv", [
                    "date",
                    "impressions",
                    "clicks",
                    "ctr",
                    "revenue",
                  ])
                }
              >
                Download
              </Button>
            </div>
          </div>
          <div className="card-body custom-card-action p-0">
            <div className="table-responsive">
              <table
                className="table table-hover mb-0"
                style={{ fontFamily: "Inter,sans-serif" }}
              >
                <thead>
                  <tr className="border-b">
                    <th style={{ fontSize: "11px", fontWeight: "700" }}>
                      Date
                    </th>
                    <th style={{ fontSize: "11px", fontWeight: "700" }}>
                      Ad Server Impression
                    </th>
                    <th style={{ fontSize: "11px", fontWeight: "700" }}>
                      Ad Server Clicks
                    </th>
                    <th style={{ fontSize: "11px", fontWeight: "700" }}>
                      Ad Server CTR
                    </th>
                    <th style={{ fontSize: "11px", fontWeight: "700" }}>
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody
                  style={{ fontFamily: "Inter,sans-serif", fontSize: "14px" }}
                >
                  {records.length > 0 ? (
                    <>
                      {records.map((record) => {
                        return (
                          <tr key={record.id}>
                            <td>{record.date}</td>
                            <td>{record.impressions}</td>
                            <td>{record.clicks}</td>
                            <td>{(record.ctr * 100).toFixed(2)}%</td>
                            <td>৳ {record.revenue}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td>
                          Total Impressions:{" "}
                          <span
                            style={{
                              color: "rgb(0, 107, 225)",
                              fontWeight: "bold",
                              fontFamily: "Inter,sans-serif",
                            }}
                          >
                            {totalImpressions.toLocaleString()}
                          </span>
                        </td>
                        <td colSpan={2}>
                          Total Clicks:{" "}
                          <span
                            style={{
                              color: "rgb(0, 107, 225)",
                              fontWeight: "bold",
                              fontFamily: "Inter,sans-serif",
                            }}
                          >
                            {totalClicks.toLocaleString()}
                          </span>
                        </td>
                        <td colSpan={3}>
                          Total Revenue:&nbsp;
                          <span
                            style={{
                              color: "rgb(0, 107, 225)",
                              fontWeight: "bold",
                              fontFamily: "Inter,sans-serif",
                            }}
                          >
                            ৳{Number(totalRevenue.toFixed(2)).toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <></>
                  )}
                  {records.length === 0 && (
                    <tr
                      className="d-flex mt-6 justify-content-center align-items-center w-full"
                      style={{ width: "90%" }}
                    >
                      <td colSpan={6} className="text-secondary fst-italic">
                        No Reports Yet...
                      </td>
                    </tr>
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
