// import { fetchProducts } from "../Redux/ProductSlice";
import "./Page.css";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight,faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { setFilter } from "../Redux/FilterSlice";
import { useState } from "react";

function Page() {
  const dispatch = useDispatch();
  const totalpages = useSelector((state) => Math.ceil(state.product.totalpages));
  const page = useSelector((state) => state.filter.filters.page);
  const [activePage, setActivePage] = useState(page);
  console.log(totalpages)

  const handlePageClick = (data) => {
    const pageno = data.selected + 1;
    setActivePage(pageno)
    dispatch(setFilter({filterName:"page",filterValue:pageno})).then(()=>{
      
    })

  };

  return (
    <div className="mainpagediv">
      <div className="arraydiv">
        <ReactPaginate 
          previousLabel={<FontAwesomeIcon className="LeftRight" icon={faChevronLeft}/>}
          nextLabel={<FontAwesomeIcon className="LeftRight" icon={faChevronRight}/>}
          breakLabel={'...'}
          pageCount={totalpages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'pageactive'}
          previousClassName={'prev'}
          nextClassName={'next'}
          pageClassName={'boxdiv'}
          forcePage={activePage-1}
        />
      </div>
    </div>
  );
}

export default Page;
