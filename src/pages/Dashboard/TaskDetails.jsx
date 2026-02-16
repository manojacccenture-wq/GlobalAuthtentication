import React from "react";
import TaskMetaInfo from "./TaskMetaInfo";
import TaskTimingInfo from "./TaskTimingInfo";

export default function TaskDetails() {
  return (
    <div>
      <h2 className="text-lg font-medium mb-1">Task Details</h2>
      <p className="text-gray-400 mb-6">Details of the task</p>

      <TaskMetaInfo />
      <TaskTimingInfo />
    </div>
  );
}
