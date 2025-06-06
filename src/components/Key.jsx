

const Key = ({ label, selected, onClick, type }) => {
  const bgColors = {
    initial: "bg-blue-100",
    final: "bg-green-100",
    tone: "bg-purple-100",
    group: "bg-yellow-100"
  };
  
  return (
    <button
      className={`px-3 py-1 m-1 rounded border font-medium ${
        selected ? `${bgColors[type] || "bg-gray-200"} border-2 border-black` : "bg-white"
      }`}
      onClick={onClick}
    >
      {label || "(none)"}
    </button>
  );
};

export default Key;