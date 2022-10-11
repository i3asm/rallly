import { VoteType } from "@prisma/client";
import clsx from "clsx";

import DotsHorizontal from "@/components/icons/dots-horizontal.svg";

import CompactButton from "../../../compact-button";
import { ScrollSyncPane } from "../../../scroll-sync";
import { useGridContext } from "../../grid-view-poll";
import { usePollStateContext } from "../../poll-viz";
import { PollViewParticipant } from "../../types";
import UserAvatar from "../../user-avatar";
import VoteIcon from "../../vote-icon";

export const GridBodyRow: React.VoidFunctionComponent<{
  name: string;
  color?: string;
  votes: Array<VoteType | undefined>;
  className?: string;
  selected?: boolean;
  disabled?: boolean;
  you?: boolean;
  onSelect?: () => void;
}> = ({ name, votes, color, disabled, you, selected, className, onSelect }) => {
  const { sidebarWidth, columnWidth, numberOfVisibleColumns } =
    useGridContext();
  return (
    <div
      role={!disabled ? "button" : "container"}
      data-testid="participant-row"
      onClick={!disabled ? onSelect : undefined}
      className={clsx(
        "flex h-14 select-none",
        {
          "bg-white/50": selected,
          "hover:bg-slate-500/5 active:bg-slate-500/10": !disabled,
        },
        className,
      )}
    >
      <div
        className={clsx(
          "flex h-full shrink-0 items-center justify-between  space-x-2 border-b border-l-4 border-r border-b-slate-200/75 pr-4 pl-4",
          {
            "border-l-primary-500": selected,
            "border-l-transparent": !selected,
          },
        )}
        style={{ width: sidebarWidth }}
      >
        <UserAvatar name={name} showName={true} color={color} isYou={you} />
      </div>
      <ScrollSyncPane
        className="no-scrollbar flex overflow-x-auto overflow-y-hidden"
        style={{ width: numberOfVisibleColumns * columnWidth }}
      >
        {votes.map((vote, i) => {
          return (
            <div
              key={i}
              className={clsx(
                "relative flex h-14 shrink-0 items-center justify-center border-r border-b bg-white/30",
                {
                  "border-green-700/10 bg-green-100/60": vote === "yes",
                  "border-amber-700/10 bg-amber-100/60": vote === "ifNeedBe",
                  "border-slate-500/10": !vote || vote === "no",
                },
              )}
              style={{ width: columnWidth }}
            >
              <VoteIcon
                className="rounded-full shadow-slate-500/30"
                type={vote}
              />
            </div>
          );
        })}
      </ScrollSyncPane>
    </div>
  );
};

export const GridBody: React.VoidFunctionComponent<{
  participants: PollViewParticipant[];
  selectedParticipantId: string | null;
  onChange: (participantId: string | null) => void;
  className?: string;
}> = ({ className, participants, selectedParticipantId, onChange }) => {
  return (
    <div className="overflow-hidden rounded-b-md bg-slate-500/5">
      <div className={className}>
        {participants.map((entry) => {
          return (
            <GridBodyRow
              key={entry.id}
              selected={selectedParticipantId === entry.id}
              name={entry.name}
              you={entry.you}
              votes={entry.votes}
              onSelect={() => {
                onChange(entry.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};