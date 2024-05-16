import { ColumnDef } from "@tanstack/react-table"

import { JobBoard } from "./schema"
import { Link } from "react-router-dom"

export const columns: ColumnDef<JobBoard>[] = [
  {
    accessorKey: "title",
    cell: ({ row }) => {
        console.log(row?.original?.adId)
        return (
            <div className="flex space-x-2">
                <Link to={`/${row?.original?.adId}`}>{row.getValue("title")}</Link>
            </div>
        )
    }
  },
  {
    accessorKey: "location",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
            {row.getValue("location")}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "company",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
            {row.getValue("company")}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]