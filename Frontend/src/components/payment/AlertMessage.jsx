import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function AlertMessage({ id, children = "" }) {
  return (
    <div
      id={id}
      className="flex flex-row text-sm text-red-800 dark:text-red-400 gap-2"
      role="alert"
    >
      <ExclamationCircleIcon className="size-5"></ExclamationCircleIcon>
      <span className="font-medium">{children}</span>
    </div>
  );
}
