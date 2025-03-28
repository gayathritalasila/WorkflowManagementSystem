import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";

const CustomPagination = ({ page, count, onPageChange }) => {
  return (
    <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2, width: "100%" }}>
      <Pagination
        count={count} // Total number of pages
        page={page} // Current active page
        onChange={(_, value) => onPageChange(value)} // Handle page change
        shape="rounded"
        siblingCount={1} // Show one page number before and after current
        boundaryCount={1} // Show first and last page
        sx={{
          "& .MuiPaginationItem-root": {
            fontSize: "13px",
            padding: "6px 12px",
            borderRadius: "6px",
            fontWeight: 500,
            transition: "all 0.3s ease-in-out",
          },
          "& .Mui-selected": {
            backgroundColor: "#FFE0B2 !important", // Highlight selected page
            color: "#fff !important",
            fontWeight: "bold",
            borderRadius: "8px",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#FFE0B2",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          },
        }}
        renderItem={(item) => <PaginationItem {...item} />}
      />
    </Stack>
  );
};

export default CustomPagination;
