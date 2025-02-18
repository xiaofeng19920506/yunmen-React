import React, { useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

interface CheckInCell {
  userId: string;
  userName: string;
}

const CheckInRoom: React.FC = () => {
  const rows = 5;
  const cols = 5;

  // Toggle this flag to simulate owner vs. non-owner view.
  const isOwner = false; // set to true to simulate the owner view

  // Simulated current user (for non-owner view)
  const currentUser = { id: "user1", name: "John Doe" };

  // Create a 5x5 grid of check-in cells (initially all null)
  const createEmptyGrid = (): (CheckInCell | null)[][] =>
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => null)
    );

  // For demonstration: if owner, simulate some pre‑filled check‑ins.
  const initialGrid: (CheckInCell | null)[][] = createEmptyGrid();
  if (isOwner) {
    initialGrid[0][0] = { userId: "user2", userName: "Alice" };
    initialGrid[1][2] = { userId: "user3", userName: "Bob" };
    initialGrid[2][3] = { userId: "user4", userName: "Charlie" };
  }

  const [grid, setGrid] = useState<(CheckInCell | null)[][]>(initialGrid);

  // Helper: Check if the current user is already checked in; return indices if yes.
  const getUserCheckedInCell = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j]?.userId === currentUser.id) {
          return { row: i, col: j };
        }
      }
    }
    return null;
  };

  // Handle cell clicks
  const handleCellClick = (row: number, col: number) => {
    const cell = grid[row][col];
    // Create a copy of the grid for immutability
    const newGrid = grid.map((r) => [...r]);

    if (isOwner) {
      // Owner view: if the cell is occupied, prompt to cancel the check‑in.
      if (cell) {
        const confirmCancel = window.confirm(
          `Cancel check‑in for ${cell.userName}?`
        );
        if (confirmCancel) {
          newGrid[row][col] = null;
          setGrid(newGrid);
        }
      }
      return;
    } else {
      // Non‑owner view
      if (cell) {
        // If the cell is occupied by the current user, allow cancellation.
        if (cell.userId === currentUser.id) {
          newGrid[row][col] = null;
          setGrid(newGrid);
        }
        // Otherwise, clicking on an occupied cell does nothing.
        return;
      } else {
        // Empty cell: check if the user is already checked in elsewhere.
        if (getUserCheckedInCell()) {
          alert("You have already checked in.");
          return;
        }
        // Reserve the spot by assigning the current user's info.
        // newGrid[row][col] = { ...currentUser };
        setGrid(newGrid);
      }
    }
  };

  // Determine if a cell should be clickable.
  const isCellClickable = (cell: CheckInCell | null) => {
    if (isOwner) {
      // Owner can click only on occupied cells (to cancel a check‑in).
      return cell !== null;
    } else {
      // Non‑owner: if the cell is empty, it's clickable only if the user hasn't checked in yet.
      // If the cell is occupied by the current user, it's clickable (to cancel).
      if (cell === null) {
        return getUserCheckedInCell() === null;
      } else {
        return cell.userId === currentUser.id;
      }
    }
  };

  return (
    <Paper sx={{ p: 2, m: "auto", maxWidth: 600 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Check-In Room
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="check-in table">
          <TableBody>
            {grid.map((rowData, rowIndex) => (
              <TableRow key={rowIndex}>
                {rowData.map((cell, colIndex) => {
                  const clickable = isCellClickable(cell);
                  let displayText = "";
                  if (cell) {
                    displayText = isOwner
                      ? cell.userName
                      : cell.userId === currentUser.id
                      ? "You"
                      : "Occupied";
                  } else {
                    displayText = "Available";
                  }
                  return (
                    <TableCell
                      key={colIndex}
                      align="center"
                      sx={{
                        border: "1px solid #ccc",
                        cursor: clickable ? "pointer" : "default",
                        backgroundColor: clickable
                          ? "#e0ffe0"
                          : cell
                          ? "#f0f0f0"
                          : "#fff",
                        width: 100,
                        height: 50,
                      }}
                      onClick={() => {
                        if (clickable) {
                          handleCellClick(rowIndex, colIndex);
                        }
                      }}
                    >
                      {displayText}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CheckInRoom;
