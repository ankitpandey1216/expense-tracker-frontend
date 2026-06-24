import "../../styles/groupDetail.css";

export default function ModalComponent({open,onClose, children}){

    if(!open){
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}