import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { MdClose } from "react-icons/md";

const SearchBar = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="w-[20vw] border py-1 px-2 flex items-center bg-gray-100 rounded-md">
            <input
                className="w-[100%]"
                type="text"
                placeholder="Search Notes"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {search.length === 0 ? <FaMagnifyingGlass /> : <MdClose onClick={()=>setSearch("")} />}
        </div>
    );
};

export default SearchBar;
