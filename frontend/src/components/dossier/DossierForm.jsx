import { Button } from "@mui/material";
import { Field } from "../Field";
import { useState } from "react";
import dayjs from 'dayjs';
import { useCreateDossierMutation, useGetProductsQuery } from "../../app/services/data/dataService";
import { useEffect } from "react";

import { NOUN } from 'common/constants/translation.js'

const DossierForm = ({ onClose, onFormSubmit }) => {
  // Set the default collection deadline and overall deadline to 3 days from today
  const date = dayjs().add(3, 'day');

  const [referenceId, setReferenceId] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [collectionDeadline, setCollectionDeadline] = useState(date);
  const [branch, setBranch] = useState('');
  const [deadline, setDeadline] = useState(date);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const [createDossier, { isError, error, isSuccess }] = useCreateDossierMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dossierData = {
      referenceId,
      products: selectedProducts,
      collectionDeadline,
      branch,
      deadline,
    };

    console.log(dossierData);

    createDossier(dossierData);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose(); // close the form after successful submission
      onFormSubmit(); // notify dashboard to update dossiers
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.error(error.data.message);
    }
  }, [isError]);

  const [products, setProducts] = useState([]);
  const { data, isLoading: getProductsLoading } = useGetProductsQuery();
    
  useEffect(() => {
    if (data)
      setProducts(data);
  }, [data]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start gap-[30px] px-[95px] py-[20px] relative bg-[#ffffff]">
      <Field text="Mã hồ sơ" placeholder="Nhập mã hồ sơ" onChange={(e) => setReferenceId(e.target.value)} />
      <Field text="Sản phẩm" placeholder="Nhấp để chọn sản phẩm" type="multi" onChange={setSelectedProducts}
            items={products}
            isLoading={getProductsLoading}
            itemType={NOUN.PRODUCT}
            setSubmitDisabled={setSubmitDisabled}
      />
      <Field text="Hạn lấy mẫu" type="date" onChange={(date) => setCollectionDeadline(date)} date={collectionDeadline} />
      <Field text="Chi nhánh phụ trách" placeholder="Nhấp để chọn chi nhánh, nếu để trống sẽ lấy chi nhánh của NV nhập" optional onChange={(e) => setBranch(e.target.value)} />
      <Field text="Hạn hồ sơ" type="date" onChange={(date) => setDeadline(date)} date={deadline} />
      <Button type="submit" variant="contained"
        sx={{ borderRadius: "24px"}}
        disabled={submitDisabled}
        className="w-[563px] h-[48px] bg-[#ed0131] text-[#ffffff] font-paragraph-IBM-plex-sans-regular font-[number:var(--paragraph-IBM-plex-sans-regular-font-weight)] text-[length:var(--paragraph-IBM-plex-sans-regular-font-size)] tracking-[var(--paragraph-IBM-plex-sans-regular-letter-spacing)] leading-[var(--paragraph-IBM-plex-sans-regular-line-height)] [font-style:var(--paragraph-IBM-plex-sans-regular-font-style)]" 
        >
        Tạo hồ sơ
      </Button>
      { submitDisabled && <div className="text-red-500">Vui lòng kiểm tra lại các ô.</div> }
      { isError && <div className="text-red-500">{error.data.message}</div> }
    </form>
  );
};

export default DossierForm;