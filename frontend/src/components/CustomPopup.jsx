import Popup from "reactjs-popup";

const CustomPopup = ({ content, isOpen, onClose }) => {
  return (
    <Popup
      open={isOpen}
      onClose={onClose}
      modal
      nested
      closeOnDocumentClick
      closeOnEscape={false}
      contentStyle={{ width: 'fit-content', padding: '0', border: 'none', maxWidth: '75vw' }}
      overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-lg overflow-y-auto" style={{ maxHeight: '80vh' }}>
        {content}
      </div>
    </Popup>
  )
};

export default CustomPopup;