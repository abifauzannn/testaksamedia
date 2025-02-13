import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = ({ user, setUser }) => {
  const itemsPerPage = 2;
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1", 10));
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const querySearch = searchParams.get("search") || "";
    setSearch(querySearch);

    if (querySearch) {
      const firstMatchIndex = items.findIndex((item) =>
        item.toLowerCase().includes(querySearch.toLowerCase())
      );

      if (firstMatchIndex !== -1) {
        const foundPage = Math.floor(firstMatchIndex / itemsPerPage) + 1;
        setPage(foundPage);
        setSearchParams({ search: querySearch, page: foundPage });
      } else {
        setPage(1);
        setSearchParams({ search: querySearch, page: 1 });
      }
    } else {
      setPage(parseInt(searchParams.get("page") || "1", 10));
    }
  }, [searchParams, items]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentPage = Math.min(page, totalPages);

  const displayedItems = items
    .map((item, index) => ({ item, index }))
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .filter(({ item }) => item.toLowerCase().includes(search.toLowerCase()));

  const addItem = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setNewItem(""); // Kosongkan input setelah submit
    }
  };

  const editItem = (globalIndex) => {
    const updatedItem = prompt("Edit item:", items[globalIndex]);
    if (updatedItem) {
      const updatedItems = [...items];
      updatedItems[globalIndex] = updatedItem;
      setItems(updatedItems);
    }
  };

  const deleteItem = (globalIndex) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedItems = items.filter((_, i) => i !== globalIndex);
      setItems(updatedItems);
    }
  };

  return (
    <div className="p-4">
      <Navbar user={user} setUser={setUser} />
      <div className=" gap-4 py-4 flex flex-col md:flex-row">
        <div className="md:w-1/4 p-4 h-50 border border-gray-300 rounded-lg shadow-md">
          {/* Form untuk menambah item */}
          <form onSubmit={addItem} className="flex flex-col gap-2">
            <p>Tambahkan Nama Anggota Baru</p>
            <input
              type="text"
              placeholder="Masukan nama"
              className="p-4 border border-gray-200 rounded-lg w-full"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button
              type="submit"
              className="md:w-full bg-[#181C14] text-white px-4 py-2 rounded"
            >
              Add Item
            </button>
          </form>
        </div>
        <div className="md:w-3/4 border border-gray-300 p-4 rounded-md shadow-md">
          {/* Input pencarian tanpa tombol */}
          <input
            type="text"
            placeholder="Search..."
            className="p-4 border border-gray-200 rounded-lg md:w-1/4 mb-4"
            value={search}
            onChange={(e) => {
              const newSearch = e.target.value;
              setSearch(newSearch);
              setSearchParams({ search: newSearch, page: 1 });
            }}
          />
          {displayedItems.length > 0 ? (
            displayedItems.map(({ item, index }) => (
              <div
                key={index}
                className="border-b border-gray-200 rounded-md p-4 mb-2 flex justify-between items-center"
              >
                <span>{item}</span>
                <div>
                  <button
                    onClick={() => editItem(index)}
                    className="bg-[#1976D2] text-white px-4 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(index)}
                    className="bg-[#D32F2F] text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No results found</p>
          )}
          <div className="flex justify-between items-center mt-4">
            <button
              className={`px-4 py-2 rounded border border-gray-300 cursor-pointer ${
                currentPage === 1 ? "bg-white text-[#181C14]" : "bg-[#181C14] text-white"
              }`}
              disabled={currentPage === 1}
              onClick={() => {
                setPage(currentPage - 1);
                setSearchParams({ search, page: currentPage - 1 });
              }}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              className={`px-4 py-2 rounded border border-gray-300 cursor-pointer ${
                currentPage >= totalPages
                  ? "bg-white text-[#181C14]"
                  : "bg-[#181C14] text-white"
              }`}
              disabled={currentPage >= totalPages}
              onClick={() => {
                setPage(currentPage + 1);
                setSearchParams({ search, page: currentPage + 1 });
              }}
            >
              Next  
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
