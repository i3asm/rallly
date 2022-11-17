import clsx from "clsx";
import { groupBy } from "lodash";
import * as React from "react";

import { Sticky } from "../../sticky";
import { PollViewOption } from "../types";
import PollOptions from "./poll-options";

export interface GroupedOptionsProps {
  options: PollViewOption[];
  editable?: boolean;
  selectedParticipantId?: string;
  group: (option: PollViewOption) => string;
  groupClassName?: string;
}

const GroupedOptions: React.VoidFunctionComponent<GroupedOptionsProps> = ({
  options,
  editable,
  selectedParticipantId,
  group,
  groupClassName,
}) => {
  const grouped = groupBy(options, group);

  return (
    <div className="select-none divide-y">
      {Object.entries(grouped).map(([day, options]) => {
        return (
          <div key={day}>
            <Sticky
              top={109}
              className={clsx(
                "z-10 flex border-b bg-gray-50/80 py-2 px-4 text-sm font-semibold backdrop-blur-md sm:px-6",
                groupClassName,
              )}
            >
              {day}
            </Sticky>
            <PollOptions
              options={options}
              editable={editable}
              selectedParticipantId={selectedParticipantId}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GroupedOptions;