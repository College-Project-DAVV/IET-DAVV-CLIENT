import React from "react";
import Cards from "./Cards/Cards";
import Bargraph from "./Bargraph/Bargraph";
import styles from "./Dashboard.module.scss";
// import Piechart from "./Piechart/Piechart";
import { useGroups } from "../../GroupDataContext";
const Dashboard = () => {
  const groups = useGroups();

  const ExtractingDataDegreeWise = [0, 0, 0, 0];
  const ExtractDataBranchWise = [0, 0, 0, 0, 0, 0];
  const ExtractDataYearDegreeWise = {
    BE: [0, 0, 0, 0],
    ME: [0, 0],
    MSC: [0, 0],
  };
  const branchMap = { cs: 0, it: 1, tc: 2, ei: 3, mech: 4, cv: 5 };
  if (groups) {
    for (const group of groups) {
      const membersCount = parseInt(group.groupMembersCount, 10); // Ensure groupMembersCount is treated as a number
      const year = parseInt(group.groupEmail.substring(0, 1), 10);
      if (
        group.groupName.includes("BE") ||
        group.groupDescription.includes("BE")
      ) {
        ExtractingDataDegreeWise[1] += membersCount;
        ExtractDataYearDegreeWise["BE"][year - 1] += membersCount;
        if (branchMap[group.groupEmail.substring(1, 3)] >= 0) {
          ExtractDataBranchWise[branchMap[group.groupEmail.substring(1, 3)]] +=
            membersCount;
        } else {
          if (group.groupEmail.substring(1, 5) === "mech") {
            ExtractDataBranchWise[4] += membersCount;
          }
        }
      } else if (
        group.groupName.includes("ME") ||
        group.groupDescription.includes("ME")
      ) {
        ExtractingDataDegreeWise[2] += membersCount;
        ExtractDataYearDegreeWise["ME"][year - 1] += membersCount;
      } else if (
        group.groupName.includes("MSC") ||
        group.groupDescription.includes("MSC")
      ) {
        ExtractingDataDegreeWise[3] += membersCount;
        ExtractDataYearDegreeWise["MSC"][year - 1] += membersCount;
      }
    }
  }
  return (
    <div className={styles.container}>
      <Cards DegreeWiseData={ExtractingDataDegreeWise} />
      <Bargraph
        ExtractingDataDegreeWise={ExtractingDataDegreeWise}
        BranchWise={ExtractDataBranchWise}
      />
    </div>
  );
};
export default Dashboard;
