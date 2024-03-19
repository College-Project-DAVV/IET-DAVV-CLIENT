import React, { useEffect, useState } from "react";

import styles from "./Feedback.module.scss";
import { MdCancel } from "react-icons/md";
import {
  addFeedback,
  getClass,
  getFeedback,
  getaccessUsers,
  updateFeedbackDetail,
} from "../../../actions/feedbackSession";
import { getSession } from "../../../actions/session";
import { formatDate, formatDateToAMPM, formatDateinput, isPastDate, setTimeInInputField } from "../../../actions/exportingFunctions";

const Feedback = () => {
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
  const [endTime, setEndTime] = useState("");
  const [create, setCreate] = useState(false);
  const [editFeedback,setEditFeedback]=useState(false);
  const [viewDetails,setViewDetails] = useState(false)
  const [classname, setclassName] = useState("");
  const [manageState, setManageState] = useState(0);
  const [sessionString, setSessionString] = useState("");
  const [selectedItem,setSelectedItem]=useState({});
  const handleCreate = async () => {
    setCreate(true);
  };

  
  useEffect(() => {
    const getClassNames = async () => {
      const res = await getClass();
      const res2 = await getSession();
      const res3 = await getaccessUsers();
      const res4 = await getFeedback();
      setFeedback(res4.results);
      if (res && res2 && res3) {
        setUsers(res3.results);
        setSession(res2.results);
        setBranch(res.results);
      }
    };
    getClassNames();
  }, []);

  const handleFeedbackEdit=(item)=>{
    console.log(item)
    setEditFeedback(true);
    setDate(formatDateinput(item.startTime));
    setStartTime(setTimeInInputField(item.startTime))
    setEndTime(setTimeInInputField(item.endTime));
    setCreate(true);
    setclassName(item.course_code +
      " " +
      item.year +
      " Year" +
      " " +
      item.department_name +
      " " +
      item.section)
      const combinedString = `${formatDate(item.sessionStart)} - ${formatDate(
        item.sessionEnd
      )}`;
      setSessionString(combinedString);
      
    setUserName(item.name);
    setSelectedItem(item);
  }
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

  function handleUserClick(item) {
    setSelectedUser(item);
    setUserName(item.name);
    setManageState(0);
  }
  async function handleSubmitClick() {
    let item = {
      classtable_id: selectedbranch.id,
      session_id: selectedSession.id,
      faculty_id: selectedUser.id,
      startTime: date + " " + startTime,
      endTime: date + " " + endTime,
    };
    const res = await addFeedback(item);
    if (res.message) {
      alert(res.message);
      setFeedback([...res.results, ...feedback]);

      setDate("");
      setStartTime("");
      setEndTime("");
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

  const handleUpdateDataClick = async ()=>{
    if(startTime>=endTime){
      alert('Start Time should be less than End Time');
    }
    else{
      let anyitem ={
        id : selectedItem.id,
        startTime: date + " " + startTime,
        endTime: date + " " + endTime
        }
        const res = await updateFeedbackDetail(anyitem);
        
        if(res.message)
        {
          alert(res.message);
          const array=feedback;
          const index = array.findIndex(item => item.id === anyitem.id);
    
          if (index !== -1) {
              // Update the startTime and endTime of the object
              array[index].startTime = anyitem.startTime;
              array[index].endTime = anyitem.endTime;
          }
          setFeedback(array)
          setCreate(false)
          setEditFeedback(false)
        }
        else{
          alert(res.error)
        }

    }

  }
const handleViewDetails=(item)=>{
  setViewDetails(true);
  setSelectedItem(item)
}
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
  const TableComponnet = ()=>{

    return(
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
              <td className={styles.tableRowCell}>{subject.title} {subject.first_name} {subject.last_name}</td>
              <td className={styles.tableRowCell}>{subject.subject_code}</td>
              <td className={styles.tableRowCell}>{subject.theory_credits}</td>
              <td className={styles.tableRowCell}>{subject.practical_credits}</td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
  }
  return (
    <div className={styles.feed_main_container}>
      <div className={styles.container_header} onClick={() => handleCreate()}>
        <div className={styles.feedbackContainer_Card_button}>
          Schedule Feedback
        </div>
      </div>
      <div className={styles.feedbackContainer_Card}>
        {feedback.length>0?feedback.map((item, index) => (
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
                  <span className={styles.cardHeadingValues}>{item.name}</span>
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
                  </span>{" "}
                  <span className={styles.cardHeadingValues}>{item?.code>0?item.code:0}</span>
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
                  <span className={styles.cardHeadingValuesCode}>{item.code}</span>
                </div>
              </div>
              <div className={styles.card_content_child}>
                <div>
                  <span className={styles.cardHeadings}>Subject Name :</span>
                  {item.subjects.length>0?(item?.subjects?.map((subject, index) => (
  <React.Fragment key={index}>
    <span className={styles.subjectList}>
      {index < item.subjects.length - 1 ? (subject.subject_name + "  ,") :subject.subject_name}
    </span>
  </React.Fragment>
))):<span>No Subjects are added <span className={styles.rButton}>Send Remiander to {item.email}</span></span>} 

                </div>
              </div>
            </div>
            <div className={styles.card_container_buttons}>
              
            {isPastDate(item.endTime) && <button onClick={(e)=>{
              handleFeedbackEdit(item)
            }}>Edit</button>}
              <button onClick={(e)=>handleViewDetails(item)}>View Details</button>
              <button>View Analytics</button>
            </div>
          </div>
        )):<div className={styles.nofeedbackContainer}>No FeedBack </div>}
      </div>
      {create && (
        <div className={styles.create_feedback_container}>
          <div className={styles.cancel_container}>
            <span onClick={() => setCreate(false)}>
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
                  placeholder="Search class"
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
                  placeholder="Search class"
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
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.submitButton}>
              <button
                className={styles.submit}
                onClick={() => {editFeedback?handleUpdateDataClick():handleSubmitClick()}}
              >
              {editFeedback?"Update":"Submit"}
              </button>{" "}
              <button className={styles.cancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

{
        viewDetails && <div className={styles.viewDetailsContainer}>
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
                  <span className={styles.cardHeadings}>
                    Class Cordinator :{" "}
                  </span>
                  <span className={styles.cardHeadingValues}>{selectedItem.name}</span>
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
                  <span className={styles.cardHeadingValues}>{selectedItem?.count>0?selectedItem.count:"0"}</span>
                </div>
                <div className={styles.headerDiv}>
                  <span className={styles.cardHeadings}>
                    Secret Code :
                  </span>{" "}
                  <span className={styles.cardHeadingValues}>item.code</span>
                </div>
                

                <div className={styles.headerDiv}>
                  <span className={styles.cardHeadings}>FeedBack Time:</span>
                  <span className={styles.cardHeadingValues}>
                    {formatDateToAMPM(selectedItem.startTime, selectedItem.endTime)}
                  </span>
                </div>
              
            </div>
            <TableComponnet/>
        </div>
      }
    </div>
  );
};

export default Feedback;
