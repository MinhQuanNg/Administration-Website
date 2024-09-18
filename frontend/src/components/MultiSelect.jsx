import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete, TextField, Chip, Box } from '@mui/material';

import { NOUN, VERB } from 'common/constants/translation.js'
import { useGetRequiredSampleCountQuery } from '../app/services/data/dataService';
import LightTooltip from './CustomTooltip';

const MultiSelect = (props) => {
  const { onChange, 
          width, 
          itemKeys = ['name'],
          itemType,
          items=[], 
          isLoading,
          setSubmitDisabled } = props;
        
  const [selectedItems, setSelectedItems] = useState([]);

  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);

  const inputRefs = useRef({});
  const {data: response} = useGetRequiredSampleCountQuery(productId, {skip: !productId});
  
  // TOOLTIP FUNCTIONS START
  const [open, setOpen] = useState({});
  const [notEnough, setNotEnough] = useState(false);

  const handleChipClick = (id) => {
    setProductId(id);
    
    setTimeout(() => {
      const inputRef = inputRefs.current[id];
      if (inputRef && inputRef.current) {
        // Set the anchor element for the required sample count tooltip
        setOpen(prev => ({ ...prev, [id]: true }));

        inputRef.current.focus();
      } else {
        console.error('TextField reference is undefined or not properly set');
      }
    }, 0);
  };

  // Wait for response to be available before checking the sample count
  useEffect(() => {
    if (response) {
      const inputRef = inputRefs.current[productId];

      if (inputRef && inputRef.current) {
        const input = inputRef.current.value;
        setNotEnough(input && input < response?.sampleCount);
      }
    }
  }, [response]);

  useEffect(() => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, notEnough: notEnough } : product
      )
    );
  }, [notEnough, productId, setProducts]);

  useEffect(() => {
    if (setSubmitDisabled) {
      // Must have sample count and the sample count must be enough for all products
      setSubmitDisabled(products.some(product => !product.sampleCount || product.notEnough));
    }
  }, [products, setSubmitDisabled]);

  const closeTooltip = (id) => {
    setOpen(prev => ({ ...prev, [id]: false }));
  };

  const handleItemAdd = (event, newValue) => {
    setSelectedItems(newValue);

    // Extract the selected item ids
    const selectedItemIds = newValue.map(item => item.id);

    // Send the selected ids to the parent component
    if (itemType === NOUN.PRODUCT) {
      // Update the products state with selected items, initializing the sampleCount property
      const newProducts = newValue.map(item => ({
        id: item.id,
        sampleCount: products.find(product => product.id === item.id)?.sampleCount || '',
        notEnough: products.find(product => product.id === item.id)?.notEnough || false
      }));

      setProducts(newProducts);
    } else {
      onChange(selectedItemIds);
    }
  };

  const handleItemDelete = (option) => {
    setSelectedItems((prev) => {
      return prev.filter((item) => itemKeys.map(key => item[key]).join(' ') !== itemKeys.map(key => option[key]).join(' '));
    });
  
    if (itemType === NOUN.PRODUCT) {
      setProducts(prevProducts => prevProducts.filter(product => product.id !== option.id));
      closeTooltip(option.id);
      setNotEnough(false);
    }
  };

  // TOOLTIP FUNCTIONS END

  useEffect(() => {
    if (itemType === NOUN.PRODUCT && products) {
      onChange(products);
    }
  }, [products, onChange]);

  const handleSampleChange = (id, event) => {
    const input = event.target.value;
    setNotEnough(input && input < response?.sampleCount);

    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, sampleCount: input } : product
      )
    );
  };

  return (
    <>
      <Autocomplete
        multiple
        id="multiselect-autocomplete"
        options={items}
        getOptionLabel={(option) => itemKeys.map(key => option[key]).join(' ')}
        filterSelectedOptions
        value={selectedItems}
        onChange={handleItemAdd}
        loading={isLoading}
        sx={{ width: width }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={`${VERB.ADD} ${itemType.toLowerCase()}...`}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? <div>Loading...</div> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        renderTags={(value, getTagProps) =>
            value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                const product = products.find(p => p.id === option.id);
                if (!inputRefs.current[option.id]) {
                  inputRefs.current[option.id] = React.createRef();
                }

                return (
                    <Chip
                        key={key}
                        {...(products.find(p => p.id === option.id)?.notEnough ? { style: { backgroundColor: '#f8d7da' } } : {})}

                        // if product, ask for sample count
                        label={
                          itemType === NOUN.PRODUCT ? 
                          <Box display="flex" alignItems="center">
                            {itemKeys.map(key => option[key]).join(' ')}
                              <TextField
                                variant="standard"
                                placeholder={NOUN.SAMPLE_COUNT}
                                value={product?.sampleCount}
                                onChange={(event) => handleSampleChange(option.id, event)}
                                sx={{ marginLeft: 1, width: 60,
                                  '& .MuiInputBase-input': {
                                      textAlign: 'center',
                                      fontSize: '0.8rem', // Adjust the font size here
                                    }
                                  }}
                                inputRef={inputRefs.current[option.id]}

                                // stop event propagation to prevent Chip deletion
                                onKeyDown={(event) => {
                                  if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight']
                                    .includes(event.key)) {
                                    event.stopPropagation();
                                  }
                                }}

                                onBlur={() => closeTooltip(option.id)}
                              />

                            {open[option.id] &&
                              <LightTooltip
                                title={<span className={`${notEnough ? 'text-red-500' : ''}`}>Yêu cầu ít nhất {response?.sampleCount} mẫu</span>}
                                open={true}
                                placement='top'
                                arrow
                              >
                                <div className='absolute top-1 left-0 w-full opacity-0'></div>
                              </LightTooltip>
                            }
                          </Box> : 
                          itemKeys.map(key => option[key]).join(' ')
                        }
                        { ...tagProps }

                        // if products autocomplete, clicking on chip will focus on the input field
                        {...(itemType === NOUN.PRODUCT ? { onClick: () => handleChipClick(option.id) } : {})}
                        
                        onDelete={() => handleItemDelete(option)}
                    />
                );
            })
        }
      />
    </>
  );
};

export default MultiSelect;
