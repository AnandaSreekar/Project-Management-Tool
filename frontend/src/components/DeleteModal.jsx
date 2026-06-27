function DeleteModal({

    isOpen,

    title,

    message,

    onCancel,

    onConfirm

}) {

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>{title}</h2>

                <p
                    style={{
                        marginTop:20,
                        marginBottom:25
                    }}
                >
                    {message}
                </p>

                <div className="modal-buttons">

                    <button
                        className="edit-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-btn"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );
}

export default DeleteModal;
