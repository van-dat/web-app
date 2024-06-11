import styled from "styled-components";

type Props = {
  showModalDelete: boolean;
  setShowModelDelete: any;
  handleDelete: any;
};

const ModalDelete = (props: Props) => {
  const { setShowModelDelete, showModalDelete, handleDelete } = props;
  return (
    <BoxModalDelete
      display={showModalDelete}
      id="modal_delete"
      className="modal_delete"
    >
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Delete Text</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => setShowModelDelete(false)}
          ></button>
        </header>
        <section className="modal-card-body" >
          <p className="color-black">You’re about to delete the Original and Paraphrased text.</p>
        </section>
        <footer className="modal-card-foot is-justify-content-flex-end">
          <button
            className="button is-danger "
            onClick={handleDelete}
          >
            Delete
          </button>
          <button className="button" onClick={() => setShowModelDelete(false)}>
            Cancel
          </button>
        </footer>
      </div>
    </BoxModalDelete>
  );
};
const BoxModalDelete: any = styled.div`
  display: ${(props: any) => (props.display ? "block" : "none")};
`;
export default ModalDelete;
