import React, { useState } from 'react';
import t from '../assets/text-content.json';

const ProductDescriptionTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='tabs'>
      <div className='tabs_btns'>
        <button
          className={`tabs_btns_btn ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => setActiveTab(0)}
        >
          {'Опис'}
        </button>
        <button
          className={`tabs_btns_btn ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          {'Характеристики'}
        </button>
      </div>
      <div className='tabs_content'>
        {activeTab === 0 && product.description.map((item, index) => (
          <p key={`${item}-${index}`}>{item}</p>
        ))}
        {activeTab === 1 && (
          <ul>
            {product.main_characteristics.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductDescriptionTabs;
