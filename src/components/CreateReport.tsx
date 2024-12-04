import React, { useMemo, useState } from "react";
import Navbar from "./Navbar.js";
import { DatePicker, DateRangeInput, DateRangePicker } from "rsuite";
import { useNavigate } from "react-router-dom";
import { DateRange } from "rsuite/esm/DateRangePicker/types";
import { useAdUnits, useCreateReport } from "../hooks/data";
import Select from "react-select";
import { Button } from "react-bootstrap";

export default function CreateReport() {
  const navigate = useNavigate();
  const [reportInfo, setReportInfo] = useState({
    name: "",
    dateRange: [new Date(), new Date()] as [Date, Date],
    timeZone: "",
    adUnit: [] as { label: string; value: number }[],
    status: "Pending",
    cpm: 10,
  });
  console.log(reportInfo);
  function dateRangeHandle(value: Date) {
    const date = Date.UTC(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
      0,
      0,
      0 // Start of the day in UTC
    )
    setReportInfo({ ...reportInfo, dateRange: [date, reportInfo.dateRange[1]] });
  }
  async function handleCreateReportClick() {
    await createReport({
      ad_unit_ids: reportInfo.adUnit.map((item) => item.value),
      cpm: reportInfo.cpm,
      start_date: reportInfo.dateRange[0].toISOString(),
      end_date: reportInfo.dateRange[1].toISOString(),
      name: reportInfo.name,
    });
    // const existingReports =
    //   JSON.parse(localStorage.getItem("reportInfo")) || [];
    // const updatedReports = [...existingReports, reportInfo];
    // localStorage.setItem("reportInfo", JSON.stringify(updatedReports));
    navigate("/report-list-admin");
  }
  const { createReport, creatingReport } = useCreateReport();
  const { adUnits } = useAdUnits();
  const isValid = useMemo(() => {
    if (reportInfo.adUnit.length < 1) return false;
    if (!reportInfo.name || !reportInfo.cpm) return false;
    if (creatingReport) return false;
    return true;
  }, [reportInfo]);
  return (
    <>
      <Navbar />
      {/*! [Start] Main Content !*/}
      {/*! ================================================================ !*/}
      <main
        className="nxl-container d-flex justify-content-center align-items-center"
        style={{ width: "100%", margin: 0, position: "static" }}
      >
        <div className="nxl-content">
          {/* [ Main Content ] start */}
          <div className="main-content">
            <div className="row">
              <div className="col-lg-12">
                <div className="card stretch stretch-full">
                  <hr className="mt-0" />
                  <div className="card-body general-info">
                    <div
                      className=" d-flex align-items-center justify-content-center"
                      style={{ marginBottom: "4rem" }}
                    >
                      <h1 className="fw-bold mb-0 me-4">
                        <span className="d-block mb-2">Create Report :</span>
                        <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                          General information for your Report
                        </span>
                      </h1>
                    </div>
                    <div className="row mb-4 text-left">
                      <div className="col-lg-4">
                        <label htmlFor="fullnameInput" className="fw-semibold">
                          Name:{" "}
                        </label>
                      </div>
                      <div className="col-lg-8">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            id="fullnameInput"
                            placeholder="Name"
                            value={reportInfo.name}
                            onChange={(e) =>
                              setReportInfo({
                                ...reportInfo,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4 text-left">
                      <div className="col-lg-4">
                        <label htmlFor="CTR" className="fw-semibold">
                          CPM:{" "}
                        </label>
                      </div>
                      <div className="col-lg-8">
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            id="CTR"
                            placeholder="CTR"
                            value={reportInfo.cpm}
                            onChange={(e) =>
                              setReportInfo({
                                ...reportInfo,
                                cpm: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4 text-left">
                      <div className="col-lg-4">
                        <label htmlFor="fullnameInput" className="fw-semibold">
                          Start Date:{" "}
                        </label>
                      </div>
                      <div className="col-lg-8">
                        <DatePicker
                          value={reportInfo.dateRange[0]}
                          onChange={dateRangeHandle}
                        />
                      </div>
                    </div>
                    <div className="row mb-4 text-left">
                      <div className="col-lg-4">
                        <label className="fw-semibold">Time Zone: </label>
                      </div>
                      <div className="col-lg-8">
                        <select
                          className="form-control"
                          data-select2-selector="tzone"
                          value={reportInfo.timeZone}
                          onChange={(e) =>
                            setReportInfo({
                              ...reportInfo,
                              timeZone: e.target.value,
                            })
                          }
                        >
                          <option data-tzone="feather-moon">
                            (GMT -12:00) Eniwetok, Kwajalein
                          </option>
                          <option data-tzone="feather-moon">
                            (GMT -11:00) Midway Island, Samoa
                          </option>
                          <option data-tzone="feather-moon">
                            (GMT -10:00) Hawaii
                          </option>
                          <option data-tzone="feather-moon">
                            (GMT -9:30) Taiohae
                          </option>
                          <option data-tzone="feather-moon">
                            (GMT -9:00) Alaska
                          </option>
                          <option data-tzone="feather-moon">
                            (GMT -8:00) Pacific Time (US &amp; Canada)
                          </option>
                          <option data-tzone="feather-moon">
                            (GMT -7:00) Mountain Time (US &amp; Canada)
                          </option>
                          <option data-tzone="feather-moon">
                            (GMT -6:00) Central Time (US &amp; Canada), Mexico
                            City
                          </option>
                          <option data-tzone="feather-moon">
                            (GMT -5:00) Eastern Time (US &amp; Canada), Bogota,
                            Lima
                          </option>
                          <option data-tzone="feather-moon">
                            (GMT -4:30) Caracas
                          </option>
                          <option data-tzone="feather-moon">
                            (GMT -4:00) Atlantic Time (Canada), Caracas, La Paz
                          </option>
                          <option data-tzone="feather-moon">
                            (GMT -3:30) Newfoundland
                          </option>
                          <option data-tzone="feather-moon">
                            (GMT -3:00) Brazil, Buenos Aires, Georgetown
                          </option>
                          <option data-tzone="feather-moon">
                            (GMT -2:00) Mid-Atlantic
                          </option>
                          <option data-tzone="feather-moon">
                            (GMT -1:00) Azores, Cape Verde Islands
                          </option>
                          <option data-tzone="feather-sunrise">
                            (GMT) Western Europe Time, London, Lisbon,
                            Casablanca
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +1:00) Brussels, Copenhagen, Madrid, Paris
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +2:00) Kaliningrad, South Africa
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +3:30) Tehran
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +4:30) Kabul
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +5:00) Ekaterinburg, Islamabad, Karachi,
                            Tashkent
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +5:30) Bombay, Calcutta, Madras, New Delhi
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +5:45) Kathmandu, Pokhara
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +6:00) Almaty, Dhaka, Colombo
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +6:30) Yangon, Mandalay
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +7:00) Bangkok, Hanoi, Jakarta
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +8:00) Beijing, Perth, Singapore, Hong Kong
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +8:45) Eucla
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +9:30) Adelaide, Darwin
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +10:00) Eastern Australia, Guam, Vladivostok
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +10:30) Lord Howe Island
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +11:00) Magadan, Solomon Islands, New Caledonia
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +11:30) Norfolk Island
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +12:00) Auckland, Wellington, Fiji, Kamchatka
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +12:45) Chatham Islands
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +13:00) Apia, Nukualofa
                          </option>
                          <option data-tzone="feather-sun">
                            (GMT +14:00) Line Islands, Tokelau
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-4 text-left">
                      <div className="col-lg-4">
                        <label className="fw-semibold">
                          Ad Units (include):{" "}
                        </label>
                      </div>
                      <div className="col-lg-8">
                        <Select
                          closeMenuOnSelect={false}
                          options={adUnits}
                          value={reportInfo.adUnit}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value as any}
                          isMulti
                          onChange={(e) =>
                            setReportInfo((old) => ({
                              ...old,
                              adUnit: e as any,
                            }))
                          }
                        />
                      </div>
                      <div className="d-flex mt-2">
                        <Button
                          onClick={() => {
                            setReportInfo((old) => ({
                              ...old,
                              adUnit: [],
                            }));
                          }}
                          style={{
                            marginLeft: "auto",
                            marginRight: "10px",
                          }}
                        >
                          Clear All
                        </Button>
                        <Button
                          onClick={() => {
                            setReportInfo((old) => ({
                              ...old,
                              adUnit: adUnits.map((unit) => ({
                                label: unit.label,
                                value: unit.value,
                              })),
                            }));
                          }}
                        >
                          Select All
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className=" btn btn-primary successAlertMessage text-center mt-4"
                      style={{ width: "300px", aspectRatio: "3/0.5" }}
                      onClick={handleCreateReportClick}
                      disabled={!isValid}
                    >
                      Create Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* [ Main Content ] end */}
        </div>
      </main>
      {/*! ================================================================ !*/}
      {/*! [End] Main Content !*/}
    </>
  );
}
