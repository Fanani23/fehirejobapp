import { useEffect, useState } from "react";

function PageList({ isActive, isDisabled = false, value, handleClick }) {
  let buttonStyle = {
    width: "36px",
    height: "36px",
    borderRadius: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <button type="button" style={buttonStyle} onClick={handleClick}>
      <span>{value}</span>
    </button>
  );
}

function PageArrow({ isActive = false, handleClick, type = "left" }) {
  let buttonStyle = {
    borderRadius: "2px",
    gap: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
  };

  let icon = "<";

  if (type === "right") {
    icon = ">";
  }

  return (
    <button type="button" style={buttonStyle} onClick={handleClick}>
      <div style={{ color: "black" }}>{icon}</div>
    </button>
  );
}

export default function Pagination({
  totalPages,
  currentPages,
  setCurrentPages,
  isLoading = false,
}) {
  const [listPagination, setListPagination] = useState([]);

  const handleButtonNext = () => {
    setCurrentPages(currentPages + 1);
  };
  const handleButtonPrevious = () => {
    setCurrentPages(currentPages - 1);
  };

  useEffect(() => {
    let list = [];
    // jika total pagination kurang dari 5
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        list.push(i);
      }
      // jika pagination sudah berada di halaman 4 dan total halaman tidak sama dengan 4
    } else if (currentPages > 3 && currentPages < totalPages - 2) {
      list.push(currentPages - 2);
      list.push(currentPages - 1);
      list.push(currentPages);
      list.push(currentPages + 1);
      list.push(currentPages + 2);
      // jika masih di page sebelum 4
    } else if (currentPages <= 3) {
      for (let i = 1; i <= 5; i++) {
        list.push(i);
      }
      // jika berada di 5 halaman terakhir
    } else if (currentPages >= totalPages - 2) {
      list.push(totalPages - 4);
      list.push(totalPages - 3);
      list.push(totalPages - 2);
      list.push(totalPages - 1);
      list.push(totalPages);
    }
    setListPagination(list);
  }, [currentPages]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        whiteSpace: "nowrap",
      }}
    >
      <PageArrow type="left" handleClick={handleButtonPrevious} />
      {listPagination.map((value) => (
        <PageList
          key={`pagination-list-${value}`}
          value={value}
          handleClick={() => setCurrentPages(value)}
        />
      ))}
      <PageArrow type="right" handleClick={handleButtonNext} />
    </div>
  );
}
