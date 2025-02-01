import React, { useState } from 'react';
import style from './AddTemplatePopup.module.css';

function AddTemplatePopup({ onClose, onSubmit }) {
  const [templateName, setTemplateName] = useState('');

  const handleSubmit = () => {
    if (templateName.trim()) {
      onSubmit(templateName);
    }
  };

  return (
    <div className={style.popup} onClick={onClose}>
      <div className={style.content} onClick={e => e.stopPropagation()}>
        <h2>Add Template</h2>
        <div className={style.inputGroup}>
          <label htmlFor="templateName">Template Name:</label>
          <input 
            type="text" 
            id="templateName"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Enter template name..."
          />
        </div>
        <div className={style.buttons}>
          <button className={style.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={style.submitBtn} onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default AddTemplatePopup;
