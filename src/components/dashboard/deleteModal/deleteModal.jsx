import React, { useEffect, useRef } from "react";

function deleteModal({ thing, delThing, current, setshowModal }) {
  const modal = useRef(null);
  const insidemodal = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modal.current &&
        insidemodal.current &&
        !insidemodal.current.contains(event.target)
      ) {
        setshowModal(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div id="id01" className="modal" ref={modal}>
      <span
        onClick={() => setshowModal(false)}
        className="close"
        title="Close Modal"
      >
        ×
      </span>
      <form className="modal-content" ref={insidemodal}>
        <div className="container">
          <h1>Delete {thing}</h1>
          <p>Are You Sure You Want to Delete an {thing}?</p>

          <div className="clearfix">
            <button
              type="button"
              onClick={() => setshowModal(false)}
              className="cancelbtn"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                delThing(current);
                setshowModal(false);
              }}
              className="deletebtn"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default deleteModal;
