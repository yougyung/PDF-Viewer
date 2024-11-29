import { ChangeEvent } from 'react';
import usePdfFile from '../../../hooks/usePdfFile';
import fileUploadImg from '../../../assets/file-upload.svg';
import './upload-pdf.scss';

export default function UploadPdf() {
  const { file, changeFile } = usePdfFile();

  const handleChangeFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) changeFile(files[0]);
  };

  return (
    <div className="Upload" role="button">
      <img className="Upload__Icon" src={fileUploadImg} alt="파일업로드" />
      <span className="Upload__Message">{file ? file.name : '마우스로 드래그 하거나 아이콘을 눌러 추가해주세요.'}</span>
      <input
        className="Upload__Input"
        onChange={handleChangeFileInput}
        type="file"
        name="file"
        accept=".pdf"
        data-testid="upload-box"
        required
      />
    </div>
  );
}
