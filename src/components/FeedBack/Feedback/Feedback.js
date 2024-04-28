import React, { useEffect, useState } from "react";

import styles from "./Feedback.module.scss";
import { MdCancel } from "react-icons/md";
import {
  addFeedback,
  deleteFeedbackById,
  getClass,
  getFeedback,
  getaccessUsers,
  sendRem,
  updateFeedbackDetail,
} from "../../../actions/feedbackSession";
import { getSession } from "../../../actions/session";
import {
  formatDate,
  formatDateSql,
  formatDateToAMPM,
  formatDateToDate,
  formatDateinput,
  getCurrentDate,
  isPastDate,
  setTimeInInputField,
} from "../../../actions/exportingFunctions";

const Feedback = ({setLoader}) => {
  const [branch, setBranch] = useState([]);
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedbranch, setSelectedBranch] = useState({});
  const [selectedSession, setSelectedSession] = useState({});
  const [session, setSession] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [endTime, setEndTime] = useState(10);
  const [create, setCreate] = useState(false);
  const [editFeedback, setEditFeedback] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const [classname, setclassName] = useState("");
  const [manageState, setManageState] = useState(0);
  const [sessionString, setSessionString] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const handleCreate = async () => {
    const res = await getClass();
    const res2 = await getSession();
    const res3 = await getaccessUsers();
    if (res && res2 && res3) {
      setUsers(res3?.results);
      setSession(res2?.results);
      setBranch(res?.results);

      setCreate(true);
    }
  };

  const handleClose = () => {
    setDate("");
    setStartTime("");
    setEndTime(10);
    setSelectedBranch({});
    setUserName("");
    setSessionString("");
    setclassName("");
    setSelectedSession({});
    setSelectedUser({});
    setCreate(false);
  };

  useEffect(() => {
    const getClassNames = async () => {
      
    setLoader(true)
      const res4 = await getFeedback();
      if (res4) {
        setFeedback(res4?.results);
      }
      
    setLoader(false)
    };
    getClassNames();
  }, []);

  const handleFeedbackEdit = (item) => {
    
    setEditFeedback(true);
    setDate(formatDateinput(item.startTime));
    setStartTime(setTimeInInputField(item.startTime));
    setEndTime(setTimeInInputField(item.endTime));
    const startTimeDate = new Date(item.startTime);
    const endTimeDate = new Date(item.endTime);

    const timeDifferenceMillis =
      endTimeDate.getTime() - startTimeDate.getTime();

    const timeDifferenceMinutes = Math.floor(timeDifferenceMillis / 60000);
    setEndTime(timeDifferenceMinutes);
    setCreate(true);
    setclassName(
      item.course_code +
        " " +
        item.year +
        " Year" +
        " " +
        item.department_name +
        " " +
        item.section
    );
    const combinedString = `${formatDate(item.sessionStart)} - ${formatDate(
      item.sessionEnd
    )}`;
    setSessionString(combinedString);

    setUserName(item.name);
    setSelectedItem(item);
  };
  function handleBranchClick(item) {
    setSelectedBranch(item);
    const combinedString = `${item.course_code} ${item.year} Year ${item.department_name} ${item.section}`;
    setclassName(combinedString);
    setManageState(0);
  }

  function handleSessionClick(item) {
    const combinedString = `${formatDate(item.sessionStart)} - ${formatDate(
      item.sessionEnd
    )}`;
    setSelectedSession(item);
    setSessionString(combinedString);
    setManageState(0);
  }

  // function checkRepeat ()
  // {
  //   for(const itr in  feedback)
  //   {
  //     if(selectedSession.session_id==itr.session_id && selectedbranch.id==itr.classtable_id  && selectedUser.id==itr.faculty_id)
  //     alert('Already Exist')
  //     return false;
  //   }
  //   return true;
  // }
  function handleUserClick(item) {
    setSelectedUser(item);
    setUserName(item.name);
    setManageState(0);
  }
  async function handleSubmitClick() {
    setLoader(true)
    
    if (!selectedbranch || !selectedSession || !selectedUser || !date) {
      alert("All Feilds are Compulsory");
    } else {
      const startTimeMillis = new Date(date + " " + startTime).getTime(); // Convert start time to milliseconds
      const endTimeMillis = startTimeMillis + endTime * 60000; // Calculate end time in milliseconds

      const endTimeDate = new Date(endTimeMillis); // Create a Date object for the end time
      const formattedEndTime = `${endTimeDate.getFullYear()}-${(
        endTimeDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${endTimeDate
        .getDate()
        .toString()
        .padStart(2, "0")} ${endTimeDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${endTimeDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`; // Format the end time

      let item = {
        classtable_id: selectedbranch.id,
        session_id: selectedSession.id,
        faculty_id: selectedUser.id,
        startTime: date + " " + startTime,
        endTime: formattedEndTime,
      };
      const res = await addFeedback(item);
      if (res.message) {
        alert(res.message);
        setFeedback([...res.results, ...feedback]);

        setDate("");
        setStartTime("");
        setEndTime(10);
        setSelectedBranch({});
        setUserName("");
        setSessionString("");
        setclassName("");
        setSelectedSession({});
        setSelectedUser({});
        setCreate(false);
      } else {
        alert(res.error);
      }
    }
    
    setLoader(false)
  }

  const handleUpdateDataClick = async () => {
    
    setLoader(true)
    const startTimeMillis = new Date(date + " " + startTime).getTime(); // Convert start time to milliseconds
    const endTimeMillis = startTimeMillis + endTime * 60000; // Calculate end time in milliseconds

    const endTimeDate = new Date(endTimeMillis);
    const formattedEndTime = `${endTimeDate.getFullYear()}-${(
      endTimeDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${endTimeDate
      .getDate()
      .toString()
      .padStart(2, "0")} ${endTimeDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${endTimeDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`; // Format the end time

    let anyitem = {
      id: selectedItem.feedback_id,
      startTime: formatDateSql(date, startTime),
      endTime: formattedEndTime,
    };
    const res = await updateFeedbackDetail(anyitem);

    if (res.message) {
      alert(res.message);
      const array = feedback;
      const index = array.findIndex((item) => item.feedback_id === anyitem.id);

      if (index !== -1) {
        array[index].startTime = anyitem.startTime;
        array[index].endTime = anyitem.endTime;
      }
      setFeedback(array);
      setCreate(false);
      setEditFeedback(false);
    } else {
      alert(res.error);
    }
    
    setLoader(false)
  };
  const handleViewDetails = (item) => {
    setViewDetails(true);
    setSelectedItem(item);
  };
  const filteredDataClass = branch
    ?.filter((item) => {
      const combinedString = `${item.course_code} ${item.year} Year ${item.department_name} ${item.section}`;

      // Check if combined string includes classname or any property's value includes classname
      const includesClassname =
        combinedString.toLowerCase().includes(classname.toLowerCase()) ||
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(classname.toLowerCase())
        );

      const sectionDoesNotIncludeEx = !item.section
        .toLowerCase()
        .includes("ex");

      return includesClassname && sectionDoesNotIncludeEx;
    })
    .sort((a, b) => {
      return a.course_code.localeCompare(b.course_code);
    });
  const filteredDataSession = session?.filter((item) => {
    const combinedString = `${formatDate(item.sessionStart)} - ${formatDate(
      item.sessionEnd
    )}`;

    return (
      combinedString.toLowerCase().includes(sessionString.toLowerCase()) ||
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(sessionString.toLowerCase())
      )
    );
  });

  const filteredDataUsers = users?.filter((item) => {
    return (
      item.name.toLowerCase().includes(userName.toLowerCase()) ||
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(userName.toLowerCase())
      )
    );
  });
  const handleRemiander = async (item) => {
    // Ask for confirmation
    const confirmed = window.confirm(
      `Do you want to send a reminder to ${item.email}?`
    );

    const formData = {
      email: item.email,
      classS: `${item.course_code} ${item.year} Year ${item.department_name} ${item.section}`,
      date: formatDateToDate(item.startTime),
    };
    // If user confirms, proceed with sending reminder
    if (confirmed) {
      
    setLoader(true)
      const res = await sendRem(formData);

      if (res?.message) {
        alert(`Reminder sent to ${item.email}.`);
      }
    } else {
      alert("Reminder not sent. Error Occured");
    }
    
    setLoader(false)
  };
  const handleDeleteFeedback = async(id)=>{
    const confirmed = window.confirm(
      `Are you Sure ? you want to delete the scheduled feedback it will erase all data related to this feedback.`
    );

    // If user confirms, proceed with sending reminder
    if (confirmed) {
      
    setLoader(true)
      const res = await deleteFeedbackById(id);

      if (res?.message) {
        alert(res?.message);
        
        const filteredFeedbackArray = feedback.filter(feedback => feedback.feedback_id !== id);
        setFeedback(filteredFeedbackArray)
      }else {
        alert(res?.error);
      }
    } 

    setLoader(false)
  }
  
  const TableComponnet = () => {
    return (
      <div className={styles.tableContainer}>
        <table>
          <thead className={styles.tableHeader}>
            <tr className={styles.tableHeaderRow}>
              <th>S. No</th>
              <th>Subject Name</th>
              <th>Faculty Name</th>
              <th>Subject Code</th>
              <th>Theory Credit</th>
              <th>Practical Credit</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {selectedItem?.subjects.map((subject, index) => (
              <tr key={subject.id} className={styles.tableBodyRow}>
                <td className={styles.tableRowCell}>{index + 1}</td>
                <td className={styles.tableRowCell}>{subject.subject_name}</td>
                <td className={styles.tableRowCell}>
                  {subject.title} {subject.first_name} {subject.last_name}
                </td>
                <td className={styles.tableRowCell}>{subject.subject_code}</td>
                <td className={styles.tableRowCell}>
                  {subject.theory_credits}
                </td>
                <td className={styles.tableRowCell}>
                  {subject.practical_credits}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div className={styles.feed_main_container}>
      <div className={styles.container_header} onClick={() => handleCreate()}>
        <div className={styles.feedbackContainer_Card_button}>
          Schedule Feedback
        </div>
      </div>
      <div className={styles.feedbackContainer_Card}>
        {feedback.length > 0 ? (
          feedback.map((item, index) => (
            <div className={styles.card_Container}>
              <span className={styles.indexCount}>{index + 1}</span>
              <div className={styles.card_content}>
                <div className={styles.card_content_child}>
                  <div>
                    <span className={styles.cardHeadings}>Class :</span>
                    <span
                      className={styles.cardHeadingValues}
                    >{` ${item.course_code} ${item.year} Year ${item.department_name} ${item.section}`}</span>
                  </div>
                  <div>
                    <span className={styles.cardHeadings}>
                      Class Cordinator :{" "}
                    </span>
                    <span className={styles.cardHeadingValues}>
                      {item.name}
                    </span>
                  </div>
                </div>

                <div className={styles.card_content_child}>
                  <div>
                    <span className={styles.cardHeadings}>Session</span>{" "}
                    <span className={styles.cardHeadingValues}>
                      {formatDate(item.sessionStart)} to{" "}
                      {formatDate(item.sessionEnd)}
                    </span>
                  </div>
                  <div>
                    <span className={styles.cardHeadings}>
                      Number of Students given Feedback:
                    </span>
                    <span className={styles.cardHeadingValues}>
                      {item?.total_students / item.subjects.length > 0
                        ? item?.total_students / item.subjects.length
                        : "Nil"}
                    </span>
                  </div>
                </div>
                <div className={styles.card_content_child}>
                  <div>
                    <span className={styles.cardHeadings}>FeedBack Time:</span>
                    <span className={styles.cardHeadingValues}>
                      {formatDateToAMPM(item.startTime, item.endTime)}
                    </span>
                  </div>
                  <div>
                    <span className={styles.cardHeadings}>FeedBack Code :</span>
                    <span className={styles.cardHeadingValuesCode}>
                      {item.code}
                    </span>
                  </div>
                </div>
                <div className={styles.card_content_child}>
                  <div>
                    <span className={styles.cardHeadings}>Subject Name :</span>
                    {item.subjects.length > 0 ? (
                      item?.subjects?.map((subject, index) => (
                        <React.Fragment key={index}>
                          <span className={styles.subjectList}>
                            {index < item.subjects.length - 1
                              ? subject.subject_name + "  ,"
                              : subject.subject_name}
                          </span>
                        </React.Fragment>
                      ))
                    ) : (
                      <span>
                        No Subjects are added{" "}
                        <span
                          className={styles.rButton}
                          onClick={() => handleRemiander(item)}
                        >
                          Send Remainder to {item.email}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.card_container_buttons}>
                {isPastDate(item.endTime) && (
                  <button
                    onClick={(e) => {
                      handleFeedbackEdit(item);
                    }}
                  >
                    Edit
                  </button>
                )}
                <button onClick={(e) => handleViewDetails(item)}>
                  View Details
                </button>
                <button onClick={(e) => handleDeleteFeedback(item.feedback_id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.nofeedbackContainer}>No FeedBack </div>
        )}
      </div>
      {create && (
        <div className={styles.create_feedback_container}>
          <div className={styles.cancel_container}>
            <span onClick={() => handleClose()}>
              <MdCancel className={styles.delete} />
            </span>
          </div>
          <p> Enter the Details</p>
          <div className={styles.feedbackform}>
            <div className={styles.inputContainer}>
              <div className={styles.inputheading}>Class</div>
              <div className={styles.inputfeild}>
                <input
                  placeholder="Search class"
                  value={classname}
                  onChange={(e) => setclassName(e.target.value)}
                  onFocus={() => setManageState(1)}
                  disabled={editFeedback}
                />

                {manageState === 1 && (
                  <div className={styles.dropdownselector}>
                    {filteredDataClass.map((item, index) => (
                      <div onClick={() => handleBranchClick(item)}>
                        {item.course_code +
                          " " +
                          item.year +
                          " Year" +
                          " " +
                          item.department_name +
                          " " +
                          item.section}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputheading}> Class Teacher</div>
              <div className={styles.inputfeild}>
                <input
                  placeholder="Search class Cordinator"
                  value={userName}
                  onFocus={() => setManageState(2)}
                  onChange={(e) => setUserName(e.target.value)}
                  disabled={editFeedback}
                />
                {manageState === 2 && (
                  <div className={styles.dropdownselector}>
                    {filteredDataUsers.map((item, index) => (
                      <div onClick={() => handleUserClick(item)}>
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputheading}>Session</div>
              <div className={styles.inputfeild}>
                <input
                  placeholder="Search Session"
                  value={sessionString}
                  onFocus={() => setManageState(3)}
                  onChange={(e) => setSessionString(e.target.value)}
                  disabled={editFeedback}
                />
                {manageState === 3 && (
                  <div className={styles.dropdownselector}>
                    {filteredDataSession.map((item, index) => (
                      <div onClick={() => handleSessionClick(item)}>
                        {formatDate(item.sessionStart)} -{" "}
                        {formatDate(item.sessionEnd)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputheading}>Date</div>
              <div className={styles.inputfeild}>
                <input
                  type="date"
                  value={date}
                  min={getCurrentDate()}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputheading}>Starting Time</div>
              <div className={styles.inputfeild}>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.inputContainer}>
              <div className={styles.inputheading}>Ending Time</div>
              <div className={styles.inputfeild}>
                <select
                  label="Access"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  <option value={10}>10 Minutes</option>

                  <option value={15}>15 Minutes</option>

                  <option value={30}>30 Minutes</option>

                  <option value={45}>45 Minutes</option>
                </select>
              </div>
            </div>
            <div className={styles.submitButton}>
              <button
                className={styles.submit}
                onClick={() => {
                  editFeedback ? handleUpdateDataClick() : handleSubmitClick();
                }}
              >
                {editFeedback ? "Update" : "Submit"}
              </button>{" "}
            </div>
          </div>
        </div>
      )}

      {viewDetails && (
        <div className={styles.viewDetailsContainer}>
          <div className={styles.cancel_container}>
            <span onClick={() => setViewDetails(false) && setSelectedItem({})}>
              <MdCancel className={styles.delete} />
            </span>
          </div>

          <p>FeedBack Details</p>
          <div className={styles.detailsContainer}>
            <div className={styles.headerDiv}>
              <span className={styles.cardHeadings}>Class :</span>
              <span
                className={styles.cardHeadingValues}
              >{` ${selectedItem.course_code} ${selectedItem.year} Year ${selectedItem.department_name} ${selectedItem.section}`}</span>
            </div>
            <div className={styles.headerDiv}>
              <span className={styles.cardHeadings}>Class Cordinator : </span>
              <span className={styles.cardHeadingValues}>
                {selectedItem.name}
              </span>
            </div>
            <div className={styles.headerDiv}>
              <span className={styles.cardHeadings}>Session</span>{" "}
              <span className={styles.cardHeadingValues}>
                {formatDate(selectedItem.sessionStart)} to{" "}
                {formatDate(selectedItem.sessionEnd)}
              </span>
            </div>
            <div className={styles.headerDiv}>
              <span className={styles.cardHeadings}>
                Number of Students given Feedback:
              </span>{" "}
              <span className={styles.cardHeadingValues}>
                {selectedItem?.count > 0 ? selectedItem.count : "0"}
              </span>
            </div>
            <div className={styles.headerDiv}>
              <span className={styles.cardHeadings}>Secret Code :</span>{" "}
              <span className={styles.cardHeadingValues}>
                {selectedItem?.code}
              </span>
            </div>

            <div className={styles.headerDiv}>
              <span className={styles.cardHeadings}>FeedBack Time:</span>
              <span className={styles.cardHeadingValues}>
                {formatDateToAMPM(selectedItem.startTime, selectedItem.endTime)}
              </span>
            </div>
          </div>
          <TableComponnet />
        </div>
      )}
    </div>
  );
};

export default Feedback;
