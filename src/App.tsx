import { useState } from 'react';
import UploadPdf from './components/common/upload-pdf/upload-pdf';
import Viewer from './components/common/viewer/viewer';
import Parser from './components/parser/parser';
import './style/app.scss';
import usePdfFile from './hooks/usePdfFile';

function App() {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const { validatePdf } = usePdfFile();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get('file');
    if (file && file instanceof File && validatePdf(file)) {
      setUploadFile(file);
    }
  };

  return (
    <div className="App">
      <form className="Submit" onSubmit={handleSubmit}>
        <UploadPdf />
        <button className="Submit__Button" type="submit">
          결과 확인하기
        </button>
      </form>
      {uploadFile && <Parser file={uploadFile} />}
      {uploadFile && <Viewer file={uploadFile} />}
    </div>
  );
}

export default App;
