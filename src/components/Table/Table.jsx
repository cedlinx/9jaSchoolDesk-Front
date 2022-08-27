import React, {useMemo, forwardRef, useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import { useTable, usePagination, useRowSelect, useRowState } from "react-table";
import "./Table.css";
import { Icon } from "@iconify/react";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";


const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    // border-bottom: 1px solid black;
    // min-height: 40vh;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    margin-top: 3rem;
    padding: 0.5rem;
  }
`;

const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);
IndeterminateCheckbox.displayName = "Search";

const Table = ({ columns, data, selectedRowsData, loading, showPaginationNavigation, showPagination, showPaginationSummary, showTableHeader, defaultPageSize })=> {
	
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds }
  } = useTable(
    {
      columns,
      data,
      initialState: { hiddenColumns: ["hidden_id"], pageIndex: 0, pageSize: defaultPageSize }
    },
    usePagination,
    useRowSelect,
    useRowState
    // hooks => {
    //   hooks.visibleColumns.push(columns => [
    //     // Let's make a column for selection
    //     {
    //       id: "selection",
    //       // The header can use the table's getToggleAllRowsSelectedProps method
    //       // to render a checkbox
    //       Header: ({ getToggleAllPageRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
    //         </div>
    //       ),
    //       // The cell can use the individual row's getToggleRowSelectedProps method
    //       // to the render a checkbox
    //       Cell: ({ row }) => {
    //         return <div >
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>;
    //       }	
    //     },
    //     ...columns
    //   ]);
    // }
  );
  selectedRowsData && selectedRowsData(selectedFlatRows);

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        {showTableHeader && <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => (
                <th {...column.getHeaderProps()} key={idx} >{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>}
        {loading ? <TableSkeleton /> :
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return <td  key={index} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody> 
        }
      </table>
      {page.length === 0 ? <div style={{width: "100%", padding: "1rem 0rem", textAlign: "center", minHeight: "50vh", color: "black"}} >Data Not Found</div> : ""}
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      {showPagination && <div className="pagination flexRow-space-between">
        {showPaginationSummary && <div className="pagination-summary">
                    Showing <span>{pageSize > data.length ? data.length : pageSize}</span> from <span>{data.length}</span> data
        </div>}

        {showPaginationNavigation && <div className="pagination-navigation">
          <div className="pagination-navigation-btn-wrapper">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              <Icon icon="bi:chevron-double-left" color="white" />
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <Icon icon="bi:chevron-left" color="white" />
            </button>{" "}
					
            <span>
          Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <span className="go-to-span">
          || Go to:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "50px", borderRadius: "0.25rem", border: "1px solid gray"}}
              />
            </span>{" "}

            <button onClick={() => nextPage()} disabled={!canNextPage}>
              <Icon icon="bi:chevron-left" color="white" hFlip={true} />
            </button>{" "}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              <Icon icon="bi:chevron-double-left" color="white" hFlip={true} />
            </button>{" "}	
          </div>
					

          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
            }}
          >
                        
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
              Show {pageSize}
              </option>
            ))}
          </select>
        </div>}
				
      </div> }
    </>
  );
};

const TableComponent = ({columnsHeader, tableData, selectedRowsData, loading, showPaginationNavigation=true, showPaginationSummary=true, showPagination=true, showTableHeader=true, defaultPageSize=10 }) => {
  const columns = useMemo(()=>columnsHeader, []);
  const data = useMemo(()=>tableData, []);

  return (
    <Styles>
      <div className="tableWrap">
        <Table columns={columns} data={data} selectedRowsData={selectedRowsData} loading={loading} showPaginationNavigation={showPaginationNavigation} showPagination={showPagination} showPaginationSummary ={showPaginationSummary} showTableHeader={showTableHeader} defaultPageSize={defaultPageSize} />
      </div>
    </Styles>
  );
};

export default TableComponent;
