import PropTypes from "prop-types";
import React from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { TextInput } from "./TextInput";
import MultiSelect from "./MultiSelect";

const Input = (props) => {
  const { type, 
          placeholder, 
          onChange, 
          date=new Date(), 
          items, 
          isLoading,
          itemType,
          setSubmitDisabled } = props;

  switch (type) {
    case 'text':
      return <TextInput className="!self-stretch !flex-[0_0_auto] !w-full"
                state="required"
                placeholder={placeholder}
                onChange={onChange} />
    case 'date':
      return <DatePicker defaultValue={dayjs(date)}
                onChange={onChange} />
    case 'multi':
      return <MultiSelect
                onChange={onChange}
                items={items}
                isLoading={isLoading}
                itemType={itemType}
                setSubmitDisabled={setSubmitDisabled} />
    default:
      return null;
  }
}

export const Field = (props) => {
  const { text,
        placeholder,
        optional,
        type="text",
        onChange,
        date,
        items,
        isLoading,
        itemType,
        setSubmitDisabled } = props;
  return (
    <>
      <div className="relative flex flex-col w-full">
        <p className="font-paragraph-IBM-plex-sans-regular font-[number:var(--paragraph-IBM-plex-sans-regular-font-weight)] text-transparent text-[length:var(--paragraph-IBM-plex-sans-regular-font-size)] tracking-[var(--paragraph-IBM-plex-sans-regular-letter-spacing)] leading-[var(--paragraph-IBM-plex-sans-regular-line-height)] whitespace-nowrap [font-style:var(--paragraph-IBM-plex-sans-regular-font-style)]">
          <span className="text-[#6f7482] tracking-[var(--paragraph-IBM-plex-sans-regular-letter-spacing)] font-paragraph-IBM-plex-sans-regular [font-style:var(--paragraph-IBM-plex-sans-regular-font-style)] font-[number:var(--paragraph-IBM-plex-sans-regular-font-weight)] leading-[var(--paragraph-IBM-plex-sans-regular-line-height)] text-[length:var(--paragraph-IBM-plex-sans-regular-font-size)]">
            {text}
          </span>
          { optional ? null :
            <span className="text-[#ed0131] tracking-[var(--paragraph-IBM-plex-sans-regular-letter-spacing)] font-paragraph-IBM-plex-sans-regular [font-style:var(--paragraph-IBM-plex-sans-regular-font-style)] font-[number:var(--paragraph-IBM-plex-sans-regular-font-weight)] leading-[var(--paragraph-IBM-plex-sans-regular-line-height)] text-[length:var(--paragraph-IBM-plex-sans-regular-font-size)]">
              *
            </span>
          }
        </p>

        <div className="my-2">
          <Input type={type} placeholder={placeholder} onChange={onChange} 
          date={date} items={items} isLoading={isLoading} itemType={itemType}
          setSubmitDisabled={setSubmitDisabled} />
        </div>
      </div>
    </>
  );
};

Field.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  optional: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};